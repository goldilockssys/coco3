import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeDetailPage from './HomeDetailPage';
import NewJobDetailPage from './NewJobDetailPage';
import ProcessingDetailPage from './ProcessingDetailPage';
import CompleteDetailPage from './CompleteDetailPage';
import '../styles/JobList.css';

const JobList = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleTrackingClick = () => {
    navigate('/tracking');
  };

  return (
    <div className="job-list-container">
      <div className="profile">
        <p className="profile-item"><strong>Name:</strong> PARK SANG HYUN</p>
        <p className="profile-item"><strong>TRUCK NO.:</strong> 30H2340</p>
        <p className="profile-item"><strong>TRUCK TYPE:</strong> 45FT</p>
        <p className="profile-item"><strong>Phone:</strong> 1234567890</p>
        <p className="profile-item"><strong>Address:</strong> 123 Main Street</p>
      </div>
      <div className="separator"></div>
      <div className="job-list-header">
        <h2 className="job-list-title">YOUR JOB LIST</h2>
        <div className="job-list-tabs">
          <button className={`tab-button ${selectedTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>HOME</button>
          <button className={`tab-button ${selectedTab === 'newjob' ? 'active' : ''}`} onClick={() => handleTabClick('newjob')}>NEW JOB</button>
          <button className={`tab-button ${selectedTab === 'processing' ? 'active' : ''}`} onClick={() => handleTabClick('processing')}>PROCESSING</button>
          <button className={`tab-button ${selectedTab === 'complete' ? 'active' : ''}`} onClick={() => handleTabClick('complete')}>COMPLETE</button>
        </div>
      </div>
      <div className="job-detail">
        {selectedTab === 'home' && <HomeDetailPage />}
        {selectedTab === 'newjob' && <NewJobDetailPage />}
        {selectedTab === 'processing' && <ProcessingDetailPage onClick={handleTrackingClick} />}
        {selectedTab === 'complete' && <CompleteDetailPage />}
      </div>
    </div>
  );
};

export default JobList;
