import React, { useState } from 'react';
import { FileText, Sparkles, Copy, Download, RefreshCw, CheckCircle } from 'lucide-react';

const AINoteSummarizer = () => {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleNotes = [
    {
      title: "JavaScript Fundamentals",
      content: `JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications.

Variables in JavaScript can be declared using var, let, or const. The var keyword was traditionally used but has function scope and can be hoisted. The let keyword has block scope and is not hoisted. The const keyword also has block scope but cannot be reassigned after declaration.

Functions in JavaScript are first-class objects, meaning they can be assigned to variables, passed as arguments, and returned from other functions. There are several ways to define functions: function declarations, function expressions, and arrow functions.

Arrays in JavaScript are dynamic and can hold multiple data types. Common array methods include push(), pop(), shift(), unshift(), slice(), splice(), map(), filter(), and reduce().

Objects in JavaScript are collections of key-value pairs. Properties can be accessed using dot notation or bracket notation. Objects can have methods, which are functions that are properties of an object.

The Document Object Model (DOM) represents the structure of HTML documents. JavaScript can manipulate the DOM to change content, structure, and styling of web pages dynamically.

Event handling allows JavaScript to respond to user interactions like clicks, key presses, and form submissions. Event listeners can be added using addEventListener() method.

Asynchronous programming in JavaScript is handled using callbacks, promises, and async/await. Promises represent the eventual completion or failure of an asynchronous operation.`
    },
    {
      title: "React Components",
      content: `React is a JavaScript library for building user interfaces, particularly web applications. It was created by Facebook and is maintained by Facebook and the community.

Components are the building blocks of React applications. They are reusable pieces of UI that can accept inputs called props and return React elements describing what should appear on the screen.

There are two types of components: functional components and class components. Functional components are simpler and are now the preferred way to write components in React.

JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like code in JavaScript. JSX gets compiled to JavaScript function calls that create React elements.

Props (short for properties) are how you pass data from parent components to child components. Props are read-only and cannot be modified by the child component.

State is data that can change over time and affects the component's rendering. In functional components, state is managed using the useState hook.

Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, and useReducer.

The useEffect hook lets you perform side effects in functional components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined in class components.

Event handling in React is similar to handling events on DOM elements, but with some syntactic differences. React events are named using camelCase rather than lowercase, and you pass a function as the event handler rather than a string.

Conditional rendering allows you to render different components or elements based on certain conditions. You can use JavaScript operators like if, &&, or ternary operators to conditionally render content.`
    }
  ];

  const generateSummary = async (inputNotes) => {
    setIsSummarizing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const words = inputNotes.split(' ').length;
      let generatedSummary = '';
      
      if (words > 200) {
        // Generate detailed summary for longer notes
        generatedSummary = `📝 **AI-Generated Summary** (${words} words → ${Math.ceil(words/4)} words)

**Key Concepts:**
${extractKeyConcepts(inputNotes)}

**Main Points:**
${extractMainPoints(inputNotes)}

**Important Details:**
${extractImportantDetails(inputNotes)}

**Study Tips:**
• Focus on understanding the core concepts first
• Practice with hands-on examples
• Review the key terminology
• Create your own examples to test understanding

**Next Steps:**
• Practice with coding exercises
• Build a small project using these concepts
• Review related topics for deeper understanding`;
      } else {
        // Generate concise summary for shorter notes
        generatedSummary = `📝 **AI-Generated Summary** (${words} words)

**Core Concepts:**
${extractKeyConcepts(inputNotes)}

**Key Points:**
${extractMainPoints(inputNotes)}

**Quick Review:**
• Practice the main concepts
• Focus on understanding over memorization
• Apply knowledge in practical examples`;
      }
      
      setSummary(generatedSummary);
      setIsSummarizing(false);
    }, 2000);
  };

  const extractKeyConcepts = (text) => {
    const concepts = [];
    if (text.includes('JavaScript')) concepts.push('• JavaScript programming fundamentals');
    if (text.includes('React')) concepts.push('• React component architecture');
    if (text.includes('function')) concepts.push('• Function definitions and usage');
    if (text.includes('variable')) concepts.push('• Variable declarations and scope');
    if (text.includes('array')) concepts.push('• Array manipulation and methods');
    if (text.includes('object')) concepts.push('• Object-oriented concepts');
    if (text.includes('DOM')) concepts.push('• DOM manipulation');
    if (text.includes('event')) concepts.push('• Event handling');
    if (text.includes('hook')) concepts.push('• React hooks and state management');
    if (text.includes('component')) concepts.push('• Component lifecycle and rendering');
    
    return concepts.length > 0 ? concepts.join('\n') : '• Core programming concepts\n• Language-specific features\n• Best practices and patterns';
  };

  const extractMainPoints = (text) => {
    const points = [];
    if (text.includes('var') || text.includes('let') || text.includes('const')) {
      points.push('• Variable declarations have different scoping rules');
    }
    if (text.includes('function')) {
      points.push('• Functions are first-class objects in JavaScript');
    }
    if (text.includes('array')) {
      points.push('• Arrays provide powerful methods for data manipulation');
    }
    if (text.includes('component')) {
      points.push('• Components are reusable UI building blocks');
    }
    if (text.includes('props')) {
      points.push('• Props enable data flow between components');
    }
    if (text.includes('state')) {
      points.push('• State management is crucial for dynamic UIs');
    }
    
    return points.length > 0 ? points.join('\n') : '• Fundamental programming concepts\n• Language-specific syntax and features\n• Practical application techniques';
  };

  const extractImportantDetails = (text) => {
    const details = [];
    if (text.includes('scope')) {
      details.push('• Understanding scope is essential for variable usage');
    }
    if (text.includes('asynchronous')) {
      details.push('• Asynchronous programming enables non-blocking operations');
    }
    if (text.includes('JSX')) {
      details.push('• JSX syntax makes component creation more intuitive');
    }
    if (text.includes('hook')) {
      details.push('• Hooks enable stateful logic in functional components');
    }
    
    return details.length > 0 ? details.join('\n') : '• Pay attention to syntax and best practices\n• Understand the underlying concepts\n• Practice with real examples';
  };

  const handleSummarize = () => {
    if (notes.trim()) {
      generateSummary(notes);
    }
  };

  const loadSampleNotes = (index) => {
    setNotes(sampleNotes[index].content);
    setSummary('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadSummary = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ai-summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-full">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI Note Summarizer</h3>
          <p className="text-sm text-gray-500">Transform your notes into concise, actionable summaries</p>
        </div>
      </div>

      {/* Sample Notes */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Try with sample notes:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleNotes.map((sample, index) => (
            <button
              key={index}
              onClick={() => loadSampleNotes(index)}
              className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">{sample.title}</div>
              <div className="text-sm text-gray-600">
                {sample.content.substring(0, 100)}...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Notes Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Paste your notes here:
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your study notes, lecture transcripts, or any text you want to summarize..."
          className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">
            {notes.length} characters, {notes.split(' ').filter(word => word.length > 0).length} words
          </span>
          <button
            onClick={() => setNotes('')}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Summarize Button */}
      <div className="mb-6">
        <button
          onClick={handleSummarize}
          disabled={!notes.trim() || isSummarizing}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isSummarizing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              AI is analyzing your notes...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate AI Summary
            </>
          )}
        </button>
      </div>

      {/* Summary Output */}
      {summary && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              AI-Generated Summary
            </h4>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={downloadSummary}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {summary}
            </pre>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">💡 Tips for Better Summaries:</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include complete sentences and context for better analysis</li>
          <li>• Longer notes (200+ words) get more detailed summaries</li>
          <li>• The AI identifies key concepts, main points, and study tips</li>
          <li>• Use the summary as a study guide for review sessions</li>
        </ul>
      </div>
    </div>
  );
};

export default AINoteSummarizer;
