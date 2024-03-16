import React from 'react';
import Input from './Input/Input';
import SubmitButton from './SubmitButton/SubmitButton';
import emailIcon from '../../Assets/email.png';
import personIcon from '../../Assets/person.png';
import passwordIcon from '../../Assets/password.png';
import './WelcomeForm.css';

const WelcomeForm = ({ action, username, handleUsernameChange, email, handleEmailChange, password, handlePasswordChange, handleSubmit }) => {
  return (
    <form className='inputs' onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder='Username'
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
  );
};

export default WelcomeForm;
