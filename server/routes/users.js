const express = require('express');
const router = express.Router();
const { admin, db, auth } = require('../config/firebase');

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

// Get user statistics
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get enrolled courses count
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .get();
    
    // Get completed courses count
    const completedEnrollments = enrollmentsSnapshot.docs.filter(doc => 
      doc.data().progress === 100
    );
    
    // Calculate total study time (mock data for demo)
    const totalStudyTime = enrollmentsSnapshot.size * 2; // 2 hours per course average
    
    // Get achievements count
    const achievementsSnapshot = await db
      .collection('achievements')
      .where('userId', '==', userId)
      .get();
    
    res.json({
      enrolledCourses: enrollmentsSnapshot.size,
      completedCourses: completedEnrollments.length,
      totalStudyTime,
      achievements: achievementsSnapshot.size
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
});

// Get user's recent activity
router.get('/activity', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { limit = 10 } = req.query;
    
    // Get recent enrollments
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .orderBy('enrolledAt', 'desc')
      .limit(parseInt(limit))
      .get();
    
    const activities = [];
    
    for (const enrollmentDoc of enrollmentsSnapshot.docs) {
      const enrollment = enrollmentDoc.data();
      const courseDoc = await db.collection('courses').doc(enrollment.courseId).get();
      
      if (courseDoc.exists) {
        const course = courseDoc.data();
        activities.push({
          type: 'enrolled',
          course: course.title,
          timestamp: enrollment.enrolledAt,
          data: {
            courseId: enrollment.courseId,
            progress: enrollment.progress
          }
        });
      }
    }
    
    // Get recent lesson completions
    const lessonCompletionsSnapshot = await db
      .collection('lessonCompletions')
      .where('userId', '==', userId)
      .orderBy('completedAt', 'desc')
      .limit(parseInt(limit))
      .get();
    
    for (const completionDoc of lessonCompletionsSnapshot.docs) {
      const completion = completionDoc.data();
      const courseDoc = await db.collection('courses').doc(completion.courseId).get();
      
      if (courseDoc.exists) {
        const course = courseDoc.data();
        const lesson = course.lessons?.find(l => l.id === completion.lessonId);
        
        if (lesson) {
          activities.push({
            type: 'completed',
            course: course.title,
            lesson: lesson.title,
            timestamp: completion.completedAt,
            data: {
              courseId: completion.courseId,
              lessonId: completion.lessonId
            }
          });
        }
      }
    }
    
    // Sort activities by timestamp
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json(activities.slice(0, parseInt(limit)));
  } catch (error) {
    console.error('Get user activity error:', error);
    res.status(500).json({ error: 'Failed to fetch user activity' });
  }
});

// Get user achievements
router.get('/achievements', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    const achievementsSnapshot = await db
      .collection('achievements')
      .where('userId', '==', userId)
      .get();
    
    const achievements = achievementsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json(achievements);
  } catch (error) {
    console.error('Get user achievements error:', error);
    res.status(500).json({ error: 'Failed to fetch user achievements' });
  }
});

// Update user preferences
router.put('/preferences', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { preferences } = req.body;
    
    await db.collection('users').doc(userId).update({
      preferences,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Get user preferences
router.get('/preferences', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userData = userDoc.data();
    res.json(userData.preferences || {});
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

// Track study session
router.post('/study-session', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { courseId, lessonId, duration, action } = req.body;
    
    await db.collection('studySessions').add({
      userId,
      courseId,
      lessonId,
      duration,
      action, // 'start', 'pause', 'complete'
      timestamp: new Date().toISOString()
    });
    
    res.json({ message: 'Study session tracked successfully' });
  } catch (error) {
    console.error('Track study session error:', error);
    res.status(500).json({ error: 'Failed to track study session' });
  }
});

// Get study analytics
router.get('/analytics', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { period = '30d' } = req.query;
    
    const startDate = new Date();
    if (period === '7d') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === '30d') {
      startDate.setDate(startDate.getDate() - 30);
    } else if (period === '90d') {
      startDate.setDate(startDate.getDate() - 90);
    }
    
    // Get study sessions
    const studySessionsSnapshot = await db
      .collection('studySessions')
      .where('userId', '==', userId)
      .where('timestamp', '>=', startDate.toISOString())
      .get();
    
    // Calculate daily study time
    const dailyStudyTime = {};
    studySessionsSnapshot.docs.forEach(doc => {
      const session = doc.data();
      const date = new Date(session.timestamp).toDateString();
      dailyStudyTime[date] = (dailyStudyTime[date] || 0) + (session.duration || 0);
    });
    
    // Get course progress over time
    const enrollmentsSnapshot = await db
      .collection('enrollments')
      .where('userId', '==', userId)
      .get();
    
    const courseProgress = [];
    for (const enrollmentDoc of enrollmentsSnapshot.docs) {
      const enrollment = enrollmentDoc.data();
      const courseDoc = await db.collection('courses').doc(enrollment.courseId).get();
      
      if (courseDoc.exists) {
        const course = courseDoc.data();
        courseProgress.push({
          courseId: enrollment.courseId,
          courseTitle: course.title,
          progress: enrollment.progress,
          lastAccessed: enrollment.lastAccessedAt
        });
      }
    }
    
    res.json({
      dailyStudyTime,
      courseProgress,
      totalSessions: studySessionsSnapshot.size,
      period
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
