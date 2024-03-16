import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import LogoutButton from './LogOutButton/LogOutButton';
import { AuthContext } from '../../Context/AuthProvider'
import logo from '../Assets/mhp-logo.png';
import FooterComponent from './FooterComponent/FooterComponent';
import Map from './Map/Map';

const getCurrentTimeForInput = () => {
    const now = new Date();
    return now.toISOString().substring(11, 16);
};

export default function MainPage() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const {isConferenceRoom} = useState(false);

    // State hooks for input fields
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [numberInput, setNumberInput] = useState(0);

    useEffect(() => {
        if (!auth.isLoggedIn) {
            navigate('/');
        }

        // Set the current time as the default start time
        const now = new Date();
        const timeString = now.toISOString().substring(11, 16); // "HH:MM" format
        setStartTime(timeString);
    }, [auth, navigate]);

    const handleLogout = () => {
        console.log('Logging out');
        setAuth({ user: null, isLoggedIn: false });
        navigate('/');
    };

    if (!auth.isLoggedIn) {
        return null;
    }

    const handleStartTime = () => {
        // Logic to handle start time
        const now = new Date();
        setStartTime(now.toLocaleTimeString());
    };

    const handleEndTime = () => {
        // Logic to handle end time
        const now = new Date();
        setEndTime(now.toLocaleTimeString());
    };

    return (
        <div className="container_mainPage">
            <div className="logo-container">
                <a href='https://www.mhp.com/us/'>
                    <img src={logo} alt="Company Logo" className="logo-image"/>
                </a>
            </div>
            <LogoutButton onLogout={handleLogout} />
            <div className="floor-plan-container">
                <Map />
            </div>
            <FooterComponent
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                numberInput={numberInput}
                setNumberInput={setNumberInput}
                isConferenceRoom={true}
            />
        </div>
    );
}
