import React, { useState } from 'react';
import {
  BookOpen,
  Terminal,
  Code,
  Award,
  Info,
  CheckCircle
} from 'lucide-react';

const dsaTopics = [
  {
    title: 'Arrays',
    subtitle: 'Understanding and Using Arrays',
    introduction: 'Learn how to use arrays to store, access, and manipulate data.',
    explanation: `An array is a collection of elements stored at contiguous memory locations. Arrays can be used for various operations like:
- Storing a collection of data
- Iterating over data
- Sorting and searching`,
    codeSnippet: `// Declaring and Using Arrays
const arr = [10, 20, 30, 40];

// Accessing elements
console.log(arr[0]); // Output: 10

// Adding elements
arr.push(50);
console.log(arr); // Output: [10, 20, 30, 40, 50]

// Iterating over an array
arr.forEach((value) => console.log(value));`,
    difficulty: 'Beginner',
    points: 100,
    exampleInput: '[10, 20, 30]',
    exampleOutput: '10\n20\n30',
  },
  {
    title: 'Linked Lists',
    subtitle: 'Dynamic Data Structures',
    introduction: 'Understand how linked lists work and how they differ from arrays.',
    explanation: `A linked list is a linear data structure where each element (node) points to the next node:
- Singly Linked List: Each node points to the next node.
- Doubly Linked List: Each node points to both the next and previous nodes.`,
    codeSnippet: `// Defining a Node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Creating a Linked List
class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
}

const list = new LinkedList();
list.add(10);
list.add(20);
console.log(list.head);`,
    difficulty: 'Intermediate',
    points: 200,
    exampleInput: '10 -> 20 -> null',
    exampleOutput: '{ value: 10, next: { value: 20, next: null } }',
  },
  {
    title: 'Binary Search',
    subtitle: 'Efficient Searching',
    introduction: 'Learn how binary search can efficiently find elements in a sorted array.',
    explanation: `Binary search divides the search interval in half each time. It works on sorted arrays and has a time complexity of O(log n):
- Compare the middle element with the target.
- Adjust the search interval accordingly.`,
    codeSnippet: `// Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

const array = [10, 20, 30, 40, 50];
console.log(binarySearch(array, 30)); // Output: 2`,
    difficulty: 'Intermediate',
    points: 150,
    exampleInput: '[10, 20, 30, 40, 50], target: 30',
    exampleOutput: '2',
  },
];

const DSAPage = () => {
  const [activeTopic, setActiveTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState([]);

  const handleMarkAsCompleted = () => {
    if (!completedTopics.includes(activeTopic)) {
      setCompletedTopics((prev) => [...prev, activeTopic]);
    }
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
                Data Structures & Algorithms
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Progress: {completedTopics.length}/{dsaTopics.length}
              </div>
              <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${(completedTopics.length / dsaTopics.length) * 100}%` }}
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
              <h2 className="text-lg font-semibold mb-4">Topics</h2>
              <div className="space-y-2">
                {dsaTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTopic(index)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTopic === index
                        ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-white'
                        : 'hover:bg-gray-800/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="truncate">{topic.title}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-300">
                        {topic.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Topic Content */}
          <div className="col-span-9">
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    {dsaTopics[activeTopic].title}
                  </h2>
                  <p className="text-gray-400 mt-1">{dsaTopics[activeTopic].subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
                    {dsaTopics[activeTopic].difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Award className="w-4 h-4" />
                    {dsaTopics[activeTopic].points} pts
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Introduction */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Info className="w-5 h-5 text-violet-400" />
                    Introduction
                  </h3>
                  <p className="text-gray-300">{dsaTopics[activeTopic].introduction}</p>
                </div>

                {/* Explanation */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <BookOpen className="w-5 h-5 text-violet-400" />
                    Explanation
                  </h3>
                  <p className="text-gray-300 whitespace-pre-line">{dsaTopics[activeTopic].explanation}</p>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-black/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Sample Input</h4>
                      <pre className="text-gray-300 break-words whitespace-pre-wrap overflow-auto">
                        {dsaTopics[activeTopic].exampleInput}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Sample Output</h4>
                      <pre className="text-gray-300 break-words whitespace-pre-wrap overflow-auto">
                        {dsaTopics[activeTopic].exampleOutput}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Code className="w-5 h-5 text-violet-400" />
                    Example Code
                  </h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                    <code className="text-gray-300">{dsaTopics[activeTopic].codeSnippet}</code>
                  </pre>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={handleMarkAsCompleted}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all hover:scale-105 ${
                        completedTopics.includes(activeTopic)
                          ? 'bg-green-600 text-white'
                          : 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {completedTopics.includes(activeTopic) ? 'Completed' : 'Mark as Completed'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAPage;