import React, { useState } from 'react';
import { Editor } from "@monaco-editor/react";
import axios from 'axios';
import { BookOpen, Play, Eye, X } from 'lucide-react';

const chapters = [
    {
      title: 'JavaScript Syntax, Variables, Constants, and Data Types',
      introduction: 'Learn the basic building blocks of JavaScript including syntax, comments, variables, constants, and data types.',
      explanation: 'JavaScript syntax is the set of rules that define a valid JavaScript program. It includes the use of variables, constants, and basic data types such as String, Number, Boolean, Undefined, Null, and Symbol. Variables can be declared using `var`, `let`, and `const`.',
      codeSnippet: `// Example: Variable Declaration
  let name = 'Alice';
  const age = 25;
  console.log(\`\${name} is \${age} years old.\`);`,
      problemStatement: 'Write a JavaScript program to declare variables for a user\'s name and age, then log a sentence introducing them using template literals.',
      solution: `let name = 'John';
  let age = 30;
  console.log(\`\${name} is \${age} years old.\`);`,
      expectedInput: 'Name: "John", Age: 30',
      expectedOutput: '"John is 30 years old."',
    },
    {
      title: 'Operators: Arithmetic, Comparison, Logical, and Assignment Operators',
      introduction: 'Explore the different types of operators in JavaScript that allow you to manipulate values and compare them.',
      explanation: `JavaScript has several types of operators:
        - Arithmetic operators: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`
        - Comparison operators: \`==\`, \`===\`, \`!=\`, \`!==\`, \`>\`, \<\`, \`>=\`, \`<=\`
        - Logical operators: \`&&\`, \`||\`, \`!\`
        - Assignment operators: \`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`,
      These operators are fundamental for performing operations in JavaScript.`,
      codeSnippet: `// Example: Arithmetic and Comparison Operators
  let a = 10, b = 20;
  console.log(a + b);  // Output: 30
  console.log(a > b);  // Output: false`,
      problemStatement: 'Write a program that checks if a number is divisible by both 3 and 5 using the modulus operator.',
      solution: `function isDivisibleBy3And5(number) {
    return number % 3 === 0 && number % 5 === 0;
  }
  console.log(isDivisibleBy3And5(15));  // Output: true`,
      expectedInput: '15',
      expectedOutput: 'true',
    },
    {
      title: 'String and Its Methods',
      introduction: 'Learn about strings and the built-in methods to manipulate string data in JavaScript.',
      explanation: 'Strings in JavaScript are sequences of characters and have many built-in methods for manipulation. Common methods include .length, .toUpperCase(), .toLowerCase(), .trim(), .substring(), .replace(), and .split().',
      codeSnippet: `// Example: String Methods
  let str = '  Hello World!  ';
  console.log(str.trim());  // Output: 'Hello World!'`,
      problemStatement: 'Write a JavaScript program that takes a string, removes leading and trailing whitespaces, and returns the string with the first letter capitalized.',
      solution: `function capitalizeFirstLetter(str) {
    return str.trim().charAt(0).toUpperCase() + str.slice(1);
  }
  console.log(capitalizeFirstLetter('  hello'));  // Output: 'Hello'`,
      expectedInput: '"  hello"',
      expectedOutput: '"Hello"',
    },
    {
      title: 'Conditional Statements',
      introduction: 'Understand how to control the flow of your programs using conditional statements.',
      explanation: 'Conditional statements like `if`, `else`, `else if`, and `switch` help control the flow of your program based on conditions.',
      codeSnippet: `// Example: if-else Statement
  let age = 20;
  if (age >= 18) {
    console.log('You are an adult');
  } else {
    console.log('You are a minor');
  }`,
      problemStatement: 'Write a JavaScript program that checks if a number is positive, negative, or zero.',
      solution: `function checkNumberSign(num) {
    if (num > 0) {
      return 'Positive';
    } else if (num < 0) {
      return 'Negative';
    } else {
      return 'Zero';
    }
  }
  console.log(checkNumberSign(-5));  // Output: 'Negative'`,
      expectedInput: '-5',
      expectedOutput: 'Negative',
    },
    {
      title: 'Loops',
      introduction: 'Learn how to repeat a block of code using loops.',
      explanation: 'Loops are used to execute a block of code multiple times. Common loops in JavaScript include `for`, `while`, and `do-while` loops.',
      codeSnippet: `// Example: for Loop
  for (let i = 1; i <= 5; i++) {
    console.log(i);
  }`,
      problemStatement: 'Write a JavaScript program to print the first 10 numbers of the Fibonacci sequence using a loop.',
      solution: `function fibonacci(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
      console.log(a);
      [a, b] = [b, a + b];
    }
  }
  fibonacci(10);`,
      expectedInput: '10',
      expectedOutput: '0, 1, 1, 2, 3, 5, 8, 13, 21, 34',
    },
    {
      title: 'Arrays and Their Methods',
      introduction: 'Explore arrays and the various methods available to manipulate arrays.',
      explanation: 'Arrays in JavaScript are ordered collections of values. Common methods include .push(), .pop(), .shift(), .unshift(), .map(), .filter(), and .reduce().',
      codeSnippet: `// Example: Array Method
  let numbers = [1, 2, 3, 4];
  numbers.push(5);  // Adds 5 at the end
  console.log(numbers);  // Output: [1, 2, 3, 4, 5]`,
      problemStatement: 'Write a JavaScript program to find the sum of all elements in an array.',
      solution: `function sumArray(arr) {
    return arr.reduce((acc, num) => acc + num, 0);
  }
  console.log(sumArray([1, 2, 3, 4]));  // Output: 10`,
      expectedInput: '[1, 2, 3, 4]',
      expectedOutput: '10',
    },
    {
      title: 'Functions',
      introduction: 'Learn how to write reusable blocks of code using functions.',
      explanation: 'Functions in JavaScript can be declared, invoked, or assigned to variables. They can take parameters, return values, and even be anonymous or arrow functions.',
      codeSnippet: `// Example: Arrow Function
  const add = (x, y) => x + y;
  console.log(add(3, 5));  // Output: 8`,
      problemStatement: 'Write a JavaScript function that takes two numbers as arguments and returns their greatest common divisor (GCD).',
      solution: `function gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }
  console.log(gcd(56, 98));  // Output: 14`,
      expectedInput: '56, 98',
      expectedOutput: '14',
    },
    {
      title: 'Higher-Order Functions',
      introduction: 'Learn about functions that take other functions as arguments or return functions as values.',
      explanation: 'Higher-order functions are a key feature of JavaScript. They allow you to abstract common patterns and make your code more reusable and flexible.',
      codeSnippet: `// Example: Higher-Order Function
  const numbers = [1, 2, 3, 4];
  const doubled = numbers.map(num => num * 2);
  console.log(doubled);  // Output: [2, 4, 6, 8]`,
      problemStatement: 'Write a higher-order function that filters out all numbers greater than 10 from an array.',
      solution: `function filterGreaterThan10(arr) {
    return arr.filter(num => num > 10);
  }
  console.log(filterGreaterThan10([5, 10, 15, 20]));  // Output: [15, 20]`,
      expectedInput: '[5, 10, 15, 20]',
      expectedOutput: '[15, 20]',
    },
    {
      title: 'JavaScript Objects',
      introduction: 'Learn how to create and manipulate objects in JavaScript.',
      explanation: 'Objects are collections of key-value pairs. You can access properties using dot notation or bracket notation. JavaScript objects are very useful for modeling real-world data.',
      codeSnippet: `// Example: Object Manipulation
  let person = { name: 'John', age: 30 };
  person.city = 'New York';
  console.log(person.name);  // Output: 'John'`,
      problemStatement: 'Write a JavaScript program that creates an object representing a book with properties like title, author, and year, and logs them to the console.',
      solution: `let book = { title: 'JavaScript Basics', author: 'John Doe', year: 2021 };
  console.log(book.title);  // Output: 'JavaScript Basics'`,
      expectedInput: 'title: "JavaScript Basics", author: "John Doe", year: 2021',
      expectedOutput: 'JavaScript Basics',
    },
    {
      title: 'JavaScript Error Handling',
      introduction: 'Learn how to handle errors in JavaScript using try-catch blocks.',
      explanation: 'Error handling allows you to gracefully manage errors in your programs. You can use try-catch blocks to catch exceptions and handle them without crashing the program.',
      codeSnippet: `// Example: try-catch Block
  try {
    let result = 10 / 0;
    if (!isFinite(result)) throw 'Division by zero';
  } catch (error) {
    console.log('Error:', error);  // Output: 'Error: Division by zero'
  }`,
      problemStatement: 'Write a JavaScript function that tries to parse a string into an integer and logs an error if the string cannot be parsed.',
      solution: `function parseInteger(str) {
    try {
      let result = parseInt(str);
      if (isNaN(result)) throw 'Invalid number';
      return result;
    } catch (error) {
      console.log('Error:', error);
    }
  }
  parseInteger('abc');  // Output: 'Error: Invalid number'`,
      expectedInput: 'abc',
      expectedOutput: 'Error: Invalid number',
    },
  ];
  
  const LearnJavaScript = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [solution, setSolution] = useState('');
  
    const executeCode = async (code) => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/execute_code', {
          language: 'javascript',
          code
        });
        setOutput(response.data.output);
      } catch (error) {
        console.error('Execution error:', error);
        setOutput('Error executing the code.');
      }
    };
  
    const openSolutionModal = (solution) => {
      setSolution(solution);
      setModalIsOpen(true);
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Learn JavaScript
            </h1>
          </div>
  
          <div className="space-y-12">
            {chapters.map((chapter, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  {chapter.title}
                </h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300">{chapter.introduction}</p>
                  <p className="text-gray-400">{chapter.explanation}</p>
                </div>
  
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Code Example</h3>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <pre className="text-gray-300">
                      <code>{chapter.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
  
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">Challenge</h3>
                  <p className="text-gray-300">{chapter.problemStatement}</p>
                </div>
  
                <div className="space-y-4">
                  <Editor
                    height="300px"
                    language="javascript"
                    value={code}
                    onChange={(value) => setCode(value)}
                    theme="vs-dark"
                    className="rounded-lg overflow-hidden"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                    }}
                  />
  
                  <div className="flex gap-4">
                    <button
                      onClick={() => executeCode(code)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:opacity-90 transition-opacity"
                    >
                      <Play className="w-4 h-4" />
                      Run Code
                    </button>
  
                    <button
                      onClick={() => openSolutionModal(chapter.solution)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Solution
                    </button>
                  </div>
  
                  {output && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Output:</h4>
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <pre className="text-gray-300">{output}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {modalIsOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalIsOpen(false)} />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-gray-900 rounded-xl p-6 max-w-2xl w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Solution</h2>
                    <button
                      onClick={() => setModalIsOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <pre className="bg-gray-800 p-4 rounded-lg text-gray-300 overflow-x-auto">
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