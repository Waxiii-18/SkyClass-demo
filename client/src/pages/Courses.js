import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  Play,
  CheckCircle
} from 'lucide-react';

function Courses() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'programming', name: 'Programming' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'data-science', name: 'Data Science' }
  ];

  // Mock data - in real app, this would come from API
  const mockCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "John Doe",
      category: "web-development",
      rating: 4.8,
      students: 1250,
      duration: "8 hours",
      price: 0,
      level: "Beginner",
      description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      lessons: 24,
      enrolled: currentUser ? Math.random() > 0.5 : false
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      instructor: "Jane Smith",
      category: "programming",
      rating: 4.9,
      students: 2100,
      duration: "12 hours",
      price: 29.99,
      level: "Intermediate",
      description: "Master JavaScript from basics to advanced concepts including ES6+, async programming, and more.",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      lessons: 36,
      enrolled: currentUser ? Math.random() > 0.5 : false
    },
    {
      id: 3,
      title: "React.js Basics",
      instructor: "Mike Johnson",
      category: "web-development",
      rating: 4.7,
      students: 1800,
      duration: "10 hours",
      price: 49.99,
      level: "Beginner",
      description: "Build modern web applications with React.js, including hooks, state management, and routing.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      lessons: 28,
      enrolled: currentUser ? Math.random() > 0.5 : false
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      instructor: "Sarah Wilson",
      category: "design",
      rating: 4.6,
      students: 950,
      duration: "6 hours",
      price: 39.99,
      level: "Beginner",
      description: "Learn essential UI/UX design principles and create beautiful, user-friendly interfaces.",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      lessons: 18,
      enrolled: currentUser ? Math.random() > 0.5 : false
    },
    {
      id: 5,
      title: "Python for Data Science",
      instructor: "David Chen",
      category: "data-science",
      rating: 4.9,
      students: 3200,
      duration: "15 hours",
      price: 59.99,
      level: "Intermediate",
      description: "Learn Python programming for data analysis, visualization, and machine learning.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      lessons: 45,
      enrolled: currentUser ? Math.random() > 0.5 : false
    },
    {
      id: 6,
      title: "Digital Marketing Fundamentals",
      instructor: "Emily Brown",
      category: "business",
      rating: 4.5,
      students: 750,
      duration: "7 hours",
      price: 34.99,
      level: "Beginner",
      description: "Master digital marketing strategies including SEO, social media, and content marketing.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      lessons: 21,
      enrolled: currentUser ? Math.random() > 0.5 : false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Courses</h1>
          <p className="text-gray-600">
            Discover high-quality educational content designed for low-end devices.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.price === 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-primary-100 text-primary-800'
                    }`}>
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-900 bg-opacity-75 text-white rounded-full">
                      {course.level}
                    </span>
                  </div>
                  {course.enrolled && (
                    <div className="absolute bottom-4 right-4">
                      <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      {renderStars(course.rating)}
                      <span className="ml-1">{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{course.lessons} lessons</span>
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {course.enrolled ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </>
                      ) : (
                        'Enroll Now'
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
