import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ReactPlayer from 'react-player';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle,
  Download,
  MessageCircle,
  ThumbsUp,
  Share2
} from 'lucide-react';

function CourseDetail() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const mockCourse = {
    id: 1,
    title: "Introduction to Web Development",
    instructor: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Senior Web Developer with 10+ years of experience"
    },
    category: "web-development",
    rating: 4.8,
    students: 1250,
    duration: "8 hours",
    price: 0,
    level: "Beginner",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course is designed for beginners and covers everything you need to start building websites.",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    enrolled: true,
    progress: 75,
    lessons: [
      {
        id: 1,
        title: "Welcome to Web Development",
        duration: "15 min",
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: true,
        description: "Introduction to the course and what you'll learn"
      },
      {
        id: 2,
        title: "HTML Basics",
        duration: "45 min",
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: true,
        description: "Learn the fundamentals of HTML markup"
      },
      {
        id: 3,
        title: "CSS Fundamentals",
        duration: "60 min",
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: true,
        description: "Styling your web pages with CSS"
      },
      {
        id: 4,
        title: "CSS Flexbox",
        duration: "30 min",
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: false,
        description: "Master CSS Flexbox layout"
      },
      {
        id: 5,
        title: "JavaScript Introduction",
        duration: "50 min",
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: false,
        description: "Getting started with JavaScript programming"
      },
      {
        id: 6,
        title: "Project: Building a Portfolio",
        duration: "90 min",
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        completed: false,
        description: "Create your first web development project"
      }
    ],
    resources: [
      {
        id: 1,
        title: "HTML Cheat Sheet",
        type: "pdf",
        url: "#",
        size: "2.3 MB"
      },
      {
        id: 2,
        title: "CSS Properties Reference",
        type: "pdf",
        url: "#",
        size: "1.8 MB"
      },
      {
        id: 3,
        title: "Project Starter Files",
        type: "zip",
        url: "#",
        size: "5.2 MB"
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourse(mockCourse);
      setLoading(false);
    }, 1000);
  }, [id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleLessonComplete = (lessonId) => {
    // In real app, this would update progress in backend
    const updatedLessons = course.lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    );
    setCourse({ ...course, lessons: updatedLessons });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/courses" className="text-primary-600 hover:text-primary-700">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Link to="/courses" className="hover:text-primary-600">Courses</Link>
                <span className="mx-2">/</span>
                <span className="capitalize">{course.category.replace('-', ' ')}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center">
                  {renderStars(course.rating)}
                  <span className="ml-2 text-gray-600">{course.rating} ({course.students} students)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {course.lessons.length} lessons
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  {course.level}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{course.description}</p>

              {/* Instructor */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{course.instructor.name}</h3>
                  <p className="text-sm text-gray-600">{course.instructor.bio}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Play className="w-4 h-4 mr-2" />
                  {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
                </button>
                <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
                <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Like
                </button>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Completed: {course.lessons.filter(l => l.completed).length} / {course.lessons.length} lessons</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="bg-white rounded-lg shadow">
              <div className="aspect-video bg-black rounded-t-lg">
                <ReactPlayer
                  url={course.lessons[currentLesson]?.url}
                  width="100%"
                  height="100%"
                  controls
                  onEnded={() => handleLessonComplete(course.lessons[currentLesson]?.id)}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.lessons[currentLesson]?.title || 'Select a lesson'}
                </h2>
                <p className="text-gray-600">
                  {course.lessons[currentLesson]?.description || 'Choose a lesson from the sidebar to start learning.'}
                </p>
              </div>
            </div>

            {/* Course Resources */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Resources</h3>
              <div className="space-y-3">
                {course.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        {resource.type === 'pdf' ? (
                          <BookOpen className="w-4 h-4 text-primary-600" />
                        ) : (
                          <Download className="w-4 h-4 text-primary-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.size}</p>
                      </div>
                    </div>
                    <button className="flex items-center px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Content */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Course Content</h3>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentLesson === index
                          ? 'bg-primary-50 border border-primary-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.completed 
                              ? 'bg-green-100 text-green-600' 
                              : currentLesson === index
                              ? 'bg-primary-100 text-primary-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                            <p className="text-sm text-gray-600">{lesson.duration}</p>
                          </div>
                        </div>
                        {lesson.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Discussion */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Discussion</h3>
              </div>
              <div className="p-6">
                <div className="text-center text-gray-600 mb-4">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>No discussions yet</p>
                </div>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Start Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
