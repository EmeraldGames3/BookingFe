import React from 'react'
import './LoginSignUp.css'
import emailIcon from '../Assets/email.png'
import personIcon from '../Assets/person.png'
import passwordIcon from '../Assets/password.png'
import { useState } from 'react'
import WelcomeHeader from './WelcomePageHeader/WelcomeHeader'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import SubmitButton from './SubmitButton/SubmitButton'
import ToggleButton from './ToggleButton/ToggleButton'
import Input from './Input/Input'
import api from '../../Api/axios'
import ErrorPopup from '../ErrorPopup/ErrorPopup'

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
            <form className='inputs' onSubmit={handleSubmit}>
                <Input
                    type='text'
                    placeholder='UserName'
                    img={personIcon} 
                    onChange={handleUsernameChange}
                    value={username}
                />
                {action === 'Sign Up' && (
                    <Input
                        type='email'
                        placeholder='Email'
                        img={emailIcon} 
                        onChange={handleEmailChange}
                        value={email}
                    />
                )}
                <Input
                    type='password'
                    placeholder='********'
                    img={passwordIcon} 
                    onChange={handlePasswordChange}
                    value={password}
                />
                <SubmitButton action={action}/>
            </form>
            {action === 'Log In' && <ForgotPassword/>}
        </div>
        </>
    )
}