import React, { useState } from "react";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";

function MainPage() {
    const [problem, setProblem] = useState("");

    return (
        <div>
            <h2>Main Page</h2>
            <ProblemStatement onProblemGenerated={setProblem} />
            <CodeEditor problem={problem} />
        </div>
    );
}

export default MainPage;
