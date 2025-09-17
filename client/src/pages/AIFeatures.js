import React, { useState } from 'react';
import { Bot, Brain, FileText, TrendingUp, Sparkles, Zap } from 'lucide-react';
import AIAssistant from '../components/AIAssistant';
import AIQuiz from '../components/AIQuiz';
import AINoteSummarizer from '../components/AINoteSummarizer';
import AIProgressAnalyzer from '../components/AIProgressAnalyzer';

const AIFeatures = () => {
  const [activeTab, setActiveTab] = useState('assistant');

  const aiFeatures = [
    {
      id: 'assistant',
      name: 'AI Assistant',
      icon: Bot,
      description: 'Chat with AI for study help and guidance',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'quiz',
      name: 'AI Quiz Generator',
      icon: Brain,
      description: 'Generate personalized quizzes to test your knowledge',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'summarizer',
      name: 'Note Summarizer',
      icon: FileText,
      description: 'Transform your notes into concise summaries',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'progress',
      name: 'Progress Analyzer',
      icon: TrendingUp,
      description: 'Get AI insights on your learning progress',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'assistant':
        return <AIAssistant />;
      case 'quiz':
        return <AIQuiz />;
      case 'summarizer':
        return <AINoteSummarizer />;
      case 'progress':
        return <AIProgressAnalyzer />;
      default:
        return <AIAssistant />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI-Powered Learning</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of education with our AI-powered features designed to enhance your learning journey
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aiFeatures.map((feature) => {
            const IconComponent = feature.icon;
            const isActive = activeTab === feature.id;
            
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  isActive
                    ? 'border-purple-500 bg-white shadow-lg transform scale-105'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </button>
            );
          })}
        </div>

        {/* AI Features Showcase */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {aiFeatures.find(f => f.id === activeTab)?.name}
              </h2>
              <p className="text-gray-600">
                {aiFeatures.find(f => f.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Active Component */}
          <div className="mt-6">
            {renderActiveComponent()}
          </div>
        </div>

        {/* AI Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Learning</h3>
            <p className="text-gray-600 text-sm">
              AI adapts to your learning style and pace, providing customized recommendations and content.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Analytics</h3>
            <p className="text-gray-600 text-sm">
              Get detailed insights into your progress, strengths, and areas that need improvement.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enhanced Efficiency</h3>
            <p className="text-gray-600 text-sm">
              Save time with AI-powered summarization, quiz generation, and automated study assistance.
            </p>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Demo Mode Active</h4>
              <p className="text-blue-800 text-sm">
                These AI features are running in demo mode for your hackathon presentation. 
                In a production environment, they would be powered by advanced machine learning models 
                and integrated with real-time data analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
