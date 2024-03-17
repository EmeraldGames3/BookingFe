import React from 'react';
import './FooterComponent.css';

const FooterComponent = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedItem,
  setSelectedItem,
  desks,
  rooms,
  isConferenceRoom,
  onReserve
}) => {

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

      <div className="selection-dropdown-container">
        <label>
          {isConferenceRoom ? 'Room:' : 'Desk:'}
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">Select an option</option>
            {(isConferenceRoom ? rooms : desks).map((item) => (
              <option key={item.id} value={item.id} disabled={!item.isFree}>
                {item.id} - {item.isFree ? 'Free' : `Occupied until ${item.reservedTo}`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        className="reserve-button"
        onClick={() => onReserve(isConferenceRoom ? 'room' : 'desk', selectedItem)}
      >
        Reserve
      </button>
    </div>
  );
};

export default FooterComponent;
