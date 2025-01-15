import React, { useState, useEffect } from 'react';
import { Editor } from "@monaco-editor/react";
import {  
  Play, 
  Terminal,
  Code,
  Award,
  Eye,
  X,
  Search,
  Tag
} from 'lucide-react';

const problems = [
  {
    id: 1,
    title: 'Array Sum',
    difficulty: 'Easy',
    points: 50,
    tags: ['arrays', 'math', 'loops'],
    problemStatement: 'Write a function that takes an array of numbers and returns their sum.',
    expectedInput: '[1, 2, 3, 4, 5]',
    expectedOutput: '15',
    starterCode: '// Write your solution here\nfunction arraySum(numbers) {\n\n}',
    solution: `function arraySum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Test the function
const numbers = [1, 2, 3, 4, 5];
console.log(arraySum(numbers));`
  },
  {
    id: 2,
    title: 'String Reversal',
    difficulty: 'Easy',
    points: 50,
    tags: ['strings', 'manipulation'],
    problemStatement: 'Create a function that reverses a given string.',
    expectedInput: '"hello"',
    expectedOutput: '"olleh"',
    starterCode: '// Write your solution here\nfunction reverseString(str) {\n\n}',
    solution: `function reverseString(str) {
  return str.split('').reverse().join('');
}

// Test the function
console.log(reverseString('hello'));`
  },
  {
    id: 3,
    title: 'Find Maximum',
    difficulty: 'Easy',
    points: 75,
    tags: ['arrays', 'comparison', 'loops'],
    problemStatement: 'Write a function to find the maximum number in an array without using Math.max().',
    expectedInput: '[3, 7, 2, 9, 1]',
    expectedOutput: '9',
    starterCode: '// Write your solution here\nfunction findMax(numbers) {\n\n}',
    solution: `function findMax(numbers) {
  return numbers.reduce((max, num) => num > max ? num : max, numbers[0]);
}

// Test the function
const numbers = [3, 7, 2, 9, 1];
console.log(findMax(numbers));`
  },
  {
    id: 4,
    title: 'Palindrome Check',
    difficulty: 'Medium',
    points: 100,
    tags: ['strings', 'algorithms', 'validation'],
    problemStatement: 'Create a function that checks if a given string is a palindrome (reads the same forwards and backwards).',
    expectedInput: '"racecar"',
    expectedOutput: 'true',
    starterCode: '// Write your solution here\nfunction isPalindrome(str) {\n\n}',
    solution: `function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}

// Test the function
console.log(isPalindrome('racecar'));`
  },
  {
    id: 5,
    title: 'FizzBuzz',
    difficulty: 'Easy',
    points: 75,
    tags: ['conditionals', 'loops', 'math'],
    problemStatement: 'Write a function that prints numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".',
    expectedInput: '15',
    expectedOutput: '[1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]',
    starterCode: '// Write your solution here\nfunction fizzBuzz(n) {\n\n}',
    solution: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i);
  }
  return result;
}

// Test the function
console.log(fizzBuzz(15));`
  }
];

const JavaScriptProblemSet = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [activeProblem, setActiveProblem] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [language, setLanguage] = useState("python");
  const [stdin, setStdin] = useState("");
  const [executionError, setExecutionError] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [solution, setSolution] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('problemProgress');
    return saved ? JSON.parse(saved) : new Array(problems.length).fill(false);
  });

  const executeCode = async () => {
    setIsExecuting(true);
    setExecutionError("");
    setOutput("");
    
    try {
      const response = await fetch("http://127.0.0.1:5000/execute_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          language, 
          code,
          stdin 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Execution failed");
      }

      let formattedOutput = "";
      
      if (data.stdout) {
        formattedOutput += `Program Output:\n${data.stdout}\n`;
      }
      
      if (data.stderr) {
        formattedOutput += `\nErrors/Warnings:\n${data.stderr}\n`;
      }

      if (data.code !== 0) {
        setExecutionError(`Program exited with code ${data.code}`);
      }

      setOutput(formattedOutput || "Program executed with no output");

    } catch (error) {
      setExecutionError(error.message);
      console.error("Execution error:", error);
    } finally {
      setIsExecuting(false);
    }
  };

  const filteredProblems = problems.filter(problem => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    return searchTerms.every(term =>
      problem.title.toLowerCase().includes(term) ||
      problem.tags.some(tag => tag.toLowerCase().includes(term)) ||
      problem.difficulty.toLowerCase().includes(term)
    );
  });

  const openSolutionModal = (solutionText) => {
    setSolution(solutionText);
    setModalIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                JavaScript Problems
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Solved: {progress.filter(Boolean).length}/{problems.length}
              </div>
              <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${(progress.filter(Boolean).length / problems.length) * 100}%` }}
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
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search problems or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-gray-900/50 rounded-lg border border-gray-800/50 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none text-gray-100"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Problems</h2>
              <div className="space-y-2">
                {filteredProblems.map((problem, index) => (
                  <button
                    key={problem.id}
                    onClick={() => {
                      setActiveProblem(problems.indexOf(problem));
                      setCode(problem.starterCode);
                      setOutput('');
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      problems.indexOf(problem) === activeProblem 
                        ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-white' 
                        : 'hover:bg-gray-800/30'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="truncate">{problem.title}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-300">
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Problem Content */}
          <div className="col-span-9">
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    {problems[activeProblem].title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {problems[activeProblem].tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
                    {problems[activeProblem].difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Award className="w-4 h-4" />
                    {problems[activeProblem].points} pts
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Problem Statement */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Code className="w-5 h-5 text-violet-400" />
                    Problem Statement
                  </h3>
                  <p className="text-gray-300">{problems[activeProblem].problemStatement}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-black/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Sample Input</h4>
                      <pre className="text-gray-300 break-words whitespace-pre-wrap overflow-auto">
                        {problems[activeProblem].expectedInput}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Expected Output</h4>
                      <pre className="text-gray-300 break-words whitespace-pre-wrap overflow-auto">
                        {problems[activeProblem].expectedOutput}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-300 font-medium">
                    Programming Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 text-gray-100 rounded-xl border border-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>

                {/* Code Editor */}
                <div className="bg-gray-900/50 rounded-xl p-6">
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

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-blue-400" />
                      <label className="text-gray-300 font-medium">
                        Program Input (stdin)
                      </label>
                    </div>
                    <textarea
                      value={stdin}
                      onChange={(e) => setStdin(e.target.value)}
                      placeholder="Enter input for your program..."
                      className="w-full px-4 py-3 bg-gray-900/50 text-gray-100 rounded-xl border border-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={executeCode}
                      disabled={isExecuting}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-lg text-white hover:opacity-90 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <Play className="w-4 h-4" />
                      {isExecuting ? 'Running...' : 'Run Code'}
                    </button>

                    <button
                      onClick={() => openSolutionModal(problems[activeProblem].solution)}
                      className="flex items-center gap-2 px-6 py-2 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-600 transition-all hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      View Solution
                    </button>
                  </div>

                  {executionError && (
                    <div className="mt-6">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
                        {executionError}
                      </div>
                    </div>
                  )}

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

export default JavaScriptProblemSet;