import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Clock, Award, BookOpen, Brain, Zap, BarChart3 } from 'lucide-react';

const AIProgressAnalyzer = () => {
  const [progressData, setProgressData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Simulate loading progress data
    loadProgressData();
  }, []);

  const loadProgressData = () => {
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData = {
        completedCourses: 3,
        totalCourses: 8,
        totalStudyTime: 24, // hours
        averageScore: 87,
        streak: 7, // days
        strengths: ['JavaScript', 'HTML/CSS', 'Problem Solving'],
        weakAreas: ['React Hooks', 'Node.js', 'Database Design'],
        recentActivity: [
          { date: '2024-01-15', activity: 'Completed JavaScript Fundamentals', score: 92 },
          { date: '2024-01-14', activity: 'Started React Basics', score: 78 },
          { date: '2024-01-13', activity: 'Finished HTML/CSS Course', score: 95 },
          { date: '2024-01-12', activity: 'Python Quiz', score: 85 },
          { date: '2024-01-11', activity: 'JavaScript Practice', score: 90 }
        ],
        goals: [
          { name: 'Complete React Course', progress: 60, deadline: '2024-02-01' },
          { name: 'Build Portfolio Project', progress: 25, deadline: '2024-02-15' },
          { name: 'Learn Node.js', progress: 10, deadline: '2024-03-01' }
        ]
      };

      setProgressData(mockData);
      generateInsights(mockData);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateInsights = (data) => {
    const generatedInsights = [
      {
        type: 'success',
        icon: TrendingUp,
        title: 'Excellent Progress!',
        description: `You've completed ${data.completedCourses} courses with an average score of ${data.averageScore}%. Your learning pace is above average!`,
        action: 'Keep up the great work!'
      },
      {
        type: 'warning',
        icon: Target,
        title: 'Focus Area Identified',
        description: `Your weakest area is React Hooks. Consider spending extra time on this topic.`,
        action: 'Review React documentation'
      },
      {
        type: 'info',
        icon: Brain,
        title: 'Learning Pattern',
        description: `You perform best with hands-on coding exercises. Try to increase practical projects.`,
        action: 'Start a new coding project'
      },
      {
        type: 'success',
        icon: Award,
        title: 'Consistency Champion',
        description: `You've maintained a ${data.streak}-day learning streak! Consistency is key to mastery.`,
        action: 'Maintain your streak'
      },
      {
        type: 'info',
        icon: Clock,
        title: 'Optimal Study Time',
        description: `Your best performance occurs in the morning sessions. Consider scheduling important topics then.`,
        action: 'Plan morning study sessions'
      }
    ];

    setInsights(generatedInsights);
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analyzing Your Progress</h3>
            <p className="text-gray-600">Gathering insights from your learning data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!progressData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600">Complete some courses to see your AI-powered progress analysis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Courses Completed</p>
              <p className="text-2xl font-bold">{progressData.completedCourses}/{progressData.totalCourses}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-2xl font-bold">{progressData.averageScore}%</p>
            </div>
            <Award className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Study Time</p>
              <p className="text-2xl font-bold">{progressData.totalStudyTime}h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Learning Streak</p>
              <p className="text-2xl font-bold">{progressData.streak} days</p>
            </div>
            <Zap className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI-Powered Insights</h3>
            <p className="text-sm text-gray-500">Personalized recommendations based on your learning patterns</p>
          </div>
        </div>

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              insight.type === 'success' ? 'bg-green-50 border-green-500' :
              insight.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex items-start gap-3">
                <insight.icon className={`w-5 h-5 mt-0.5 ${
                  insight.type === 'success' ? 'text-green-600' :
                  insight.type === 'warning' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                  <p className="text-xs font-medium text-gray-600">💡 {insight.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Your Strengths
          </h3>
          <div className="space-y-2">
            {progressData.strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-900">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600" />
            Areas to Focus
          </h3>
          <div className="space-y-2">
            {progressData.weakAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-900">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Your Learning Goals
        </h3>
        <div className="space-y-4">
          {progressData.goals.map((goal, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{goal.name}</h4>
                <span className="text-sm text-gray-600">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">Deadline: {goal.deadline}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {progressData.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{activity.activity}</p>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{activity.score}%</p>
                <p className="text-xs text-gray-500">Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIProgressAnalyzer;
