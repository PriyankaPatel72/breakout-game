import React, { useState } from 'react';
// import './Loginpage.css';

export default function Loginpage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Please log in to your account</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="primary-button">Login</button>
                </form>
                <p className="login-footer">
                    Don't have an account? <a href="/signup" className="link">Sign up</a>
                </p>
            </div>
        </div>
    );
}