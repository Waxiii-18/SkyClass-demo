import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

const AIQuiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = (topic = 'JavaScript') => {
    const quizzes = {
      JavaScript: [
        {
          id: 1,
          question: "What is the correct way to declare a variable in JavaScript?",
          options: [
            "var name = 'John'",
            "variable name = 'John'", 
            "name = 'John'",
            "declare name = 'John'"
          ],
          correct: 0,
          explanation: "The 'var' keyword is used to declare variables in JavaScript."
        },
        {
          id: 2,
          question: "Which method adds an element to the end of an array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correct: 0,
          explanation: "push() adds elements to the end of an array."
        },
        {
          id: 3,
          question: "What does '===' mean in JavaScript?",
          options: [
            "Assignment operator",
            "Strict equality comparison",
            "Approximate equality",
            "Type conversion"
          ],
          correct: 1,
          explanation: "=== performs strict equality comparison without type coercion."
        },
        {
          id: 4,
          question: "Which is NOT a JavaScript data type?",
          options: ["string", "boolean", "float", "undefined"],
          correct: 2,
          explanation: "JavaScript has 'number' type, not 'float' specifically."
        }
      ],
      React: [
        {
          id: 1,
          question: "What is JSX in React?",
          options: [
            "JavaScript XML syntax extension",
            "A build tool",
            "A state management library",
            "A testing framework"
          ],
          correct: 0,
          explanation: "JSX is a syntax extension that allows writing HTML-like code in JavaScript."
        },
        {
          id: 2,
          question: "Which hook is used for side effects in React?",
          options: ["useState", "useEffect", "useContext", "useReducer"],
          correct: 1,
          explanation: "useEffect is used to perform side effects in React components."
        }
      ],
      Python: [
        {
          id: 1,
          question: "Which is the correct way to create a list in Python?",
          options: [
            "list = [1, 2, 3]",
            "list = (1, 2, 3)",
            "list = {1, 2, 3}",
            "list = <1, 2, 3>"
          ],
          correct: 0,
          explanation: "Lists in Python use square brackets []."
        },
        {
          id: 2,
          question: "What does 'len()' function do in Python?",
          options: [
            "Returns the length of a sequence",
            "Creates a new list",
            "Sorts a list",
            "Deletes elements"
          ],
          correct: 0,
          explanation: "len() returns the number of items in a sequence."
        }
      ]
    };

    const selectedQuiz = quizzes[topic] || quizzes.JavaScript;
    setCurrentQuiz({
      topic,
      questions: selectedQuiz,
      currentQuestion: 0,
      totalQuestions: selectedQuiz.length
    });
    setScore(0);
    setQuizCompleted(false);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuiz.questions[currentQuiz.currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResults(true);
  };

  const nextQuestion = () => {
    if (currentQuiz.currentQuestion + 1 >= currentQuiz.totalQuestions) {
      setQuizCompleted(true);
    } else {
      setCurrentQuiz({
        ...currentQuiz,
        currentQuestion: currentQuiz.currentQuestion + 1
      });
      setSelectedAnswer(null);
      setShowResults(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setScore(0);
    setQuizCompleted(false);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  if (!currentQuiz) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-full">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Quiz Generator</h3>
            <p className="text-sm text-gray-500">Test your knowledge with AI-generated quizzes</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Choose a topic:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['JavaScript', 'React', 'Python'].map((topic) => (
              <button
                key={topic}
                onClick={() => generateQuiz(topic)}
                className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-lg border border-purple-200 transition-all duration-200 hover:shadow-md"
              >
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 mb-1">{topic}</div>
                  <div className="text-sm text-gray-600">
                    {topic === 'JavaScript' && '4 questions'}
                    {topic === 'React' && '2 questions'}
                    {topic === 'Python' && '2 questions'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / currentQuiz.totalQuestions) * 100);
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg mb-6">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
            <div className="text-4xl font-bold text-green-600 mb-2">{percentage}%</div>
            <p className="text-gray-600">
              You scored {score} out of {currentQuiz.totalQuestions} questions
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-lg">
              {percentage >= 80 && "🎉 Excellent work! You've mastered this topic!"}
              {percentage >= 60 && percentage < 80 && "👍 Good job! You're on the right track!"}
              {percentage < 60 && "💪 Keep studying! Practice makes perfect!"}
            </div>
            
            <div className="flex gap-3 justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Another Quiz
              </button>
              <button
                onClick={() => generateQuiz(currentQuiz.topic)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Retry This Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = currentQuiz.questions[currentQuiz.currentQuestion];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{currentQuiz.topic} Quiz</h3>
            <p className="text-sm text-gray-500">
              Question {currentQuiz.currentQuestion + 1} of {currentQuiz.totalQuestions}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Score: {score}/{currentQuiz.totalQuestions}
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 text-lg mb-2">{currentQ.question}</h4>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResults}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : showResults && index === currentQ.correct
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : showResults && selectedAnswer === index && index !== currentQ.correct
                  ? 'border-red-500 bg-red-50 text-red-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : showResults && index === currentQ.correct
                    ? 'border-green-500 bg-green-500'
                    : showResults && selectedAnswer === index && index !== currentQ.correct
                    ? 'border-red-500 bg-red-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                  {showResults && index === currentQ.correct && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                  {showResults && selectedAnswer === index && index !== currentQ.correct && (
                    <XCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResults && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Quiz
        </button>
        
        {!showResults ? (
          <button
            onClick={submitAnswer}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default AIQuiz;
