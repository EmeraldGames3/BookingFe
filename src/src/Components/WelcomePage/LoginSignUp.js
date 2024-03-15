import React from 'react'
import './LoginSignUp.css'
import email from '../Assets/email.png'
import person from '../Assets/person.png'
import password from '../Assets/password.png'
import { useState } from 'react'
import WelcomeHeader from './WelcomePageHeader/WelcomeHeader'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import SubmitButton from './SubmitButton/SubmitButton'
import ToggleButton from './ToggleButton/ToggleButton'

export default function LoginSignUp() {
    const [action, setAction] = useState('Sign Up');

    return (
        <div className='container'>
            <div className='header-with-toggle'>
                <WelcomeHeader action={action}/>
                <ToggleButton action={action} setAction={setAction} />
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={person} alt=''/>
                    <input type='text'/>
                </div>
                {action === 'Sign Up' && 
                <div className='input'>
                    <img src={email} alt=''/>
                    <input type='email'/>
                </div>}
                <div className='input'>
                    <img src={password} alt=''/>
                    <input type='password'/>
                </div>
            </div>

            {action === 'Log In' && <ForgotPassword/>}

            <SubmitButton action={action}/>
        </div>
    )
}