import React, { useState } from 'react';

import '../App.css';
import './Loginpage.css'; // Make sure to create this file

import Header from './Header.tsx';
import Footer from './Footer.tsx';
export default function Loginpage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        // Add authentication logic here
    };

    return (
        <>
            <Header admin={false} />
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="card login-card">
                        <div className="card-header">
                            <h2>Sign In</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="sign-in-btn">
                                        Sign In
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}