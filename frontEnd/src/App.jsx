// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate  } from 'react-router-dom';
import SignInPage from './SignIn'; 
import MainPage from './MainPage'; 
import SignUpPage from './Signup';
import LandingPage from './LandingPage';


function App() {
    const [userId, setUserId] = useState(null); 
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
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