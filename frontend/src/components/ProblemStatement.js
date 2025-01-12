import React, { useState } from "react";
import axios from "axios";

function ProblemStatement({onProblemGenerated }) {
    const [language, setLanguage] = useState("python");
    const [difficulty, setDifficulty] = useState("easy");

    // States for the problem data
    const [problemStatement, setProblemStatement] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [outputExplanation, setOutputExplanation] = useState("");

    const generateProblem = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/generate_problem", { language, difficulty });
            
            console.log("API Response:", response.data);
            
            if ('problem_statement' in response.data && 
                'input' in response.data && 
                'output' in response.data && 
                'output_explanation' in response.data) {
                const combinedData = JSON.stringify({
                        problem_statement: response.data.problem_statement,
                        input: response.data.input,
                        output: response.data.output,
                        output_explanation: response.data.output_explanation
                    });
                    onProblemGenerated (combinedData);
                setProblemStatement(response.data.problem_statement);
                setInput(response.data.input);
                setOutput(response.data.output);
                setOutputExplanation(response.data.output_explanation);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Failed to generate problem:", error);
            alert("Failed to generate problem");
        }
    };
    
    
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Generate Problem</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="language-select" className="block text-gray-400 mb-2">
                        Select Language:
                    </label>
                    <select
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-700 text-gray-300 p-2 rounded-lg w-full"
                    >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="difficulty-select" className="block text-gray-400 mb-2">
                        Select Difficulty:
                    </label>
                    <select
                        id="difficulty-select"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="bg-gray-700 text-gray-300 p-2 rounded-lg w-full"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full"
                    onClick={generateProblem}
                >
                    Generate
                </button>
            </div>

            {problemStatement && (
                <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-300">Problem Statement:</h4>
                    <p className="text-gray-400">{problemStatement}</p>

                    <h4 className="text-lg font-semibold text-gray-300 mt-4">Input:</h4>
                    <pre className="text-gray-400 bg-gray-700 p-4 rounded-lg">{input}</pre>

                    <h4 className="text-lg font-semibold text-gray-300 mt-4">Output:</h4>
                    <pre className="text-gray-400 bg-gray-700 p-4 rounded-lg">{output}</pre>

                    <h4 className="text-lg font-semibold text-gray-300 mt-4">Output Explanation:</h4>
                    <p className="text-gray-400">{outputExplanation}</p>
                </div>
            )}
        </div>
    );
}

export default ProblemStatement;
