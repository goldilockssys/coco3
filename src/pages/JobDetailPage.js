import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/JobDetailPage.css';

const JobDetailPage = () => {
  const { state } = useLocation();
  const job = state?.job || {};

  return (
    <div className="job-detail-container">
      <h2 className="job-detail-title">JOB DETAIL</h2>
      <p><strong>TR NO.:</strong> {job.trNo}</p>
      <p><strong>PICK UP DATE:</strong> {job.pickUpDate}</p>
      <p><strong>PICK UP ADDRESS:</strong> {job.pickUpAddress}</p>
      <div className="tags">
        {job.tags && job.tags.map((tag, idx) => (
          <span className="tag" key={idx}>{tag}</span>
        ))}
      </div>
      <p><strong>{job.amount}</strong></p>
      <p>{job.lspName}</p>
    </div>
  );
};

export default JobDetailPage;
