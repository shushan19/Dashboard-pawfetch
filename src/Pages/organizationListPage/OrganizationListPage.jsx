import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './OrganizationListPage.css'; // Make sure to create or update this CSS file
import AddOrganizationForm from '../../components/AddOrganizationForm'; // Import the new organization form component

const OrganizationListPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch the list of organizations from the backend
  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getallorganizations`);
      setOrganizations(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching the organizations');
      setLoading(false);
    }
  };

  // Open the modal to add a new organization
  const openModal = () => {
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Fetch the list when the component mounts
  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Delete an organization
  const deleteOrganization = async (id) => {
    // console.log("Deleting organization with ID:", orgId); 
    // return
    // Display confirmation dialog before proceeding with deletion
    const confirmed = window.confirm('Are you sure you want to delete this organization?');
  
    if (confirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/deleteorganization/${id}`
        );
  
        if (response.status === 200) {
          alert('Organization deleted successfully');
          fetchOrganizations(); // Refresh the list of organizations
        }
      } catch (err) {
        // console.error('Error deleting organization:', err);
        alert('An error occurred while deleting the organization');
      }
    } else {
      console.log('Organization deletion cancelled');
    }
  };

  return (
    <div className="organization-list">
      <h1>Organization List</h1>

      {/* Add Organization Button */}
      <button className="btn btn-primary" onClick={openModal}>
        Add Organization
      </button>

      {/* Modal for Adding Organization */}
      <AddOrganizationForm
        showModal={showModal}
        closeModal={closeModal}
        refreshList={fetchOrganizations} // Pass fetchOrganizations to refresh the list after adding
      />

      {/* Organizations Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Organization Name</th>
              <th>Email</th>
              <th>License Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((organization, index) => (
              <tr key={organization._id}>
                <td>{index + 1}</td>
                <td>{organization.orgName}</td>
                <td>{organization.userId.email}</td>
                <td>{organization.licenseNumber}</td>
                <td>
                  <button
                    onClick={() => deleteOrganization(organization._id)}
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

export default OrganizationListPage;
