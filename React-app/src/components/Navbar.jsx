import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            {/* navbar logo */}
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            
            {/* navbar navigation links */}
            <ul className="navbar-menu-left">
                <Link to="/why">Why Us?</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </ul>

            {/* navbar auth links */}
            <ul className="navbar-menu-right">
                <Link to="/logout" className="button-link">Logout</Link>
                <Link to="/login" className="button-link">Login</Link>
                <Link to="/register" className="button-link">Register</Link>
            </ul>
        </div>
    );
}

export default Navbar;