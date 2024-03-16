import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import LogoutButton from './LogOutButton/LogOutButton';
import { AuthContext } from '../../Context/AuthProvider'

export default function MainPage() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        if (!auth.isLoggedIn) {
            navigate('/');
        }
    }, [auth, navigate]);

    const handleLogout = () => {
        console.log('Logging out');
        setAuth({ user: null, isLoggedIn: false });
        navigate('/');
    };

    if (!auth.isLoggedIn) {
        return null;
    }

    return (
        <div className="container">
            <LogoutButton onLogout={handleLogout} />
            <div className="floor-plan-container">
                {/* Desk components will go here */}
            </div>
        </div>
    );
}
