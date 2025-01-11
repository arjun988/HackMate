import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", { username, password });
            alert(response.data.message);
            if (response.status === 200) {
                onLogin();
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
