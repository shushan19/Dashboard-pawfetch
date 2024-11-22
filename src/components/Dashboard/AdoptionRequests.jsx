// components/Dashboard/AdoptionRequests.jsx
import React from "react";
import "./AdoptionRequests.css";

const AdoptionRequests = () => {
  const requests = [
    { id: 1, user: "John Doe", pet: "Bella", status: "Pending" },
    { id: 2, user: "Jane Smith", pet: "Whiskers", status: "Pending" },
  ];

  return (
    <div id="adoptions">
      <h2>Adoption Requests</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Pet</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.user}</td>
              <td>{request.pet}</td>
              <td>{request.status}</td>
              <td>
                <button>Approve</button>
                <button>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionRequests;
