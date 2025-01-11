import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState(""); // State for category name

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    if (!categoryName) {
      toast.error("Category name is required!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addcategory`,
        { category_name: categoryName }
      );

      toast.success("Category added successfully!");
      setCategoryName(""); // Clear the input field
      navigate("/category");
    } catch (error) {
      toast.error("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="add-category-container">
      <NavLink to="/category">Show All Cateogries</NavLink>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit} className="add-category-form">
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
