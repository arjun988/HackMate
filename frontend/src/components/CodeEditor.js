import React, { useState } from "react";
import axios from "axios";
import { Editor } from "@monaco-editor/react";

function CodeEditor({ problem }) {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("python");
    const [output, setOutput] = useState("");
    const [suggestions, setSuggestions] = useState("");

    const executeCode = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/execute_code", { language, code });
            setOutput(response.data.output || "No output from the code.");
        } catch (error) {
            alert("Code execution failed");
        }
    };

    const suggestImprovements = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/suggest_improvement", {
                code,
                problem_data: problem,
            });
            
            setSuggestions(response.data);
        } catch (error) {
            alert("Failed to generate suggestions");
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="my-4">
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
                    <option value="cpp">C++</option>
                    <option value="csharp">C#</option>
                </select>
            </div>
            <Editor
                height="300px"
                language={language}
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-dark"
                className="rounded-lg"
            />
            <div className="flex space-x-4 mt-4">
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                    onClick={executeCode}
                >
                    Run Code
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    onClick={suggestImprovements}
                >
                    Suggest Improvements
                </button>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Output</h3>
                <pre className="bg-gray-700 p-4 rounded-lg text-gray-300">{output || "No output yet."}</pre>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Suggestions</h3>
                <div
                    className="bg-gray-700 p-4 rounded-lg text-gray-300 max-h-64 overflow-y-auto"
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    {suggestions || "No suggestions yet."}
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;
