import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainPage from "./components/MainPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {!isLoggedIn ? (
                <>
                    <Login onLogin={() => setIsLoggedIn(true)} />
                    <Signup />
                </>
            ) : (
                <MainPage />
            )}
        </div>
    );
}

export default App;
