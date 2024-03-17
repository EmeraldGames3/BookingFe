import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import LogoutButton from './LogOutButton/LogOutButton';
import { AuthContext } from '../../Context/AuthProvider'
import logo from '../Assets/mhp-logo.png';
import FooterComponent from './FooterComponent/FooterComponent';
import Map from './Map/Map';

const initialDesks = Array.from({ length: 139 }, (_, index) => ({
    id: `desk${index + 1}`,
    isFree: true,
    reservedFrom: null,
    reservedTo: null,
  }));
  
  const initialRooms = Array.from({ length: 6 }, (_, index) => ({
    id: `room${index + 1}`,
    isFree: true,
    reservedFrom: null,
    reservedTo: null,
  }));
  
  const DesksTable = ({ desks }) => (
    <div className="scrollable-table desks-table">
      {desks.map((desk) => (
        <div key={desk.id} className={`table-item ${desk.isFree ? 'free' : 'occupied'}`}>
          {desk.id} - {desk.isFree ? 'Free' : 'Occupied'}
        </div>
      ))}
    </div>
  );
  
  const RoomsTable = ({ rooms }) => (
    <div className="scrollable-table rooms-table">
      {rooms.map((room) => (
        <div key={room.id} className={`table-item ${room.isFree ? 'free' : 'occupied'}`}>
          {room.id} - {room.isFree ? 'Free' : 'Occupied'}
        </div>
      ))}
    </div>
  );

export default function MainPage() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isConferenceRoom, setIsConferenceRoom] = useState(false);
    // Use useState to keep track of the desks and rooms
    const [desks, setDesks] = useState(initialDesks);
    const [rooms, setRooms] = useState(initialRooms);

    // State hooks for input fields
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [numberInput, setNumberInput] = useState(0);

    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        if (!auth.isLoggedIn) {
            navigate('/');
        }

        // Set the current time as the default start time
        const now = new Date();
        const timeString = now.toISOString().substring(11, 16); // "HH:MM" format
        setStartTime(timeString);
    }, [auth, navigate]);

    const handleLogout = () => {
        console.log('Logging out');
        setAuth({ user: null, isLoggedIn: false });
        navigate('/');
    };

    if (!auth.isLoggedIn) {
        return null;
    }

    const handleReserve = (type, id) => {
        if (type === 'desk') {
          setDesks((prevDesks) =>
            prevDesks.map((desk) =>
              desk.id === id ? { ...desk, isFree: false, reservedFrom: startTime, reservedTo: endTime } : desk
            )
          );
        } else if (type === 'room') {
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room.id === id ? { ...room, isFree: false, reservedFrom: startTime, reservedTo: endTime } : room
            )
          );
        }
      };

    return (
        <div className="container_mainPage">
            <div className="logo-container">
                <a href='https://www.mhp.com/us/'>
                    <img src={logo} alt="Company Logo" className="logo-image"/>
                </a>
            </div>
            <LogoutButton onLogout={handleLogout} />
            <div className="floor-plan-container">
                <Map />
            </div>
            <div>
                <FooterComponent
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                numberInput={numberInput}
                setNumberInput={setNumberInput}
                isConferenceRoom={true}
                desks={desks} 
                rooms={rooms}
                onReserve={(type, id) => handleReserve(type, id)}
                />
                <div className="tables-container">
                    <RoomsTable rooms={rooms} />
                    <DesksTable desks={desks} />
                </div>
            </div>
        </div>
    );
}
