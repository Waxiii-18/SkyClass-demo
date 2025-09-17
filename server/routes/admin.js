const express = require('express');
const router = express.Router();
const { admin, db, auth } = require('../config/firebase');

// Middleware to verify Firebase token and check admin role
const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    
    // Check if user is admin
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    if (!userDoc.exists || userDoc.data().role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get admin dashboard statistics
router.get('/stats', verifyAdminToken, async (req, res) => {
  try {
    // Get total users count
    const usersSnapshot = await db.collection('users').get();
    const totalUsers = usersSnapshot.size;
    
    // Get total courses count
    const coursesSnapshot = await db.collection('courses').get();
    const totalCourses = coursesSnapshot.size;
    
    // Get total enrollments count
    const enrollmentsSnapshot = await db.collection('enrollments').get();
    const totalEnrollments = enrollmentsSnapshot.size;
    
    // Calculate total revenue (mock calculation)
    const totalRevenue = totalEnrollments * 25; // Average course price
    
    // Get monthly growth (mock calculation)
    const monthlyGrowth = 15.2;
    
    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
      totalRevenue,
      monthlyGrowth
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin statistics' });
  }
});

// Get all users
router.get('/users', verifyAdminToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    let query = db.collection('users');
    
    if (role && role !== 'all') {
      query = query.where('role', '==', role);
    }
    
    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(parseInt(limit))
      .get();
    
    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    // Filter by search if provided
    let filteredUsers = users;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = users.filter(user =>
        user.displayName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower)
      );
    }
    
    res.json({
      users: filteredUsers,
      total: filteredUsers.length,
      page: parseInt(page),
      limit: parseInt(limit),
      hasMore: filteredUsers.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/users/:userId', verifyAdminToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get user's enrollments
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .get();
    
    const enrollments = [];
    for (const enrollmentDoc of enrollmentsSnapshot.docs) {
      const enrollment = enrollmentDoc.data();
      const courseDoc = await db.collection('courses').doc(enrollment.courseId).get();
      
      if (courseDoc.exists) {
        const course = courseDoc.data();
        enrollments.push({
          ...enrollment,
          courseTitle: course.title,
          courseId: enrollment.courseId
        });
      }
    }
    
    const user = {
      id: userDoc.id,
      ...userDoc.data(),
      enrollments
    };
    
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user role
router.put('/users/:userId/role', verifyAdminToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!['student', 'instructor', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    
    await db.collection('users').doc(userId).update({
      role,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Delete user
router.delete('/users/:userId', verifyAdminToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Delete user from Firebase Auth
    await auth.deleteUser(userId);
    
    // Delete user document
    await db.collection('users').doc(userId).delete();
    
    // Delete user's enrollments
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .get();
    
    const batch = db.batch();
    enrollmentsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Get all courses
router.get('/courses', verifyAdminToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    let query = db.collection('courses');
    
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }
    
    const snapshot = await query
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(parseInt(limit))
      .get();
    
    const courses = [];
    snapshot.forEach(doc => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      courses,
      total: courses.length,
      page: parseInt(page),
      limit: parseInt(limit),
      hasMore: courses.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Get admin courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Create new course
router.post('/courses', verifyAdminToken, async (req, res) => {
  try {
    const courseData = req.body;
    
    const course = {
      ...courseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      enrollmentCount: 0,
      averageRating: 0,
      ratingCount: 0
    };
    
    const docRef = await db.collection('courses').add(course);
    
    res.status(201).json({
      message: 'Course created successfully',
      courseId: docRef.id
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course
router.put('/courses/:courseId', verifyAdminToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const updateData = req.body;
    
    await db.collection('courses').doc(courseId).update({
      ...updateData,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete course
router.delete('/courses/:courseId', verifyAdminToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Delete course
    await db.collection('courses').doc(courseId).delete();
    
    // Delete enrollments for this course
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('courseId', '==', courseId)
      .get();
    
    const batch = db.batch();
    enrollmentsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Get recent activity
router.get('/activity', verifyAdminToken, async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    // Get recent user registrations
    const usersSnapshot = await db
      .collection('users')
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .get();
    
    const activities = [];
    
    usersSnapshot.docs.forEach(doc => {
      const user = doc.data();
      activities.push({
        type: 'user_registered',
        message: `New user registered: ${user.email}`,
        timestamp: user.createdAt,
        data: { userId: doc.id, userEmail: user.email }
      });
    });
    
    // Get recent course enrollments
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .orderBy('enrolledAt', 'desc')
      .limit(parseInt(limit))
      .get();
    
    for (const enrollmentDoc of enrollmentsSnapshot.docs) {
      const enrollment = enrollmentDoc.data();
      const courseDoc = await db.collection('courses').doc(enrollment.courseId).get();
      
      if (courseDoc.exists) {
        const course = courseDoc.data();
        activities.push({
          type: 'course_enrollment',
          message: `User enrolled in "${course.title}"`,
          timestamp: enrollment.enrolledAt,
          data: {
            courseId: enrollment.courseId,
            courseTitle: course.title,
            userId: enrollment.userId
          }
        });
      }
    }
    
    // Sort by timestamp
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json(activities.slice(0, parseInt(limit)));
  } catch (error) {
    console.error('Get admin activity error:', error);
    res.status(500).json({ error: 'Failed to fetch admin activity' });
  }
});

// Get analytics data
router.get('/analytics', verifyAdminToken, async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    const startDate = new Date();
    if (period === '7d') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === '30d') {
      startDate.setDate(startDate.getDate() - 30);
    } else if (period === '90d') {
      startDate.setDate(startDate.getDate() - 90);
    }
    
    // Get user registrations over time
    const usersSnapshot = await db
      .collection('users')
      .where('createdAt', '>=', startDate.toISOString())
      .get();
    
    // Get course enrollments over time
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('enrolledAt', '>=', startDate.toISOString())
      .get();
    
    // Calculate daily metrics
    const dailyMetrics = {};
    
    usersSnapshot.docs.forEach(doc => {
      const date = new Date(doc.data().createdAt).toDateString();
      if (!dailyMetrics[date]) {
        dailyMetrics[date] = { users: 0, enrollments: 0 };
      }
      dailyMetrics[date].users++;
    });
    
    enrollmentsSnapshot.docs.forEach(doc => {
      const date = new Date(doc.data().enrolledAt).toDateString();
      if (!dailyMetrics[date]) {
        dailyMetrics[date] = { users: 0, enrollments: 0 };
      }
      dailyMetrics[date].enrollments++;
    });
    
    res.json({
      dailyMetrics,
      totalUsers: usersSnapshot.size,
      totalEnrollments: enrollmentsSnapshot.size,
      period
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
