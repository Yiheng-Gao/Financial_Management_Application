import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/src/logo.png'; 
import './style.css'; 


function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Financial Management</h1>
            <p>Welcome to our financial management system</p>
            <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
    );
}

export default LandingPage;