import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to login after 3 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 justify-center items-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-30 animate-bounce delay-150"></div>
      </div>

      {/* Logo and Title */}
      <div className="relative flex flex-col items-center">
        <div
          className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 
          rounded-full shadow-xl animate-pulse"
        >
          <Code2 className="w-12 h-12 text-white" />
        </div>
        <h1
          className="mt-6 text-4xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-400 to-blue-400 animate-fadeIn"
        >
          HackMate
        </h1>
        <p className="mt-2 text-gray-400 text-sm animate-fadeIn">
          Your gateway to smarter coding
        </p>
      </div>

      {/* Loading Animation */}
      <div className="absolute bottom-16 flex items-center justify-center gap-2">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}

export default SplashScreen;
