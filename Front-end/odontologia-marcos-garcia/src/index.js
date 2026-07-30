import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';

import Navbar from "./componentes/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from "./componentes/LandingPage";
import SignUp from "./componentes/SignUp";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/sign-up" element={
                    <SignUp
                        isAuthenticated={isAuthenticated}
                        user={user}
                        onLogin={handleLogin}
                        onLogout={handleLogout}
                    />
                } />
            </Routes>
        </Router>
    );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
