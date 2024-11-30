import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import AddUserModal from './AddUserModal'; // Import the modal component
import './IndividualListPage.css';
import AddIndividualForm from '../../components/AddIndividualForm';

const IndividualListPage = () => {
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch the list of individual users from the backend
  const fetchIndividuals = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getallindividuals`);
      setIndividuals(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching the individuals');
      setLoading(false);
    }
  };

  // Open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Fetch the list when the component mounts
  useEffect(() => {
    fetchIndividuals();
  }, []);

  const deleteUser = async (userId) => {
    // Display confirmation dialog before proceeding with deletion
    const confirmed = window.confirm('Are you sure you want to delete this user?');
  
    if (confirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/deleteindividual/${userId}`
        );
  
        if (response.status === 200) {
          alert('User deleted successfully');
          fetchIndividuals(); // Refresh the list of individuals
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('An error occurred while deleting the user');
      }
    } else {
      console.log('User deletion cancelled');
    }
  };
  

  return (
    <div className="individual-users-list">
      <h1>Individual Users List</h1>

      {/* Add User Button */}
      <button className="btn btn-primary " onClick={openModal}>
        Add User
      </button>

      {/* Modal for Adding Individual User */}
      <AddIndividualForm
        showModal={showModal}
        closeModal={closeModal}
        refreshList={fetchIndividuals} // Pass fetchIndividuals function to refresh the list
      />

      {/* Users Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {individuals.map((individual, index) => (
              <tr key={individual._id}>
                <td>{index + 1}</td>
                <td>{individual.fullName}</td>
                <td>{individual.userId.email}</td>
                <td>{individual.phone}</td>
                <td>
                  <button
                    onClick={() => deleteUser(individual.userId._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>	
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IndividualListPage;
