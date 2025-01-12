import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";

function MainPage() {
    const [problem, setProblem] = useState("");
    const navigate = useNavigate(); // Initialize navigation

    const handleLogout = () => {
        // Clear the auth token from localStorage
        localStorage.removeItem("auth_token");
        // Update login state
        localStorage.setItem("isLoggedIn", false);
        // Redirect to the login page
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6 relative">
            {/* Add clickable link to Learn page */}
            <Link
                to="/learn"
                className="absolute top-4 right-4 text-blue-400 hover:underline"
            >
                Learn JavaScript
            </Link>

            <h2 className="text-3xl font-bold mb-6">Main Page</h2>
            <div className="w-full max-w-4xl space-y-8">
                <ProblemStatement onProblemGenerated={setProblem} />
                <CodeEditor problem={problem} />
            </div>

            {/* Logout button */}
            <button
                className="mt-6 py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default MainPage;
