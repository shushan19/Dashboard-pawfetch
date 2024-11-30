import React, { useState } from "react";
import "./AddOrganizationForm.css"; // Adjust your CSS file accordingly
import axios from "axios";

const AddOrganizationForm = ({ showModal, closeModal, refreshList }) => {
  const initialFormData = {
    orgName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    licenseNumber: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          ...formData,
          role: "Organization", // Always setting the role to 'Organization'
        }
      );

      if (response.status === 201) {
        alert("Organization registered successfully");
        resetForm();
        closeModal(); // Close the modal after successful registration
        refreshList(); // Refresh the organization list
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while registering the organization");
    }
  };

  // Reset form data to initial values
  const resetForm = () => {
    setFormData(initialFormData);
  };

  // Close the modal and reset the form
  const handleClose = () => {
    resetForm();
    closeModal(); // Close the modal
  };

  return (
    showModal && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Add Organization</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Organization Name:</label>
              <input
                type="text"
                name="orgName"
                value={formData.orgName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>License Number:</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddOrganizationForm;
