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
        setErrorMessage(''); 
    }

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword => !showPassword);
    };

    const navigateToSignUp = () => {
        navigate('/signup'); 
    }

    const handleSubmit = async (event) => {
      event.preventDefault(); 
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
            setUserId(data.userId); 
            localStorage.setItem("username", data.username); 
            localStorage.setItem("userId", data.userId); 
            localStorage.setItem("companyId", data.companyId); 
            localStorage.setItem("userType", data.userType); 
            localStorage.setItem("companyName", data.companyName);
            navigate('/main', { state: { username: data.username, userType: data.userType } });
          } else {

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

        localStorage.setItem("username", username); 
        window.location.reload();
        navigate("/main"); 
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