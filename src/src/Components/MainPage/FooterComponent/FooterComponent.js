import React from 'react';
import './FooterComponent.css';

const FooterComponent = ({ startTime, setStartTime, endTime, setEndTime, numberInput, setNumberInput, isConferenceRoom }) => {
  return (
    <div className="footer-container">
      <div className="time-selection-container">
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
      </div>
      <div className="time-selection-container">
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
      </div>
       {isConferenceRoom && (
        <div className="number-input-container">
          <label>
            Number:
            <input
              type="number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              placeholder="Enter number"
            />
          </label>
        </div>
       )}
       <button className="reserve-button" onClick=''>
            Reserve
        </button>
    </div>
  );
};

export default FooterComponent;
