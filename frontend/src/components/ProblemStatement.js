import React, { useState } from "react";
import axios from "axios";

function ProblemStatement({ onProblemGenerated }) {
    const [language, setLanguage] = useState("python");
    const [difficulty, setDifficulty] = useState("easy");

    const generateProblem = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/generate_problem", { language, difficulty });
            onProblemGenerated(response.data.problem_statement);
        } catch (error) {
            alert("Failed to generate problem");
        }
    };

    return (
        <div>
            <h3>Generate Problem</h3>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
            </select>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button onClick={generateProblem}>Generate</button>
        </div>
    );
}

export default ProblemStatement;
