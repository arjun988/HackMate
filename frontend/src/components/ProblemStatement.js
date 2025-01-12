import React, { useState } from "react";
import axios from "axios";
import { Code2, Wand2 } from "lucide-react";

function ProblemStatement({ onProblemGenerated }) {
    const [language, setLanguage] = useState("python");
    const [difficulty, setDifficulty] = useState("easy");
    const [isLoading, setIsLoading] = useState(false);
    const [problemStatement, setProblemStatement] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [outputExplanation, setOutputExplanation] = useState("");

    const generateProblem = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/generate_problem", { language, difficulty });
            
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
                onProblemGenerated(combinedData);
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="backdrop-blur-sm bg-black/30 p-8 rounded-2xl shadow-2xl border border-gray-800">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Generate Problem
                </h3>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="language-select" className="block text-gray-300 font-medium">
                        Programming Language
                    </label>
                    <select
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 text-gray-100 rounded-xl border border-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                    >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="difficulty-select" className="block text-gray-300 font-medium">
                        Difficulty Level
                    </label>
                    <select
                        id="difficulty-select"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 text-gray-100 rounded-xl border border-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <button
                    className={`w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    onClick={generateProblem}
                    disabled={isLoading}
                >
                    <Wand2 className="w-5 h-5" />
                    {isLoading ? 'Generating...' : 'Generate Problem'}
                </button>
            </div>

            {problemStatement && (
                <div className="mt-8 space-y-6">
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Problem Statement
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{problemStatement}</p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Input
                        </h4>
                        <pre className="p-4 bg-black/40 rounded-xl border border-gray-800 text-gray-300 overflow-x-auto">{input}</pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Output
                        </h4>
                        <pre className="p-4 bg-black/40 rounded-xl border border-gray-800 text-gray-300 overflow-x-auto">{output}</pre>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Output Explanation
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{outputExplanation}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProblemStatement;