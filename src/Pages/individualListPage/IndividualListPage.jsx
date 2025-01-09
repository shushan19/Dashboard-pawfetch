import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IndividualListPage.css';
import AddIndividualForm from '../../components/AddIndividualForm';
import DeleteConfirmationModal from '../organizationListPage/DeleteConfirmationModal';  // Import the DeleteConfirmationModal
import { toast } from 'react-toastify';

const IndividualListPage = () => {
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);  // Store the user to delete

  // Fetch all individuals
  const fetchIndividuals = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getallindividuals`);
      setIndividuals(response?.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching the individuals');
      setLoading(false);
    }
  };

  // Open modal to add user
  const openModal = () => {
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Fetch individuals on component mount
  useEffect(() => {
    fetchIndividuals();
  }, []);

  // Delete individual user
  const deleteUser = async (userId) => {
    if (!userId) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/deleteindividual/${userId}`
      );

      if (response.status === 200) {
        toast.success('User deleted successfully');
        fetchIndividuals(); // Refresh the list of individuals
      }
    } catch (err) {
      toast.error('An error occurred while deleting the user');
    } finally {
      closeDeleteModal(); // Close the modal after deletion
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (user) => {
    setUserToDelete(user);  // Set the user to delete
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);  // Clear the user to delete
  };

  return (
    <div className="individual-users-list">
      <h1>Individual Users List</h1>

      {/* Add User Button */}
      <button className="btn btn-primary" onClick={openModal}>
        Add User
      </button>

      {/* Modal for Adding Individual User */}
      <AddIndividualForm
        showModal={showModal}
        closeModal={closeModal}
        refreshList={fetchIndividuals}  // Pass fetchIndividuals function to refresh the list
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
                    onClick={() => openDeleteModal(individual)}  // Open the delete modal with the user
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        closeModal={closeDeleteModal}
        onConfirm={() => deleteUser(userToDelete?.userId._id)}  // Pass the correct userId for deletion
        organizationName={userToDelete ? userToDelete.fullName : ''}  // Show user's full name in the modal
      />
    </div>
  );
};

export default IndividualListPage;
