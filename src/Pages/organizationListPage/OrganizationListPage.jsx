import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddOrganizationForm from '../../components/AddOrganizationForm'; 
import DeleteConfirmationModal from './DeleteConfirmationModal'; 
import { toast } from 'react-toastify';

const OrganizationListPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [organizationToDelete, setOrganizationToDelete] = useState(null); 

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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const openDeleteModal = (organization) => {
    setOrganizationToDelete(organization);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setOrganizationToDelete(null);
  };

  const deleteOrganization = async () => {
    if (!organizationToDelete) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/deleteorganization/${organizationToDelete._id}`
      );

      if (response.status === 200) {
        toast.success('Organization deleted successfully');
        fetchOrganizations(); 
      }
    } catch (err) {
      toast.error('An error occurred while deleting the organization');
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="organization-list">
      <h1>Organization List</h1>

      <button className="btn btn-primary" onClick={openModal}>
        Add Organization
      </button>

      <AddOrganizationForm
        showModal={showModal}
        closeModal={closeModal}
        refreshList={fetchOrganizations} 
      />

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
                    onClick={() => openDeleteModal(organization)} 
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

      <DeleteConfirmationModal
        showModal={showDeleteModal}
        closeModal={closeDeleteModal}
        onConfirm={deleteOrganization} 
        organizationName={organizationToDelete ? organizationToDelete.orgName : ''}
      />
    </div>
  );
};

export default OrganizationListPage;
