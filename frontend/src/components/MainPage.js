import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, BookOpen, Code2 } from "lucide-react";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";

function MainPage() {
    const [problem, setProblem] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.setItem("isLoggedIn", false);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Header */}
            <header className="border-b border-gray-800 backdrop-blur-sm bg-black/30">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                HackMate
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                to="/learn"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-colors"
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>Learn JavaScript</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="space-y-8">
                    {/* Welcome Section */}
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Welcome to HackMate
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Generate coding problems, write solutions, and improve your programming skills.
                        </p>
                    </div>

                    {/* Problem Statement and Code Editor Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <ProblemStatement onProblemGenerated={setProblem} />
                        </div>
                        <div className="space-y-4">
                            <CodeEditor problem={problem} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-800 backdrop-blur-sm bg-black/30 py-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-400">© 2025 HackMate. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MainPage;