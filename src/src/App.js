import './App.css';
import LoginSignUp from './Components/WelcomePage/LoginSignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './Components/MainPage/MainPage';

function App() {
  return (
    <div> 
        <Router>
          <Routes>
            <Route path='/' element={<LoginSignUp />} />
            <Route path='/main' element={<MainPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
