import React, { useState } from "react";
import axios from "axios";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/signup", { username, password });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default Signup;
