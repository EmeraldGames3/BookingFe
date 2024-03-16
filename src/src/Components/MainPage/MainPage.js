import React from 'react';
import './MainPage.css';
import LogoutButton from './LogOutButton/LogOutButton';

export default function MainPage() {
    const handleLogout = () => {
        console.log('Logging out');
    };

    return (
        <div className="container">
            <LogoutButton onLogout={handleLogout} />
            <div className="floor-plan-container">
                {/* Desk components will go here */}
            </div>
        </div>
    );
}