import React, { useState, useEffect } from 'react';
import { Editor } from "@monaco-editor/react";
import axios from 'axios';
import { 
  BookOpen, 
  Play, 
  Eye, 
  X, 
  CheckCircle,
  Award,
  Terminal,
  Code,
  Info
} from 'lucide-react';

// Enhanced chapters with more practical examples and real-world applications
const chapters = [
  {
    title: 'JavaScript Fundamentals',
    subtitle: 'Core Building Blocks',
    introduction: 'Master the essential building blocks of modern JavaScript development.',
    explanation: `JavaScript is the backbone of modern web development. Let's explore:
- Variable declarations with let, const, and their scope
- Modern data types including BigInt and Symbol
- Template literals and string interpolation
- The difference between null and undefined`,
    codeSnippet: `// Modern JavaScript Variables and Types
const user = {
  name: 'Alice',
  age: 25,
  skills: ['JavaScript', 'React', 'Node.js']
};

// Using destructuring and template literals
const { name, age } = user;
console.log(\`\${name} is \${age} years old and knows \${user.skills.length} technologies.\`);

// Working with newer types
const bigNumber = 9007199254740991n; // BigInt
const uniqueId = Symbol('id');        // Symbol`,
    problemStatement: 'Create a user profile system that validates age (must be over 18), stores skills as an array, and uses modern JavaScript features like destructuring and template literals.',
    solution: `const createUserProfile = (name, age, ...skills) => {
  // Age validation
  if (age < 18) {
    throw new Error('User must be at least 18 years old');
  }

  // Create profile with destructuring and rest parameters
  const profile = {
    name,
    age,
    skills: [...new Set(skills)], // Remove duplicates
    createdAt: new Date().toISOString()
  };

  return \`Profile created for \${profile.name} (age: \${profile.age})
Skills: \${profile.skills.join(', ')}
Created: \${new Date(profile.createdAt).toLocaleDateString()}\`;
};

console.log(createUserProfile('John', 25, 'JavaScript', 'React', 'Node.js'));`,
    difficulty: 'Beginner',
    points: 100,
    expectedInput: 'name: "John", age: 25, skills: ["JavaScript", "React", "Node.js"]',
    expectedOutput: 'Profile created for John (age: 25)\nSkills: JavaScript, React, Node.js\nCreated: [current date]',
  },
  {
    title: 'Operators',
    subtitle: 'Operators in JavaScript',
    introduction: 'Understand and apply arithmetic, comparison, logical, and assignment operators.',
    explanation: `JavaScript provides a wide range of operators to perform various operations:
- Arithmetic operators: +, -, *, /, %
- Comparison operators: ==, ===, !=, !==, >, <, >=, <=
- Logical operators: &&, ||, !
- Assignment operators: =, +=, -=, *=, /=`,
    codeSnippet: `// Example of operators
let a = 5, b = 3;
let sum = a + b;   // Arithmetic addition
let isEqual = a === b; // Comparison equality check
let isTrue = (a > b) && (b > 0); // Logical AND
a += b;  // Assignment operator`,
    problemStatement: 'Use the operators in JavaScript to manipulate and compare values of variables a and b.',
    solution: `let a = 5, b = 3;
a += b;  // a is now 8
let result = (a > b) ? 'a is greater' : 'b is greater'; // Ternary operator`,
    difficulty: 'Beginner',
    points: 100,
    expectedInput: 'a: 5, b: 3',
    expectedOutput: 'a is greater',
  },
  {
    title: 'Conditional Statements',
    subtitle: 'if, else, and switch Statements',
    introduction: 'Learn how to control the flow of your program using conditional statements.',
    explanation: `Conditional statements allow you to execute different code blocks based on certain conditions:
- if/else: Basic conditional structure
- switch: Multiple condition checks based on a variable`,
    codeSnippet: `// Example of if/else and switch
let age = 20;
if (age < 18) {
  console.log('You are underage.');
} else {
  console.log('You are an adult.');
}

// Switch example
let day = 3;
switch (day) {
  case 1:
    console.log('Monday');
    break;
  case 2:
    console.log('Tuesday');
    break;
  default:
    console.log('Weekend');
}`,
    problemStatement: 'Write a program that checks the day of the week and prints whether it is a weekday or weekend.',
    solution: `let day = 6; // Saturday
switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log('Weekday');
    break;
  default:
    console.log('Weekend');
}`,
    difficulty: 'Beginner',
    points: 100,
    expectedInput: 'day: 6',
    expectedOutput: 'Weekend',
  },
  {
    title: 'Loops',
    subtitle: 'for, while, and do-while Loops',
    introduction: 'Master the different types of loops in JavaScript.',
    explanation: `Loops allow you to repeat a block of code multiple times:
- for loop: Runs a block of code a fixed number of times
- while loop: Runs as long as the condition is true
- do-while loop: Runs at least once, then checks the condition`,
    codeSnippet: `// Example of loops
for (let i = 0; i < 5; i++) {
  console.log(i);
}

let j = 0;
while (j < 5) {
  console.log(j);
  j++;
}

let k = 0;
do {
  console.log(k);
  k++;
} while (k < 5);`,
    problemStatement: 'Create a loop that prints numbers 1 to 10 using all three types of loops.',
    solution: `// Using for loop
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// Using while loop
let i = 1;
while (i <= 10) {
  console.log(i);
  i++;
}

// Using do-while loop
let j = 1;
do {
  console.log(j);
  j++;
} while (j <= 10);`,
    difficulty: 'Beginner',
    points: 100,
    expectedInput: 'N/A',
    expectedOutput: '1 2 3 4 5 6 7 8 9 10',
  },
  {
    title: 'Arrays and Their Methods',
    subtitle: 'Working with Arrays in JavaScript',
    introduction: 'Learn how to work with arrays and manipulate data using array methods.',
    explanation: `Arrays are used to store multiple values in a single variable. You can perform various operations on arrays such as adding/removing elements and iterating over them:
- Array methods: push(), pop(), shift(), unshift(), map(), filter()`,
    codeSnippet: `// Array methods
let fruits = ['Apple', 'Banana', 'Cherry'];

// Add item to the end
fruits.push('Date');

// Remove item from the end
fruits.pop();

// Iterate through array with map
let fruitLengths = fruits.map(fruit => fruit.length);`,
    problemStatement: 'Create an array of numbers and find the sum using array methods.',
    solution: `let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);`,
    difficulty: 'Beginner',
    points: 100,
    expectedInput: 'numbers: [1, 2, 3, 4, 5]',
    expectedOutput: '15',
  },
  {
    title: 'String and Its Methods',
    subtitle: 'Working with Strings in JavaScript',
    introduction: 'Learn to manipulate and process strings using various built-in methods.',
    explanation: `Strings in JavaScript have many useful methods for common tasks such as searching, replacing, and manipulating the string:
- String methods: length, slice(), substring(), indexOf(), replace()`,
    codeSnippet: `// String methods
let text = "JavaScript is fun!";
let length = text.length;  // Get string length
let newText = text.replace('fun', 'awesome');  // Replace text`,
    problemStatement: 'Write a program that counts the number of vowels in a string.',
    solution: `let str = "JavaScript";
let vowels = str.split('').filter(char => 'aeiou'.includes(char.toLowerCase())).length;
console.log(vowels);`,
    difficulty: 'Beginner',
    points: 100,
    expectedInput: 'str: "JavaScript"',
    expectedOutput: '3',
  },
  {
    title: 'Functions',
    subtitle: 'Creating and Using Functions',
    introduction: 'Master function declarations, expressions, and how to call them.',
    explanation: `Functions in JavaScript allow you to define reusable blocks of code:
- Function declaration
- Function expression
- Arrow functions`,
    codeSnippet: `// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a, b) => a + b;`,
    problemStatement: 'Create a function that calculates the area of a rectangle.',
    solution: `const calculateArea = (length, width) => {
  return length * width;
};

console.log(calculateArea(5, 10));`,
    difficulty: 'Beginner',
    points: 100,
    expectedInput: 'length: 5, width: 10',
    expectedOutput: '50',
  },
  {
    title: 'Higher-Order Functions',
    subtitle: 'Functions that Accept Functions as Arguments',
    introduction: 'Explore higher-order functions and their applications.',
    explanation: `Higher-order functions are those that can accept other functions as arguments or return them as results:
- Array methods like map(), filter(), and reduce are examples of higher-order functions.`,
    codeSnippet: `// Higher-order function
const multiplyBy = (factor) => (num) => num * factor;
const double = multiplyBy(2);
console.log(double(5)); // 10`,
    problemStatement: 'Create a higher-order function that generates a function to subtract a number from the given value.',
    solution: `const subtractBy = (factor) => (num) => num - factor;
const subtractFive = subtractBy(5);
console.log(subtractFive(20)); // 15`,
    difficulty: 'Intermediate',
    points: 100,
    expectedInput: 'factor: 5, num: 20',
    expectedOutput: '15',
  },
  {
    title: 'JavaScript Error Handling',
    subtitle: 'Handling Errors with Try/Catch',
    introduction: 'Learn how to gracefully handle errors in JavaScript using try/catch blocks.',
    explanation: `Error handling is crucial for building robust applications. In JavaScript, we use try/catch blocks to handle runtime errors gracefully.`,
    codeSnippet: `// Error handling
try {
  let result = someUndefinedFunction();
} catch (error) {
  console.error('Error:', error.message);
}`,
    problemStatement: 'Write a function that handles division by zero and returns a custom error message.',
    solution: `const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
};

try {
  console.log(divide(5, 0));
} catch (error) {
  console.error(error.message);
}`,
    difficulty: 'Intermediate',
    points: 100,
    expectedInput: 'a: 5, b: 0',
    expectedOutput: 'Cannot divide by zero',
  },
];


const LearnJavaScript = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [solution, setSolution] = useState('');
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('jsProgress');
    return saved ? JSON.parse(saved) : new Array(chapters.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem('jsProgress', JSON.stringify(progress));
  }, [progress]);

  const executeCode = async (code) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/execute_javascriptcode', {
        language: 'javascript',
        code
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error executing the code: ' + error.message);
    }
  };
  const openSolutionModal = (solutionText) => {
    setSolution(solutionText); // Set the solution to display in the modal
    setModalIsOpen(true); // Open the modal
  };
  const markChapterComplete = (index) => {
    const newProgress = [...progress];
    newProgress[index] = true;
    setProgress(newProgress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                Master JavaScript
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Progress: {progress.filter(Boolean).length}/{chapters.length}
              </div>
              <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${(progress.filter(Boolean).length / chapters.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-24 bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
              <h2 className="text-lg font-semibold mb-4">Chapters</h2>
              <div className="space-y-2">
                {chapters.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveChapter(index)}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between gap-2 transition-colors ${
                      activeChapter === index 
                        ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-white' 
                        : 'hover:bg-gray-800/30'
                    }`}
                  >
                    <span className="truncate">{chapter.title}</span>
                    {progress[index] && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chapter Content */}
          <div className="col-span-9 space-y-8">
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    {chapters[activeChapter].title}
                  </h2>
                  <p className="text-gray-400 mt-1">{chapters[activeChapter].subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
                    {chapters[activeChapter].difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Award className="w-4 h-4" />
                    {chapters[activeChapter].points} pts
                  </span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="space-y-6">
                  <div className="bg-gray-900/50 rounded-xl p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <Info className="w-5 h-5 text-blue-400" />
                      Introduction
                    </h3>
                    <p className="text-gray-300">{chapters[activeChapter].introduction}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <Info className="w-5 h-5 text-blue-400" />
                      Explanation
                    </h3>
                    <p className="text-gray-300">{chapters[activeChapter].explanation}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-xl p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <Terminal className="w-5 h-5 text-green-400" />
                      Example
                    </h3>
                    <div className="bg-black/50 rounded-lg p-4">
                      <pre className="text-gray-300">
                        <code>{chapters[activeChapter].codeSnippet}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <Code className="w-5 h-5 text-violet-400" />
                      Challenge
                    </h3>
                    <p className="text-gray-300 mb-4">{chapters[activeChapter].problemStatement}</p>
                    
                    <Editor
                      height="300px"
                      language="javascript"
                      value={code}
                      onChange={setCode}
                      theme="vs-dark"
                      className="rounded-lg overflow-hidden"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 20 },
                      }}
                    />

                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => executeCode(code)}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg text-white hover:opacity-90 transition-all hover:scale-105"
                      >
                        <Play className="w-4 h-4" />
                        Run Code
                      </button>

                      <button
                        onClick={() => openSolutionModal(chapters[activeChapter].solution)}
                        className="flex items-center gap-2 px-6 py-2 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-600 transition-all hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        View Solution
                      </button>

                      <button
                        onClick={() => markChapterComplete(activeChapter)}
                        className="flex items-center gap-2 px-6 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-600/30 transition-all hover:scale-105 ml-auto"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark Complete
                      </button>
                    </div>

                    {output && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-white mb-2">Output:</h4>
                        <div className="bg-black/50 rounded-lg p-4">
                          <pre className="text-gray-300">{output}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModalIsOpen(false)} />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-gray-900 rounded-xl p-6 max-w-2xl w-full border border-gray-800/50">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    Solution
                  </h2>
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <pre className="bg-black/50 p-4 rounded-lg text-gray-300 overflow-x-auto">
                  {solution}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnJavaScript;