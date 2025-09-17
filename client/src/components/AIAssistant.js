import React, { useState } from 'react';
import { Send, Bot, User, Lightbulb, BookOpen, Brain, TrendingUp } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI study assistant. I can help you with:\n\n• 📚 Course recommendations\n• 🧠 Quiz generation\n• 📝 Note summarization\n• 📊 Progress analysis\n\nWhat would you like help with today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('course') || input.includes('recommend')) {
      return "Based on your progress, I recommend:\n\n🎯 **JavaScript Fundamentals** - Perfect for beginners\n📊 **Data Analysis with Python** - Builds on your math skills\n🎨 **Web Design Basics** - Creative and practical\n\nWould you like me to explain any of these courses in detail?";
    }
    
    if (input.includes('quiz') || input.includes('test')) {
      return "I can generate a quiz for you! Here's a sample:\n\n**JavaScript Quiz:**\n\n1. What is the correct way to declare a variable in JavaScript?\n   a) var name = 'John'\n   b) variable name = 'John'\n   c) name = 'John'\n\n2. Which method adds an element to the end of an array?\n   a) push()\n   b) pop()\n   c) shift()\n\nWould you like me to create a full quiz for any specific topic?";
    }
    
    if (input.includes('summary') || input.includes('notes')) {
      return "I can summarize your notes! Here's what I found:\n\n📝 **Key Topics Covered:**\n• Variables and data types\n• Functions and scope\n• DOM manipulation\n• Event handling\n\n🎯 **Important Concepts:**\n• JavaScript is case-sensitive\n• Use const/let instead of var\n• Always use semicolons\n\nWould you like a detailed summary of any specific topic?";
    }
    
    if (input.includes('progress') || input.includes('analyz')) {
      return "📊 **Your Learning Progress Analysis:**\n\n✅ **Completed:** 3 courses\n⏱️ **Time Spent:** 12 hours\n🎯 **Completion Rate:** 75%\n📈 **Strengths:** JavaScript, HTML/CSS\n🎯 **Areas to Focus:** React, Node.js\n\n💡 **Recommendation:** Focus on completing the React course next. You're doing great!";
    }
    
    if (input.includes('help') || input.includes('hello')) {
      return "I'm here to help! Here are some things I can do:\n\n🤖 **AI Features:**\n• Course recommendations\n• Quiz generation\n• Note summarization\n• Progress analysis\n• Study tips\n\nJust ask me anything about your learning journey!";
    }
    
    return "That's interesting! I'm an AI assistant designed to help with your studies. I can help with course recommendations, generate quizzes, summarize notes, or analyze your progress. What specific topic would you like help with?";
  };

  const quickActions = [
    { icon: BookOpen, label: 'Course Help', action: 'Can you recommend a course for me?' },
    { icon: Brain, label: 'Generate Quiz', action: 'Create a quiz about JavaScript' },
    { icon: Lightbulb, label: 'Study Tips', action: 'Give me study tips for programming' },
    { icon: TrendingUp, label: 'Progress', action: 'Analyze my learning progress' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-96 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-100 p-2 rounded-full">
          <Bot className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI Study Assistant</h3>
          <p className="text-sm text-gray-500">Powered by AI • Always learning</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-600' : 'bg-gray-100'}`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-2">
              <div className="p-2 rounded-full bg-gray-100">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => setInputMessage(action.action)}
            className="flex items-center gap-2 p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <action.icon className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything about your studies..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
