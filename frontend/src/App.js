import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";
import LearnJavaScript from "./components/LearnJavascript"; // Import Learn page
import JavaScriptProblemSet from "./components/JavascriptProblemSet";
import DSAPage from "./components/DSAPage";
import Code from "./components/Code";
import LearnSQL from "./components/LearnSQL";
import ProfilePage from "./components/ProfilePage";
import SplashScreen from "./components/SplashScreen"; // Import Splash Screen component
import ContactPage from "./components/ContactPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSplashVisible, setSplashVisible] = useState(true); // State to control splash screen visibility

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        if (storedLoginStatus === "true") {
            setIsLoggedIn(true);
        }
        
        // Hide splash screen after 3 seconds and show the login screen
        setTimeout(() => {
            setSplashVisible(false);
        }, 4500);
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
                {isSplashVisible ? (
                    <SplashScreen /> // Show splash screen while it's visible
                ) : (
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
                        <Route path="/javascriptProblems" element={<JavaScriptProblemSet />} />
                        <Route path="/DSA" element={<DSAPage />} />
                        <Route path="/code" element={<Code />} />
                        <Route path="/LearnSQL" element={<LearnSQL />} />
                        <Route path="/Profile" element={<ProfilePage />} />
                        <Route path="/Contact" element={<ContactPage/>} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
