import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import logo from '../assets/adc.png'
import { JSX } from 'react/jsx-runtime';

function Header(props: JSX.IntrinsicAttributes & { admin: any; }) {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Home"/>
                </div>
                <div className="nav-links">
                    {props.admin ? (
                        <>
                            <Link to="/attendance"></Link>
                        </>
                    ) : (
                        <>
                        
                        </>
                    )}
                </div>
            </nav>
        </>
    )

}

export default Header