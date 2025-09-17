const express = require('express');
const router = express.Router();
const { admin, db, auth } = require('../config/firebase');
const multer = require('multer');

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 20, offset = 0 } = req.query;
    
    let query = db.collection('courses').where('status', '==', 'published');
    
    if (category && category !== 'all') {
      query = query.where('category', '==', category);
    }
    
    const snapshot = await query.limit(parseInt(limit)).offset(parseInt(offset)).get();
    const courses = [];
    
    snapshot.forEach(doc => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    
    // Filter by search term if provided
    let filteredCourses = courses;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower)
      );
    }
    
    res.json({
      courses: filteredCourses,
      total: filteredCourses.length,
      hasMore: filteredCourses.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const courseDoc = await db.collection('courses').doc(courseId).get();
    
    if (!courseDoc.exists) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    const course = { id: courseDoc.id, ...courseDoc.data() };
    res.json(course);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Enroll in course
router.post('/:id/enroll', verifyToken, async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.uid;
    
    // Check if course exists
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    // Check if user is already enrolled
    const enrollmentDoc = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .get();
    
    if (!enrollmentDoc.empty) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }
    
    // Create enrollment
    await db.collection('enrollments').add({
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completedLessons: []
    });
    
    // Update course enrollment count
    await db.collection('courses').doc(courseId).update({
      enrollmentCount: admin.firestore.FieldValue.increment(1)
    });
    
    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
});

// Get user's enrolled courses
router.get('/user/enrolled', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .get();
    
    const enrolledCourses = [];
    
    for (const enrollmentDoc of enrollmentsSnapshot.docs) {
      const enrollment = enrollmentDoc.data();
      const courseDoc = await db.collection('courses').doc(enrollment.courseId).get();
      
      if (courseDoc.exists) {
        const course = { id: courseDoc.id, ...courseDoc.data() };
        enrolledCourses.push({
          ...course,
          enrollmentId: enrollmentDoc.id,
          progress: enrollment.progress,
          enrolledAt: enrollment.enrolledAt
        });
      }
    }
    
    res.json(enrolledCourses);
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled courses' });
  }
});

// Update lesson progress
router.put('/:courseId/lessons/:lessonId/progress', verifyToken, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = req.user.uid;
    const { completed } = req.body;
    
    // Find enrollment
    const enrollmentSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .get();
    
    if (enrollmentSnapshot.empty) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    
    const enrollmentDoc = enrollmentSnapshot.docs[0];
    const enrollment = enrollmentDoc.data();
    
    let updatedCompletedLessons = [...enrollment.completedLessons];
    
    if (completed && !updatedCompletedLessons.includes(lessonId)) {
      updatedCompletedLessons.push(lessonId);
    } else if (!completed && updatedCompletedLessons.includes(lessonId)) {
      updatedCompletedLessons = updatedCompletedLessons.filter(id => id !== lessonId);
    }
    
    // Calculate progress percentage
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const course = courseDoc.data();
    const totalLessons = course.lessons ? course.lessons.length : 1;
    const progress = Math.round((updatedCompletedLessons.length / totalLessons) * 100);
    
    // Update enrollment
    await enrollmentDoc.ref.update({
      completedLessons: updatedCompletedLessons,
      progress,
      lastAccessedAt: new Date().toISOString()
    });
    
    res.json({
      message: 'Progress updated successfully',
      progress,
      completedLessons: updatedCompletedLessons.length,
      totalLessons
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Get course progress
router.get('/:courseId/progress', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.uid;
    
    const enrollmentSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .get();
    
    if (enrollmentSnapshot.empty) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    
    const enrollment = enrollmentSnapshot.docs[0].data();
    res.json(enrollment);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Add course rating
router.post('/:courseId/rating', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.uid;
    const { rating, review } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    // Check if user is enrolled
    const enrollmentSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .get();
    
    if (enrollmentSnapshot.empty) {
      return res.status(403).json({ error: 'Must be enrolled to rate course' });
    }
    
    // Check if user already rated
    const existingRatingSnapshot = await db
      .collection('ratings')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .get();
    
    let ratingDoc;
    if (!existingRatingSnapshot.empty) {
      // Update existing rating
      ratingDoc = existingRatingSnapshot.docs[0];
      await ratingDoc.ref.update({
        rating,
        review,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Create new rating
      ratingDoc = await db.collection('ratings').add({
        userId,
        courseId,
        rating,
        review,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    // Update course average rating
    const ratingsSnapshot = await db
      .collection('ratings')
      .where('courseId', '==', courseId)
      .get();
    
    let totalRating = 0;
    let ratingCount = 0;
    
    ratingsSnapshot.forEach(doc => {
      totalRating += doc.data().rating;
      ratingCount++;
    });
    
    const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;
    
    await db.collection('courses').doc(courseId).update({
      averageRating: Math.round(averageRating * 10) / 10,
      ratingCount
    });
    
    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Rating error:', error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

module.exports = router;
