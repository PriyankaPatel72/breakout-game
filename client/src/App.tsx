import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Landing from "./components/Landing.tsx"

function App() {

    return (
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Landing admin={true} />} />
          </Routes>
        </Router>
      );

}

export default App;