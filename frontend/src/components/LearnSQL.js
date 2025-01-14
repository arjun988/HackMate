import React, { useState } from 'react';
import { BookOpen, Terminal, Code, Award, Info, CheckCircle } from 'lucide-react';

const sqlTopics = [
  {
    title: 'SELECT Statement',
    subtitle: 'Retrieving Data from a Table',
    introduction: 'Learn how to use the SELECT statement to retrieve data from a database.',
    explanation: `The SELECT statement is used to query the database and retrieve records. It can select one or more columns, or all columns with *.
- SELECT column_name FROM table_name;`,
    codeSnippet: `-- Retrieving all columns
SELECT * FROM Customers;

-- Retrieving specific columns
SELECT name, age FROM Customers;`,
    difficulty: 'Beginner',
    points: 100,
    exampleInput: 'Customers table',
    exampleOutput: 'name, age, ...',
  },
  {
    title: 'JOIN Clause',
    subtitle: 'Combining Data from Multiple Tables',
    introduction: 'Understand how to use JOIN to combine rows from two or more tables.',
    explanation: `The JOIN clause allows you to combine rows from two or more tables based on a related column.
- INNER JOIN: Combines rows from both tables where there is a match.
- LEFT JOIN: Returns all rows from the left table, and matched rows from the right table.`,
    codeSnippet: `-- Using INNER JOIN
SELECT Orders.id, Customers.name
FROM Orders
INNER JOIN Customers ON Orders.customer_id = Customers.id;`,
    difficulty: 'Intermediate',
    points: 200,
    exampleInput: 'Orders and Customers tables',
    exampleOutput: 'Order ID, Customer Name',
  },
  {
    title: 'GROUP BY Clause',
    subtitle: 'Aggregating Data',
    introduction: 'Learn how to use GROUP BY to group rows that have the same values into summary rows.',
    explanation: `GROUP BY is used in collaboration with aggregate functions (e.g., COUNT, SUM, AVG) to group rows.
- GROUP BY column_name;
- HAVING: Filters groups based on aggregate values.`,
    codeSnippet: `-- Using GROUP BY
SELECT COUNT(*) AS number_of_orders, customer_id
FROM Orders
GROUP BY customer_id;`,
    difficulty: 'Advanced',
    points: 300,
    exampleInput: 'Orders table',
    exampleOutput: 'Number of Orders, Customer ID',
  },
];

const LearnSQL = () => {
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
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                Learn SQL
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                Progress: {completedTopics.length}/{sqlTopics.length}
              </div>
              <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${(completedTopics.length / sqlTopics.length) * 100}%` }}
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
              <h2 className="text-lg font-semibold mb-4">SQL Topics</h2>
              <div className="space-y-2">
                {sqlTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTopic(index)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTopic === index
                        ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 text-white'
                        : 'hover:bg-gray-800/30'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="truncate">{topic.title}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">
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
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                    {sqlTopics[activeTopic].title}
                  </h2>
                  <p className="text-gray-400 mt-1">{sqlTopics[activeTopic].subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                    {sqlTopics[activeTopic].difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Award className="w-4 h-4" />
                    {sqlTopics[activeTopic].points} pts
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Introduction */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Info className="w-5 h-5 text-green-400" />
                    Introduction
                  </h3>
                  <p className="text-gray-300">{sqlTopics[activeTopic].introduction}</p>
                </div>

                {/* Explanation */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <BookOpen className="w-5 h-5 text-green-400" />
                    Explanation
                  </h3>
                  <p className="text-gray-300 whitespace-pre-line">{sqlTopics[activeTopic].explanation}</p>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-black/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Example Input</h4>
                      <pre className="text-gray-300 break-words whitespace-pre-wrap overflow-auto">
                        {sqlTopics[activeTopic].exampleInput}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Example Output</h4>
                      <pre className="text-gray-300 break-words whitespace-pre-wrap overflow-auto">
                        {sqlTopics[activeTopic].exampleOutput}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Code className="w-5 h-5 text-green-400" />
                    SQL Code Example
                  </h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                    <code className="text-gray-300">{sqlTopics[activeTopic].codeSnippet}</code>
                  </pre>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={handleMarkAsCompleted}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all hover:scale-105 ${
                        completedTopics.includes(activeTopic)
                          ? 'bg-green-600 text-white'
                          : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:opacity-90'
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

export default LearnSQL;
