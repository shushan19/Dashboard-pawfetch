import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBreed = () => {
  const [breedName, setBreedName] = useState(""); // State to manage input
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addbreed`,
        { breed_name: breedName }
      );
      if (response.status === 200) {
        toast.success("Breed added successfully!");
        navigate("/breed");
      }
    } catch (error) {
      toast.error("Failed to add breed. Please try again.");
    }
  };

  return (
    <form className="breed-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="breedName">Breed Name:</label>
        <input
          type="text"
          id="breedName"
          name="breed_name"
          value={breedName}
          onChange={(e) => setBreedName(e.target.value)}
          placeholder="Enter breed name"
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Add Breed
      </button>
    </form>
  );
};

export default AddBreed;
