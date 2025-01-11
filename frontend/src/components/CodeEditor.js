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
            if (response.data.output) {
                setOutput(response.data.output);  // Display the actual output
            } else {
                setOutput("No output from the code.");
            }
        } catch (error) {
            alert("Code execution failed");
        }
    };

    const suggestImprovements = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/suggest_improvement", {
                code,
                problem_statement: problem  // Pass the problem statement
            });
            setSuggestions(response.data.suggestions || "No suggestions");
        } catch (error) {
            alert("Failed to generate suggestions");
        }
    };

    return (
        <div>
            <h3>Problem Statement</h3>
            <p>{problem}</p>
            <div>
                <label htmlFor="language-select">Select Language:</label>
                <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
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
            />
            <button onClick={executeCode}>Run Code</button>
            <button onClick={suggestImprovements}>Suggest Improvements</button>
            <h3>Output</h3>
            <pre>{output}</pre>
            <h3>Suggestions</h3>
            <pre>{suggestions}</pre>
        </div>
    );
}

export default CodeEditor;
