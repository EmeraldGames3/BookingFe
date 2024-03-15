import React from 'react'
import './LoginSignUp.css'
import email from '../Assets/email.png'
import person from '../Assets/person.png'
import password from '../Assets/password.png'
import { useState } from 'react'
import WelcomeHeader from './WelcomePageHeader/WelcomeHeader'

export default function LoginSignUp() {
    const [action, setAction] = useState('Sign Up');

    return (
        <div className='container'>
            <WelcomeHeader action={action}/>
            <div className='inputs'>
                <div className='input'>
                    <img src={person} alt=''/>
                    <input type='text'/>
                </div>
                <div className='input'>
                    <img src={email} alt=''/>
                    <input type='email'/>
                </div>
                <div className='input'>
                    <img src={password} alt=''/>
                    <input type='password'/>
                </div>
            </div>
        
            <div className='forgot-password'>
                <text>Lost your password? </text> 
                <span>Click here</span>    
            </div>

            <div className='submit-container'>
                <div className='submit'>Sign Up</div>
                <div className='submit'>Log In</div>
            </div>
        </div>
    )
}