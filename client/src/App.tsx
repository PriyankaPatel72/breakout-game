import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Landing from './components/Landing.tsx';
import AdminHome from './components/AdminHome.tsx';
import Loginpage from './components/Loginpage.tsx';

function App() {
    return (
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Landing admin={true} />} />
            <Route path="/login" element={<Landing admin={true} />} />
            <Route path="/admin" element={<AdminHome admin={true} />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/loginPage" element={<Loginpage />} />
          </Routes>
        </Router>
      );
}

export default App;