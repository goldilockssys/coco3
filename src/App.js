import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import JobList from './pages/JobList';
import HomeDetailPage from './pages/HomeDetailPage';
import NewJobDetailPage from './pages/NewJobDetailPage';
import ProcessingDetailPage from './pages/ProcessingDetailPage';
import CompleteDetailPage from './pages/CompleteDetailPage';
import TrackingPage from './pages/TrackingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/homedetail" element={<HomeDetailPage />} />
        <Route path="/newjobdetail" element={<NewJobDetailPage />} />
        <Route path="/processingdetail" element={<ProcessingDetailPage />} />
        <Route path="/completedetail" element={<CompleteDetailPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
