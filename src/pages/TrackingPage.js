import React, { useState, useEffect } from 'react';
import '../styles/TrackingPage.css';
import { generateGoogleMapsLink } from '../utils/ShareUtils';

const TrackingPage = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAchieved, setIsAchieved] = useState({
    pickUp: false,
    depart: false,
    border: false,
    pass: false,
    arrive: false,
    vietnam: false,
  });
  const [timestamps, setTimestamps] = useState({
    pickUp: null,
    depart: null,
    border: null,
    pass: null,
    arrive: null,
    vietnam: null,
  });
  const [locationLink, setLocationLink] = useState("https://www.example.com/default");
  const [isLocationPopupVisible, setIsLocationPopupVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (locationLink !== "https://www.example.com/default") {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch('/api/update-location', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ latitude, longitude }),
            });
          },
          (error) => {
            console.error('Error accessing geolocation: ' + error.message);
          },
          { timeout: 120000 }
        );
      }, 600000); // 10 minutes in milliseconds
    }

    return () => clearInterval(interval);
  }, [locationLink]);

  const handleButtonClick = (step) => {
    setSelectedButton(step);
    setIsPopupVisible(true);
  };

  const handleSave = () => {
    const currentTime = new Date().toISOString().slice(0, 16).replace('T', ' ');
    setIsAchieved((prev) => ({ ...prev, [selectedButton]: true }));
    setTimestamps((prev) => ({ ...prev, [selectedButton]: currentTime }));
    setIsPopupVisible(false);
  };

  const handleCancel = () => {
    if (isAchieved[selectedButton]) {
      setIsAchieved((prev) => ({ ...prev, [selectedButton]: false }));
      setTimestamps((prev) => ({ ...prev, [selectedButton]: null }));
    }
    setIsPopupVisible(false);
  };

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const link = generateGoogleMapsLink(latitude, longitude);
          setLocationLink(link);
          setIsLocationPopupVisible(false);

          // Set GPS sharing to expire in 12 hours
          setTimeout(() => {
            alert('GPS sharing has expired.');
            setLocationLink('https://www.example.com/default');
          }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds
        },
        (error) => {
          alert('Error accessing geolocation: ' + error.message);
          setIsLocationPopupVisible(false);
        },
        { timeout: 120000 } // 2 minutes
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsLocationPopupVisible(false);
    }
  };

  return (
    <div className="tracking-page">
      <div className="tracking-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>
      <div className="tracking-section address-section">
        <p>PICK UP ADDRESS: 123 main street</p>
        <p>DROP ADDRESS: 456 drop street</p>
        <p>EST. PICK UP TIME: 2024-07-06 15:00</p>
        <p>Weight: 6,500 kg</p>
        <p>PRICE: 2,000 USD</p>
        <p>PIC PHONE: 1234566789</p>
      </div>
      <div className="tracking-section location-link-section">
        <div className="location-link-input">
          <input type="text" value={locationLink} readOnly />
          <button onClick={() => navigator.clipboard.writeText(locationLink)}>COPY</button>
        </div>
        <div className="location-link-buttons">
          <button className="share-button" onClick={() => setIsLocationPopupVisible(true)}>Share</button>
          <button className="unshare-button">Unshare</button>
        </div>
      </div>
      <div className="tracking-section order-section">
        <p>ORDER: asd123456</p>
        <p>Status: Processing</p>
      </div>
      <div className="tracking-section timeline-section">
        <p>
          Arrive factory to pick up
          <span
            className={`circle ${isAchieved.pickUp ? 'achieved' : ''}`}
            onClick={() => handleButtonClick('pickUp')}
          >
            {isAchieved.pickUp && <i className="fas fa-check"></i>}
          </span>
        </p>
        {timestamps.pickUp && <p className="timestamp">- {timestamps.pickUp}</p>}
        <p>
          Pick up
          <span
            className={`circle ${isAchieved.depart ? 'achieved' : ''} ${!isAchieved.pickUp ? 'disabled' : ''}`}
            onClick={() => isAchieved.pickUp && handleButtonClick('depart')}
          >
            {isAchieved.depart && <i className="fas fa-check"></i>}
          </span>
        </p>
        {timestamps.depart && <p className="timestamp">- {timestamps.depart}</p>}
        <p>
          Depart from factory
          <span
            className={`circle ${isAchieved.border ? 'achieved' : ''} ${!isAchieved.depart ? 'disabled' : ''}`}
            onClick={() => isAchieved.depart && handleButtonClick('border')}
          >
            {isAchieved.border && <i className="fas fa-check"></i>}
          </span>
        </p>
        {timestamps.border && <p className="timestamp">- {timestamps.border}</p>}
        <p>
          Arrive at border parking area
          <span
            className={`circle ${isAchieved.pass ? 'achieved' : ''} ${!isAchieved.border ? 'disabled' : ''}`}
            onClick={() => isAchieved.border && handleButtonClick('pass')}
          >
            {isAchieved.pass && <i className="fas fa-check"></i>}
          </span>
        </p>
        {timestamps.pass && <p className="timestamp">- {timestamps.pass}</p>}
        <p>
          Pass border
          <span
            className={`circle ${isAchieved.arrive ? 'achieved' : ''} ${!isAchieved.pass ? 'disabled' : ''}`}
            onClick={() => isAchieved.pass && handleButtonClick('arrive')}
          >
            {isAchieved.arrive && <i className="fas fa-check"></i>}
          </span>
        </p>
        {timestamps.arrive && <p className="timestamp">- {timestamps.arrive}</p>}
        <p>
          Arrive at Vietnam Yard
          <span
            className={`circle ${isAchieved.vietnam ? 'achieved' : ''} ${!isAchieved.arrive ? 'disabled' : ''}`}
            onClick={() => isAchieved.arrive && handleButtonClick('vietnam')}
          >
            {isAchieved.vietnam && <i className="fas fa-check"></i>}
          </span>
        </p>
        {timestamps.vietnam && <p className="timestamp">- {timestamps.vietnam}</p>}
        <button className="make-done-btn">Make it Done</button>
      </div>
      {isPopupVisible && (
        <div className="popup">
          <p>{isAchieved[selectedButton] ? 'Cancel this entry?' : 'Save changes?'}</p>
          <button onClick={isAchieved[selectedButton] ? handleCancel : handleSave}>Yes</button>
          <button onClick={() => setIsPopupVisible(false)}>No</button>
        </div>
      )}
      {isLocationPopupVisible && (
        <div className="popup">
          <p>Do you want to share your location?</p>
          <button onClick={handleShareLocation}>Yes</button>
          <button onClick={() => setIsLocationPopupVisible(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
