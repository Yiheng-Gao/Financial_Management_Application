// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate  } from 'react-router-dom';
import SignInPage from './SignIn'; // Ensure this is the correct pathwrwrw
import MainPage from './MainPage'; // Ensure this is the correct path
import SignUpPage from './Signup';// Sign up Router
import LandingPage from './LandingPage';


function App() {
    const [userId, setUserId] = useState(null); // State to hold the user ID
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* Pass setUserId to SignInPage so it can update the userId state */}
                <Route path="/signin" element={<SignInPage setUserId={setUserId} />} />
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