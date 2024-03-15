import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ action, setAction }) => {
    const toggleAction = () => {
        const newAction = action === 'Sign Up' ? 'Log In' : 'Sign Up';
        setAction(newAction);
    };

    return (
        <button className="toggle-btn" onClick={toggleAction}>
            {action === 'Sign Up' ? 'Log In' : 'Sign Up'}
        </button>
    );
};

export default ToggleButton;
