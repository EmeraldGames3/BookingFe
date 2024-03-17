import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import LogoutButton from './LogOutButton/LogOutButton';
import { AuthContext } from '../../Context/AuthProvider'
import logo from '../Assets/mhp-logo.png';
import FooterComponent from './FooterComponent/FooterComponent';
import Map from './Map/Map';
import api from '../../Api/axios';

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

    const [selectedType, setSelectedType] = useState('desk'); // Add state for tracking type

    // Add a function to handle type change
    const handleTypeChange = (e) => {
      setSelectedType(e.target.value);
      setSelectedItem(''); // Clear selected item when changing types
    };

    useEffect(() => {
        if (!auth.isLoggedIn) {
            navigate('/');
        }

        // Set the current time as the default start time
        let now = new Date();
        now.setHours(now.getHours() + 2); // Adjust for timezone
        const timeString = now.toISOString().substring(11, 16); // "HH:MM" format
        setStartTime(timeString);

        const fetchInitialData = async () => {
            try {
                const desksResponse = await api.get('/bookings/desks');
                setDesks(desksResponse.data);
                
                const roomsResponse = await api.get('/bookings/rooms');
                setRooms(roomsResponse.data);
            } catch (error) {
                console.error('Failed to fetch desks and rooms:', error);
            }
        };

        //fetchInitialData();
    }, [auth, navigate]);

    const handleLogout = () => {
        console.log('Logging out');
        setAuth({ user: null, isLoggedIn: false });
        navigate('/');
    };

    if (!auth.isLoggedIn) {
        return null;
    }

    const handleReserve = async (type, id) => {
        if (type === 'desk') {
            const updatedDesks = desks.map((desk) => (desk.id === id ? updateItem(desk) : desk));
            setDesks(updatedDesks);
    
            // Notify back-end about the desk reservation
            try {
                await api.post('/api/reserve/desk', {
                    id: id,
                    reservedFrom: startTime,
                    reservedTo: endTime,
                });
                console.log('Desk reservation updated in back-end.');
            } catch (error) {
                console.error('Error updating desk reservation:', error);
            }
        } else if (type === 'room') {
            const updatedRooms = rooms.map((room) => (room.id === id ? updateItem(room) : room));
            setRooms(updatedRooms);
    
            // Notify back-end about the room reservation
            try {
                await api.post('/api/reserve/room', {
                    id: id,
                    reservedFrom: startTime,
                    reservedTo: endTime,
                });
                console.log('Room reservation updated in back-end.');
            } catch (error) {
                console.error('Error updating room reservation:', error);
            }
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
                onTypeChange={handleTypeChange}
                selectedType={selectedType}
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
