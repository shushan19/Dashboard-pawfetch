import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBreed = () => {
  const [breedName, setBreedName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllCategory`);
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addbreed`,
        { breed_name: breedName, category_id: selectedCategory }
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
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-button">
        Add Breed
      </button>
    </form>
  );
};

export default AddBreed;