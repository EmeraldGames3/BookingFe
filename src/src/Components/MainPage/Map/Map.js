import React from 'react';
import map from '../../../Components/Assets/Floor_5_Map.svg';
import './Map.css';

export default function Map() {
    return (
        <div className='mapClass'>
            <img src={map} alt='Map' className='mapImage'/>
        </div>
    );
}
