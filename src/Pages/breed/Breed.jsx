import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Breed = () => {
  const [breeds, setBreeds] = useState([]); // State for breed list

  // Fetch all breeds when the component mounts
  useEffect(() => {
    fetchBreeds();
  }, []);

  // Function to fetch all breeds from the backend
  const fetchBreeds = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getallbreed`
      ); // API call to fetch all breeds
      setBreeds(response.data);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/breed/${id}`);
      toast.success("Breed deleted successfully!");
      fetchBreeds();
    } catch (error) {
      toast.error("Failed to delete breed. Please try again.");
    }
  };
  return (
    <div className="breed-table-container">
      <NavLink to="/add-breed">Add Breed</NavLink>
      <h2>Breed List</h2>
      {breeds?.length > 0 ? (
        <table className="breed-table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Breed Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {breeds.map((breed, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{breed.breed_name}</td>
                <td onClick={() => handleDelete(breed._id)}>
                  <FaTrash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No breeds available.</p>
      )}
    </div>
  );
};

export default Breed;
