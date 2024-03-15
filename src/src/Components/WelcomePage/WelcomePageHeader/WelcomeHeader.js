import React from 'react';
import './WelcomeHeader.css'

export default function WelcomeHeader(action) {
    return (
        <div className='header'>
                <div className='text'>
                    {action.action}
                    <div className='underline'>
                    </div>
                </div>
        </div>
    )
}