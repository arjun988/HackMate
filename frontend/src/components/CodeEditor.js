import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Play, Code, Lightbulb, Terminal } from "lucide-react";

const CodeEditor = ({ problem }) => {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("python");
    const [stdin, setStdin] = useState("");
    const [output, setOutput] = useState("");
    const [executionError, setExecutionError] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

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

            // Format the output
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

    const suggestImprovements = async () => {
        setIsGeneratingSuggestions(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/suggest_improvement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code,
                    problem_data: problem,
                })
            });
            
            if (!response.ok) {
                throw new Error("Failed to generate suggestions");
            }
            
            const data = await response.text();
            setSuggestions(data);
        } catch (error) {
            setSuggestions("Failed to generate suggestions: " + error.message);
        } finally {
            setIsGeneratingSuggestions(false);
        }
    };

    return (
        <div className="backdrop-blur-sm bg-black/30 p-8 rounded-2xl shadow-2xl border border-gray-800">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Code Editor
                </h3>
            </div>

            <div className="space-y-6">
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

                <div className="rounded-xl overflow-hidden border border-gray-800">
                    <Editor
                        height="400px"
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value)}
                        theme="vs-dark"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            padding: { top: 16, bottom: 16 },
                        }}
                    />
                </div>

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

                <div className="flex gap-4">
                    <button
                        className={`flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                            isExecuting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                        onClick={executeCode}
                        disabled={isExecuting}
                    >
                        <Play className="w-5 h-5" />
                        {isExecuting ? 'Executing...' : 'Run Code'}
                    </button>

                    <button
                        className={`flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                            isGeneratingSuggestions ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                        onClick={suggestImprovements}
                        disabled={isGeneratingSuggestions}
                    >
                        <Lightbulb className="w-5 h-5" />
                        {isGeneratingSuggestions ? 'Generating...' : 'Get Suggestions'}
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-green-400" />
                            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                                Output
                            </h3>
                        </div>
                        {executionError && (
                            <div className="p-4 bg-red-900/30 rounded-xl border border-red-800 text-red-300 mb-4">
                                {executionError}
                            </div>
                        )}
                        <pre className="p-4 bg-black/40 rounded-xl border border-gray-800 text-gray-300 min-h-[100px] max-h-[200px] overflow-auto">
                            {output || "No output yet."}
                        </pre>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-purple-400" />
                            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                Suggestions
                            </h3>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl border border-gray-800 text-gray-300 min-h-[100px] max-h-[200px] overflow-auto whitespace-pre-wrap">
                            {suggestions || "No suggestions yet."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;