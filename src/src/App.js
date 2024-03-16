import { useEffect } from 'react';
import './App.css';
import LoginSignUp from './Components/WelcomePage/LoginSignUp';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

function App() {
  let error = null;
  let response = null;
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}`).then(response => {
      console.log(response.data);
    }).catch(error => { console.log(error) });
  }, []);
  
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
        <div>{response}</div>
        <LoginSignUp />
    </div>
  );
}

export default App;
