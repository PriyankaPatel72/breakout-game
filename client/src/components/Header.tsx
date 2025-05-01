import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../App.css'
import logo from '../assets/adc.png'
import { JSX } from 'react/jsx-runtime';

function Header(props: JSX.IntrinsicAttributes & { admin: any; }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if current path is the login page
    const isLoginPage = location.pathname === '/loginPage';
    // Also check if current path is the newUser page
    const isNewUserPage = location.pathname === '/newUser';
    
    // Don't show navigation buttons on login or signup pages
    const hideNavButtons = isLoginPage || isNewUserPage;
 
    return (
        <>
            <nav className="navbar">
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="Home"/>
                </div>
                {!hideNavButtons && ( // Only show navigation buttons if not on login or newUser page
                    <div className="nav-buttons">
                        <Link to="/" className="nav-link">Home</Link>
                        {props.admin ? (
                            <>
                                <Link to="/attendance" className="nav-link">Attendance</Link>
                                <Link to="/admin" className="nav-link">Admin</Link>
                                <Link to="/loginPage" className="nav-link">Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/loginPage" className="nav-link">Login</Link>
                                {/* Removed the Signup link from the navbar */}
                            </>
                        )}
                    </div>
                )}
            </nav>
        </>
    )
}

export default Header