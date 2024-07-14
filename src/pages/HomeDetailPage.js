import React from 'react';
import '../styles/HomeDetailPage.css';

const HomeDetailPage = () => {
  return (
    <div className="home-detail">
      <p className="shipment-goals-title">Your shipment goals</p>
      <p className="shipment-goals-trno">TR NO.: asd123456</p>
      <div className="shipment-goals-status">
        <p className="achieved-count"><strong>3/6</strong></p>
        <p className="achieved-text">Achieved</p>
      </div>
      <div className="shipment-goals-icons">
        <i className="fas fa-circle-check"></i>
        <i className="fas fa-circle-check"></i>
        <i className="fas fa-circle-check"></i>
        <i className="fas fa-circle"></i>
        <i className="fas fa-circle"></i>
        <i className="fas fa-circle"></i>
      </div>
    </div>
  );
};

export default HomeDetailPage;
