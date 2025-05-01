import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';
import './Loginpage.css';

import Header from './Header.tsx';
import Footer from './Footer.tsx';

export default function Newuser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating new account:');
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        // Add registration logic here
    };

    return (
        <>
            <Header admin={false} />
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="card login-card">
                        <div className="card-header">
                            <h2>Create Account</h2>
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
                                        placeholder="Choose a username"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
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
                                        placeholder="Create a password"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="sign-in-btn">
                                        Create Account
                                    </button>
                                </div>
                                <div className="signup-link-container">
                                    <p>Already have an account? <Link to="/loginPage" className="signup-link">Sign In</Link></p>
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