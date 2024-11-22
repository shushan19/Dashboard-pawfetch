// components/Dashboard/Statistics.jsx
import React from "react";
import "./Statistics.css";

const Statistics = () => {
  const stats = {
    totalPets: 20,
    pendingAdoptions: 5,
    totalAdopted: 30,
    totalUsers: 100,
  };

  return (
    <div id="statistics">
      <h2>Statistics Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <h3>Total Pets</h3>
          <p>{stats.totalPets}</p>
        </div>
        <div className="stat-item">
          <h3>Pending Adoptions</h3>
          <p>{stats.pendingAdoptions}</p>
        </div>
        <div className="stat-item">
          <h3>Total Adopted</h3>
          <p>{stats.totalAdopted}</p>
        </div>
        <div className="stat-item">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
