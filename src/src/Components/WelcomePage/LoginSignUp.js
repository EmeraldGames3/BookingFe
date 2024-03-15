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
import Input from './Input/Input'

export default function LoginSignUp() {
    const [action, setAction] = useState('Sign Up');

    return (
        <div className='container'>
            <div className='header-with-toggle'>
                <WelcomeHeader action={action}/>
                <ToggleButton action={action} setAction={setAction} />
            </div>
            <div className='inputs'>
                <Input type='text' placeholder='UserName' img={person}/>
                {action === 'Sign Up' && 
                <Input type='email' placeholder='Email' img={email}/>}
                <Input type='password' placeholder='********' img={password}/>
            </div>

            {action === 'Log In' && <ForgotPassword/>}

            <SubmitButton action={action}/>
        </div>
    )
}