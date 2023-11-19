import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUpPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add validation logic here
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        // Additional validation and submission logic...
        // On successful sign up, navigate to the sign-in page
        navigate('/signin');
    };

    // Navigate back to sign-in page
    const navigateToSignIn = () => {
        navigate('/signin');
    };

    return (
        <div id="signUpPage" className="page">
            <h2>Sign Up</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="form-container">
                <label htmlFor="username">Username*</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="password">Password*</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirmPassword">Confirm Password*</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type="submit">Sign Up</button>
                <button type="button" onClick={navigateToSignIn}>Already have an account? Sign In</button>
            </form>
        </div>
    );
}

export default SignUpPage;