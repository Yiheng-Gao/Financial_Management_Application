import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUpPage() {

  const navigate = useNavigate();
  // Add a new state for the company name
  const [companyName, setCompanyName] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    console.log("Sending sign-up data:", { username, password, email });
    fetch("http://localhost:8081/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email, companyName}),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/signin");
        } else {
          response.json().then((data) => {
            setErrorMessage(data.message);
          });
        }
      })
      .catch((error) => {
        setErrorMessage("Failed to sign up.");
      });
  };


  const navigateToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div id="signUpPage" className="page">
      <h2>Sign Up</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="username">Username*</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirmPassword">Confirm Password*</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="companyName">Company Name*</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
        <button type="button" onClick={navigateToSignIn}>
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
