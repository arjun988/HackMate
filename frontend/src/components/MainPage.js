import React, { useState } from "react";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";

function MainPage() {
    const [problem, setProblem] = useState("");

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
            <h2 className="text-3xl font-bold mb-6">Main Page</h2>
            <div className="w-full max-w-4xl space-y-8">
                <ProblemStatement onProblemGenerated={setProblem} />
                <CodeEditor problem={problem} />
            </div>
        </div>
    );
}

export default MainPage;
