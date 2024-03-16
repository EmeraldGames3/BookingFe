import React from 'react'
import './LoginSignUp.css'
import { useState, useContext } from 'react'
import WelcomeHeader from './WelcomePageHeader/WelcomeHeader'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import ToggleButton from './ToggleButton/ToggleButton'
import api from '../../Api/axios'
import ErrorPopup from '../ErrorPopup/ErrorPopup'
import WelcomeForm from './WelcomeForm/WelcomeForm'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../Firebase/FirebaseConfig'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider'

export default function LoginSignUp() {
    const { setAuth } = useContext(AuthContext);
    const auth = getAuth(app);
    const navigate = useNavigate();

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
                //console.log(response.data);

                // Obtain the token
                const token = await userCredential.user.getIdToken(); // This gets the Firebase Auth ID token

                // Log in the user data in the AuthContext
                setAuth({
                    token: token, // 'token' contains the Firebase Auth ID token
                    user: response.data,
                    isLoggedIn: true,
                  });

                //Redirect to main page after successful sign up
                navigate('/main');
            } catch (error) {
                console.error('Error in sign up:', error.response);
                const message = error.response && error.response.data && error.response.data.detail 
                                ? error.response.data.detail
                                : 'An unexpected error occurred.';
                setErrorMessage(message);
                setShowError(true);
            }
        }
        else {
            // Log In logic
            try {
                if (!email || !password) {
                    console.error('Email and password are required');
                    setErrorMessage('Email and password are required');
                    setShowError(true);
                }

                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                // Obtain the token
                const token = await userCredential.user.getIdToken(); // This gets the Firebase Auth ID token

                // Log in the user data in the AuthContext
                setAuth({
                    token: token, // 'token' contains the Firebase Auth ID token
                    user: userCredential.user, // 'userCredential.user' contains the user information
                    isLoggedIn: true,
                });
                    
                //Redirect to main page after successful log in
                navigate('/main');
            } catch (error) {
                console.error('Error in log in:', error);
                const message = error.code && error.message ? error.message : 'An unexpected error occurred.';
                setErrorMessage(message);
                setShowError(true);
            }
        }
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