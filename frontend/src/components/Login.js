import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom"; // For navigation

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // Initialize navigation

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", { username, password });
            alert(response.data.message);
            if (response.status === 200) {
                // Store token in localStorage
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('isLoggedIn', true);
                onLogin();
                // Navigate to the main page upon successful login
                navigate("/");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            alert(errorMessage);

            // Check if the error indicates the account doesn't exist
            if (error.response?.status === 404 || errorMessage.toLowerCase().includes("account does not exist")) {
                // Redirect to signup page
                navigate("/signup");
            }
        }
    };

    const handleSignupRedirect = () => {
        // Redirect to the signup page
        navigate("/signup");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-sm bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
                <div className="space-y-4">
                    <div className="relative">
                        <User className="absolute text-gray-400 left-3 top-3" />
                        <input
                            className="w-full px-10 py-3 text-sm bg-gray-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute text-gray-400 left-3 top-3" />
                        <input
                            className="w-full px-10 py-3 text-sm bg-gray-800 text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <EyeOff
                                className="absolute text-gray-400 right-3 top-3 cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                className="absolute text-gray-400 right-3 top-3 cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <button
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{" "}
                            <button
                                onClick={handleSignupRedirect}
                                className="text-purple-500 hover:text-purple-700"
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
