import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/adc.png';
import '../App.css';

interface HeaderProps { admin: boolean; }

export default function Header({ admin }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = ['/loginPage', '/newUser'].includes(location.pathname);
  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" />
      </div>
      {!isAuthPage && (
        <div className="nav-buttons">
          {isHomePage ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/attendance" className="nav-link">Attendance</Link>
              <Link to="/admin" className="nav-link">Admin</Link>
              <Link to="/logout" className="nav-link">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              {admin && <Link to="/attendance" className="nav-link">Attendance</Link>}
              {admin && <Link to="/admin" className="nav-link">Admin</Link>}
              {!admin && <Link to="/loginPage" className="nav-link">Login</Link>}
              {!admin && <Link to="/newUser" className="nav-link">Sign Up</Link>}
              <Link to="/logout" className="nav-link">Logout</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}