import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import logo from './logo.png';

function SignInPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === "username") {
            setUsername(value);
        } else if (id === "password") {
            setPassword(value);
        }
        setErrorMessage(''); // Clear error message upon any input change
    }

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword => !showPassword);
    };

    const navigateToSignUp = () => {
        navigate('/signup'); // This route should be set up in your React Routerr
    }

    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submit action
      // Send the `username` and `password` to your backend for authentication
      fetch("http://localhost:8081/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "Sign-in successful") {
            setUserId(data.userId); // Save the userId from the sign-in response
            localStorage.setItem("username", data.username); // Save the username
            localStorage.setItem("userId", data.userId); // Store userId
            localStorage.setItem("companyId", data.companyId); // Store companyId
            localStorage.setItem("userType", data.userType); // Store userType
            localStorage.setItem("companyName", data.companyName);
            // ... navigate to the main page
            navigate('/main', { state: { username: data.username, userType: data.userType } });
          } else {
            // Handle sign-in failure
            setErrorMessage(data.message || "Failed to sign in.");
          }
        })
        .catch((error) => {
          setErrorMessage("Failed to sign in.");
        });
    };

    const navigateToMainPage = () => {
      if (!username) {
        setErrorMessage("Please enter your username.");
      } else if (!password) {
        setErrorMessage("Please enter your password.");
      } else {
        console.log("Data to be sent:", { username, password });
        // Assuming username and password validation is successful
        localStorage.setItem("username", username); // Store the username
        window.location.reload();
        navigate("/main"); // Navigate to the main page
      }
    };

    const closePage = () => {
        window.close();
    }

    return (
        <div id="signInPage" className="page">
            <div className="header">
                <img src={logo} alt="Logo" className="logo" style={{ width: '80px', height: '80px' }}/>

                <span>Financial Management</span>
            </div>

            <div className="welcome-text">
                Welcome,
                <p>Please sign in to your account</p>
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

                <button onClick={handleSubmit}>Sign In</button>
                <button onClick={navigateToSignUp} className="signup-button">Sign Up</button> {/* New Sign Up button */}
                <button onClick={closePage}>Cancel</button>
            </div>
        </div>
    );
}

export default SignInPage;