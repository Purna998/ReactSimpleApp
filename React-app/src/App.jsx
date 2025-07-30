import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Why from './pages/Why'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Header from './components/Header'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        
        
        {/* Define routes for the application */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/why" element={<Why />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </Router>
      
    </div>
  )
}

export default App