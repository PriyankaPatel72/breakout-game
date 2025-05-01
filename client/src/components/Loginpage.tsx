    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';

    import '../App.css';
    import './Loginpage.css';

    import Header from './Header.tsx';
    import Footer from './Footer.tsx';

    const API_URL = "http://0.0.0.0:8000"

    export default function Loginpage() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            
            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                })
                const data = await response.json();
                const {user, isAdmin, displayName} = data;
                localStorage.setItem("user", JSON.stringify({user, isAdmin, displayName}))

                window.location.href = "/"

            } catch (error: any) {
                alert(`Login failed: ${error.message}`);
            }
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
                                    <div className="signup-link-container">
                                        <p>Don't have an account? <Link to="/newUser" className="signup-link">Sign Up</Link></p>
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