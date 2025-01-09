import React from "react";
import './style.css'

const DeleteConfirmationModal = ({ showModal, closeModal, onConfirm, organizationName }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to delete "{organizationName}"?</h2>
        <div className="modal-buttons">
          <button onClick={closeModal} className="btn btn-secondary">
            No
          </button>
          <button
            onClick={() => {
              onConfirm();
              closeModal();
            }}
            className="btn btn-danger"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
