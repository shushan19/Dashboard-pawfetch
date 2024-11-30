import React, { useState } from "react"
import "./AddIndividualForm.css"
import axios from "axios"
const AddIndividualForm = ({ showModal, closeModal, refreshList }) => {
  const initialFormData = {
    fullName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          ...formData,
          role: "Individual", // Always setting the role to 'Individual'
        }
      )

      if (response.status === 201) {
        alert("User registered successfully")
        resetForm();
        closeModal() // Close the modal after successful registration
        refreshList() // Refresh the individual list
      }
    } catch (err) {
      console.error(err)
      alert("An error occurred while registering the user")
    }
  }

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
          <h2>Add Individual User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
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
  )
}

export default AddIndividualForm
