import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SuperAdminDashboard.css'

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalIndividuals: 0,
    totalOrganizations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the stats from the backend
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getuserstats`);
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching the stats');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Super Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="stats">
          <div className="stat-item">
            <h2>Total Users</h2>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-item">
            <h2>Total Individuals</h2>
            <p>{stats.totalIndividuals}</p>
          </div>
          <div className="stat-item">
            <h2>Total Organizations</h2>
            <p>{stats.totalOrganizations}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;

