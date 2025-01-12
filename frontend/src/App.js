import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import LearnJavaScript from "./components/LearnJavascript"; // Import Learn page

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        if (storedLoginStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    // Function to handle login
    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    // Function to handle logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-900 text-white">
                <Routes>
                    <Route
                        path="/login"
                        element={<Login onLogin={handleLogin} />}
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={isLoggedIn ? <MainPage onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
                    />
                    {/* Add route for Learn page */}
                    <Route path="/learn" element={<LearnJavaScript />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
