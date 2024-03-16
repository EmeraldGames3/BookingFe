import React from 'react';
import './LogOutButton.css';
const LogoutButton = ({ onLogout }) => {
    return (
        <div className="logout-container">
            <button className="logout-button" onClick={onLogout}>
                Log Out
            </button>
        </div>
    );
};

export default LogoutButton;