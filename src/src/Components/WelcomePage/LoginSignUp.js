import React from 'react'
import './LoginSignUp.css'
import { useState } from 'react'
import WelcomeHeader from './WelcomePageHeader/WelcomeHeader'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ToggleButton from './ToggleButton/ToggleButton'
import api from '../../Api/axios'
import ErrorPopup from '../ErrorPopup/ErrorPopup'
import WelcomeForm from './WelcomeForm/WelcomeForm'

export default function LoginSignUp() {
    // State hooks for input fields
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState('Sign Up');
    // State hooks for error handling
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Functions to handle input field changes
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowError(false);
        setErrorMessage('');

        if (action === 'Sign Up') {
            try {
                e.preventDefault();
                if (!email || !username || !password) {
                    console.error('All fields are required');
                    setErrorMessage('All fields are required');
                    setShowError(true);
                }

                const response = await api.post('/user/', { email, name: username, password });
                console.log(response.data);
                // Handle the successful sign up (e.g., navigate to the login page or dashboard)
            } catch (error) {
                console.error('Error in sign up:', error.response);
                const message = error.response && error.response.data && error.response.data.detail 
                                ? error.response.data.detail
                                : 'An unexpected error occurred.';
                setErrorMessage(message);
                setShowError(true);
            }
        }
        // You can handle the 'Log In' action in an else branch here or in a separate function
    };

    const closeErrorPopup = () => {
        setShowError(false);
        setErrorMessage('');
    };

    return (
        <>
        {showError && <ErrorPopup message={errorMessage} onClose={closeErrorPopup} />}
        <div className='container'>
            <div className='header-with-toggle'>
                <WelcomeHeader action={action}/>
                <ToggleButton action={action} setAction={setAction} />
            </div>
                <WelcomeForm
                    action={action}
                    username={username}
                    handleUsernameChange={handleUsernameChange}
                    email={email}
                    handleEmailChange={handleEmailChange}
                    password={password}
                    handlePasswordChange={handlePasswordChange}
                    handleSubmit={handleSubmit}
                />
            {action === 'Log In' && <ForgotPassword/>}
        </div>
        </>
    )
}