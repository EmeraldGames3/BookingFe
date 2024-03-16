import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ message, onClose }) => {
    return (
        <div className="error-popup">
            <div className="error-popup-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorPopup;
