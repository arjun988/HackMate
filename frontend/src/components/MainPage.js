import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, BookOpen, Code2, Menu, Star, AlertCircle, Home, Maximize2, X,User } from "lucide-react";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";

function MainPage() {
    const [problem, setProblem] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.setItem("isLoggedIn", false);
        navigate("/login");
    };

    // Modal component for the code editor
    const EditorModal = () => (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
        >
            <div 
                className="w-11/12 h-5/6 bg-gray-900 rounded-xl shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h3 className="text-xl font-semibold text-white">Code Editor</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                </div>
                <div className="flex-1 p-6 overflow-auto">
                    <CodeEditor problem={problem} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Sidebar */}
            <div className={`fixed lg:static lg:flex flex-col w-72 h-full border-r border-gray-800 bg-black/40 backdrop-blur-md transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} z-50`}>
                {/* Logo Section */}
                <div className="flex items-center gap-3 p-8 border-b border-gray-800">
                <div className="group w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-6 hover:-translate-y-1">
    <Code2 className="w-6 h-6 text-white" />
</div>

                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        HackMate
                    </h1>
                </div>
                
                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-2">
                    <div className="pb-4">
                        {/* <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Main Menu</h3> */}
                        <div className="space-y-1">
                            <Link
                                to="/DSA"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <Home className="w-5 h-5 group-hover:text-purple-400" />
                                <span>DSA</span>
                            </Link>
                            <Link
                                to="/LearnSQL"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <Home className="w-5 h-5 group-hover:text-purple-400" />
                                <span>SQL</span>
                            </Link>
                            <Link
                                to="/learn"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <BookOpen className="w-5 h-5 group-hover:text-purple-400" />
                                <span>Learn JavaScript</span>
                            </Link>
                            <Link
                                to="/javascriptProblems"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <Star className="w-5 h-5 group-hover:text-purple-400" />
                                <span>Problem Set</span>
                            </Link>
                            <Link
                                to="/Code"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <Home className="w-5 h-5 group-hover:text-purple-400" />
                                <span>Code Editor</span>
                            </Link>
                        </div>
                    </div>

                    <div className="pb-4">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Support</h3>
                        <div className="space-y-1">
                            <Link
                                to="/help"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <AlertCircle className="w-5 h-5 group-hover:text-purple-400" />
                                <span>Help Center</span>
                            </Link>
                            <Link
                                to="/profile"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <User className="w-5 h-5 group-hover:text-purple-400" />
                                <span>Profile</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* User Section */}
                <div className="p-6">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/5 transition-all w-full group"
                    >
                        <LogOut className="w-5 h-5 group-hover:text-red-300" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Bar */}
                <div className="h-20 border-b border-gray-800 bg-black/40 backdrop-blur-md flex items-center px-8">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden mr-4 text-gray-400 hover:text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Coding Workspace
                        </h2>
                    </div>
                </div>

                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-gray-800">
                    <div className="max-w-3xl mx-auto px-8 py-12 text-center">
                        <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            Welcome to Your Workspace
                        </h3>
                        <p className="text-gray-400 text-lg">
                            Generate coding problems, write solutions, and improve your programming skills.
                        </p>
                    </div>
                </div>

                {/* Workspace */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full flex flex-col lg:flex-row">
                        {/* Problem Statement Section */}
                        <div className="lg:w-1/2 h-full overflow-auto border-r border-gray-800 bg-black/20">
                            <div className="p-8">
                                <ProblemStatement onProblemGenerated={setProblem} />
                            </div>
                        </div>
                        
                        {/* Code Editor Section */}
                        <div className="lg:w-1/2 h-full overflow-auto bg-black/20 relative group">
                            {/* Expand Button */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="p-2 bg-gray-800/50 hover:bg-gray-700 rounded-lg backdrop-blur-sm transition-colors"
                                    title="Expand Editor"
                                >
                                    <Maximize2 className="w-5 h-5 text-gray-300 hover:text-white" />
                                </button>
                            </div>
                            {/* Editor Content */}
                            <div className="p-8">
                                <CodeEditor problem={problem} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-md py-6">
                    <div className="px-8 flex justify-between items-center text-sm">
                        <p className="text-gray-400">© 2025 HackMate. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Modal */}
            {isModalOpen && <EditorModal />}
        </div>
    );
}

export default MainPage;