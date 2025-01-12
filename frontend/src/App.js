import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Import Router components
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router> {/* Wrap everything in Router */}
            <div className="min-h-screen bg-gray-900 text-white">
                <Routes> {/* Define your routes here */}
                    <Route
                        path="/login"
                        element={<Login onLogin={() => setIsLoggedIn(true)} />}
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={isLoggedIn ? <MainPage /> : <Login onLogin={() => setIsLoggedIn(true)} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
