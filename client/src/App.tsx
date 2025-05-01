import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Landing from './components/Landing.tsx';
import AdminHome from './components/AdminHome.tsx';
import Loginpage from './components/Loginpage.tsx';
import Attendance from './components/Attendance.tsx'
import Play from './components/Play.tsx';

function App() {
    return (
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Landing admin={true} />} />
            <Route path="/login" element={<Landing admin={true} />} />
            <Route path="/admin" element={<AdminHome admin={true} />} />
            <Route path="/attendance" element={<Attendance admin={true} />} />
            <Route path="/loginPage" element={<Loginpage />} />
            <Route path="/play" element={<Play admin={true} week={1} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      );
}

export default App;