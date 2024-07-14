import React from 'react';
import '../styles/NewJobDetailPage.css';

const NewJobDetailPage = () => {
  return (
    <div className="new-job-detail">
      <p><strong>TR NO.:</strong> asd123457</p>
      <p><strong>PICK UP DATE:</strong> 2024-07-01</p>
      <p><strong>PICK UP ADDRESS:</strong> 123 MAIN STREET 1212312...</p>
      <div className="tags">
        <span className="tag">BENGBU</span>
        <span className="tag">SAMSUNG</span>
        <span className="tag">Tag</span>
      </div>
      <p><strong>2,000 USD</strong></p>
      <p>LSP NAME</p>
    </div>
  );
};

export default NewJobDetailPage;
