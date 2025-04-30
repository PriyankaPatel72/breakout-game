import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import '../App.css'
import logo from '../assets/adc.png'
import { JSX } from 'react/jsx-runtime';

function Header(props: JSX.IntrinsicAttributes & { admin: any; }) {
 
    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Home"/>
                </div>
                <div className="nav-buttons">
                    {props.admin ? (
                        <>
                            <Link to="/attendance" className="nav-link">Attendance</Link>
                            <Link to="/admin" className="nav-link">Admin</Link>
                            <Link to="/" className="nav-link">Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="nav-link">Login</Link>
                            <Link to="/" className="nav-link">Signup</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    )

}

export default Header