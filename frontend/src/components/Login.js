import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", { username, password });
            if (response.status === 200) {
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('isLoggedIn', true);
                onLogin();
                navigate("/");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            alert(errorMessage);
            if (error.response?.status === 404 || errorMessage.toLowerCase().includes("account does not exist")) {
                navigate("/signup");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="w-full max-w-md p-8 backdrop-blur-sm bg-black/30 rounded-2xl shadow-2xl border border-gray-800">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        Welcome Back
                    </h2>
                </div>

                <div className="space-y-6">
                    <div className="relative group">
                        <User className="absolute text-gray-400 left-3 top-3 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            className="w-full px-10 py-3 bg-gray-900/50 text-gray-100 rounded-xl border border-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all placeholder:text-gray-500"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute text-gray-400 left-3 top-3 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            className="w-full px-10 py-3 bg-gray-900/50 text-gray-100 rounded-xl border border-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all placeholder:text-gray-500"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <EyeOff
                                className="absolute text-gray-400 right-3 top-3 cursor-pointer hover:text-gray-300 transition-colors"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                className="absolute text-gray-400 right-3 top-3 cursor-pointer hover:text-gray-300 transition-colors"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>

                    <button
                        className={`w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all transform hover:scale-[1.02] ${
                            isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 transition-all"
                            >
                                Create Account
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;