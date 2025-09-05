import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/login'
import AdminSignup from './pages/AdminSignup'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Agents from './pages/Agents'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/admin' element={<AdminSignup />} />
          <Route path='/view-agents' element={<Agents />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
