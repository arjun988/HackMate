import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LogOut, BookOpen, Code2, Menu, Star, AlertCircle, 
  Home, Maximize2, X, User, ChevronRight, Loader
} from "lucide-react";
import ProblemStatement from "./ProblemStatement";
import CodeEditor from "./CodeEditor";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 transform transition-all duration-300 
        translate-x-0 flex items-center gap-2 z-50 p-4 rounded-lg shadow-lg ${bgColor}`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="hover:text-gray-200">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

function MainPage() {
  const [problem, setProblem] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.setItem("isLoggedIn", false);
    showToast("Successfully logged out", "success");
    setTimeout(() => navigate("/login"), 1000);
  };

  const EditorModal = () => (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="w-11/12 h-5/6 bg-gray-900 rounded-2xl shadow-2xl flex flex-col animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-400" />
            Code Editor
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>
        <div className="flex-1 p-8 overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          ) : (
            <CodeEditor problem={problem} />
          )}
        </div>
      </div>
    </div>
  );

  const NavItem = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:text-white
        hover:bg-purple-500/10 transition-transform rounded-xl group relative transform hover:scale-105"
    >
      <Icon className="w-5 h-5 group-hover:text-purple-400" />
      <span className="font-medium">{children}</span>
      <ChevronRight
        className="w-4 h-4 opacity-0 group-hover:opacity-100 absolute right-4 
        transition-all transform group-hover:translate-x-1"
      />
    </Link>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed lg:static lg:flex flex-col w-80 h-full bg-black/60 
        backdrop-blur-xl transform transition-transform duration-500 ease-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} z-40`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-4 p-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 
            rounded-xl flex items-center justify-center shadow-lg transform 
            hover:scale-110 hover:rotate-6">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-purple-400 to-blue-400">
            HackMate
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem to="/DSA" icon={Home}>
            DSA
          </NavItem>
          <NavItem to="/LearnSQL" icon={Home}>
            SQL
          </NavItem>
          <NavItem to="/learn" icon={BookOpen}>
            Learn JavaScript
          </NavItem>
          <NavItem to="/javascriptProblems" icon={Star}>
            Problem Set
          </NavItem>
          <NavItem to="/Code" icon={Code2}>
            Code Editor
          </NavItem>
          <div className="pt-6 mt-6 border-t border-gray-800">
            <NavItem to="/Contact" icon={AlertCircle}>
              Help Center
            </NavItem>
            <NavItem to="/profile" icon={User}>
              Profile
            </NavItem>
          </div>
        </nav>

        {/* Logout Section */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-4 w-full text-red-400 
              hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-transform group transform hover:scale-105"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <div className="h-20 bg-black/40 backdrop-blur-xl flex items-center px-8 
          justify-between border-b border-gray-800/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-transform transform hover:scale-110"
            >
              <Menu className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-purple-400 to-blue-400">
              Coding Workspace
            </h2>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="h-full flex flex-col lg:flex-row gap-6">
            {/* Problem Statement */}
            <div className="lg:w-1/2 bg-black/40 backdrop-blur-xl rounded-2xl 
              border border-gray-800/50 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Problem Statement
                </h3>
                <ProblemStatement onProblemGenerated={setProblem} />
              </div>
            </div>

            {/* Code Editor */}
            <div className="lg:w-1/2 bg-black/40 backdrop-blur-xl rounded-2xl 
              border border-gray-800/50 overflow-hidden relative group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                transition-opacity z-10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg 
                    backdrop-blur-sm transition-transform transform hover:scale-110"
                  title="Expand Editor"
                >
                  <Maximize2 className="w-5 h-5 text-purple-400" />
                </button>
              </div>
              <div className="flex flex-col p-6 h-full">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Code Editor
                </h3>
                <div
      className="flex-1 overflow-auto rounded-md p-4">
      <CodeEditor problem={problem} />
    </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black/40 backdrop-blur-xl py-4 border-t border-gray-800/50">
          <div className="px-8 flex justify-between items-center text-sm">
            <p className="text-gray-400">© 2025 HackMate. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal */}
      {isModalOpen && <EditorModal />}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default MainPage;
