import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Calendar,
  Play,
  CheckCircle,
  Star,
  BarChart3
} from 'lucide-react';

function Dashboard() {
  const { currentUser, userProfile } = useAuth();
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedLessons: 0,
    studyTime: 0,
    achievements: 0
  });

  // Mock data - in real app, this would come from API
  const recentCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "John Doe",
      progress: 75,
      nextLesson: "CSS Flexbox",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      instructor: "Jane Smith",
      progress: 45,
      nextLesson: "Functions and Scope",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "React.js Basics",
      instructor: "Mike Johnson",
      progress: 20,
      nextLesson: "Components and Props",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop"
    }
  ];

  const recentActivity = [
    {
      type: "completed",
      course: "Introduction to Web Development",
      lesson: "HTML Basics",
      time: "2 hours ago"
    },
    {
      type: "enrolled",
      course: "React.js Basics",
      time: "1 day ago"
    },
    {
      type: "completed",
      course: "JavaScript Fundamentals",
      lesson: "Variables and Data Types",
      time: "3 days ago"
    }
  ];

  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first lesson",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      earned: true
    },
    {
      title: "Week Warrior",
      description: "Study for 7 days in a row",
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      earned: true
    },
    {
      title: "Speed Learner",
      description: "Complete 10 lessons in a week",
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      earned: false
    }
  ];

  useEffect(() => {
    // Mock stats calculation
    setStats({
      enrolledCourses: recentCourses.length,
      completedLessons: recentCourses.reduce((acc, course) => acc + Math.floor(course.progress / 10), 0),
      studyTime: 24, // hours
      achievements: achievements.filter(a => a.earned).length
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile?.displayName || 'Student'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey and track your progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.enrolledCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedLessons}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-900">{stats.studyTime}h</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{stats.achievements}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress: {course.progress}%</span>
                            <span>Next: {course.nextLesson}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/courses/${course.id}`}
                        className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
                    Browse All Courses →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Achievements */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {activity.type === 'completed' ? 'Completed' : 'Enrolled in'} {activity.course}
                          {activity.lesson && <span className="block text-xs text-gray-600">{activity.lesson}</span>}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-gray-50' : 'bg-gray-100 opacity-60'
                    }`}>
                      {achievement.icon}
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{achievement.title}</h3>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
