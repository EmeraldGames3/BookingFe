import React, { useState } from 'react';
import { ReactComponent as FloorMap } from '../../../Components/Assets/Floor_5_Map.svg';
import './Map.css';

export default function Map() {
    // // Use useState to keep track of the desks and rooms
    // const [desks, setDesks] = useState(initialDesks);
    // const [rooms, setRooms] = useState(i);

    // const handleReserveItem = (itemId) => {
    //     setReservedItems((prevReservedItems) => {
    //         const newReservedItems = new Set(prevReservedItems);
    //         if (newReservedItems.has(itemId)) {
    //             newReservedItems.delete(itemId);
    //         } else {
    //             newReservedItems.add(itemId);
    //         }
    //         return newReservedItems;
    //     });
    // };

    return (
        <div className='mapClass'>
            <FloorMap className='mapImage' 
                //onClick={(e) => {
                //const itemId = e.target.id; 
                //handleReserveItem(itemId);
            //}}
            />
        </div>
    );
}
