import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignInPage() {
    const navigate = useNavigate();
    const [orgName, setOrgName] = useState('');
    const [orgLocation, setOrgLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === "username") {
            setUsername(value);
        } else if (id === "password") {
            setPassword(value);
        } else if (id === "orgName") {
            setOrgName(value);
        } else if (id === "orgLocation") {
            setOrgLocation(value);
        }
        setErrorMessage(''); // Clear error message upon any input change
    }

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword => !showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submit action
        // Here you would typically send the `username` and `password` to your backend for authentication
        console.log('Submitting', { username, password });
        // Implement your logic to handle the authentication response
    };

    const navigateToMainPage = () => {
        // Start with checking the new fields first
        if (!username) {
            setErrorMessage('Please enter your username.');
        } else if (!password) {
            setErrorMessage('Please enter your password.');
        } else if (!orgName) {
            setErrorMessage('Please fill in the organization name.');
        } else if (!orgLocation) {
            setErrorMessage('Please choose a location.');
        } else {
            // If everything is filled out, proceed with sending data to the DB and navigating
            console.log('Data to be sent to DB:', { username, password, orgName, orgLocation });
            navigate('/main'); // Navigate to the main page
        }
    }

    const closePage = () => {
        window.close();
    }

    return (
        <div id="signInPage" className="page">
            <div className="header">
                <img src="logo.png" alt="Logo" className="logo" />
                <span>Financial Management</span>
            </div>

            <div className="welcome-text">
                Welcome,
                <p>Let us know what is your organization's name &amp; where your business is</p>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="form-container">

                <label htmlFor="username">Username*</label>
                <input type="text" id="username" onChange={handleInputChange} />

                <label htmlFor="password">Password*</label>
                <div className="password-container">
                    <input type={showPassword ? "text" : "password"} id="password" onChange={handleInputChange} />
                    <button type="button" onClick={togglePasswordVisibility} className="show-password-button">
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <label htmlFor="orgName">Organization Name*</label>
                <input type="text" id="orgName" onChange={handleInputChange} />

                <label htmlFor="orgLocation">Organization Location*</label>
                <select id="orgLocation" onChange={handleInputChange}>
                    <option value="">Select a location</option>
                    <option value="Location 1">Canada</option>
                    <option value="Location 2">China</option>
                    <option value="Location 3">USA</option>
                    <option value="Location 4">Europe</option>
                </select>

                <button onClick={navigateToMainPage}>Sign in</button>
                <button onClick={closePage}>Cancel</button>
            </div>
        </div>
    );
}

export default SignInPage;
