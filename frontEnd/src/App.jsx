// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate  } from 'react-router-dom';
import SignInPage from './SignIn'; // Ensure this is the correct pathwrwrw
import MainPage from './MainPage'; // Ensure this is the correct path
import SignUpPage from './Signup';// Sign up Router
import LandingPage from './LandingPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/main" element={<MainPageWithNavigate  />} />
                <Route path="/signup" element={<SignUpPage />} />
               
            </Routes>
        </Router>
    );
}

function MainPageWithNavigate() {
    const navigate = useNavigate();
    return <MainPage navigate={navigate} />;
}

export default App;