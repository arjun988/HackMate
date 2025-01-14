import React, { useState } from "react";
import Editor  from "@monaco-editor/react";

import {   Terminal } from "lucide-react";
function Code() {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
  
       
        const [stdin, setStdin] = useState("");
        
        const [executionError, setExecutionError] = useState("");

        

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


    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Header */}
            <div className="h-20 border-b border-gray-800 bg-black/40 backdrop-blur-md flex items-center px-8">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    Code Editor
                </h2>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 flex flex-col">
                {/* Language Selector */}
                <div className="flex justify-between items-center mb-4">
                    <select
                        className="p-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:ring-purple-400"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>
                 
                    <button
                        onClick={executeCode}
                        className={`px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-500 transition ${
                            isExecuting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isExecuting}
                    >
                        {isExecuting ? "Running..." : "Run Code"}
                    </button>
                </div>

                {/* Code Editor */}
                <div className="flex-1 border border-gray-800 rounded-lg overflow-hidden">
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value)}
                        theme="vs-dark"
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
                {/* Output Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-300">Output:</h3>
                    <div className="p-4 mt-2 border border-gray-800 bg-black/40 rounded-lg text-gray-200 overflow-auto max-h-40">
                        {output || "No output yet."}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-md py-6">
                <div className="px-8 text-center text-sm text-gray-400">
                    © 2025 HackMate. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Code;
