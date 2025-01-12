import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // Initialize navigation

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/signup", { username, password });
            alert(response.data.message);
            if (response.status === 201) {
                // Redirect to login after successful signup
                navigate("/login");
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-sm bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Signup</h2>
                <div className="space-y-4">
                    {/* Username Input */}
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

                    {/* Password Input */}
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

                    {/* Signup Button */}
                    <button
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onClick={handleSignup}
                    >
                        Signup
                    </button>
                </div>

                {/* Navigate to Login */}
                <p className="text-gray-400 text-center mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-purple-500 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
