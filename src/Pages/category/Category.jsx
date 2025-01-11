import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]); // State for category list

  // Fetch all categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch all categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getallcategory`
      ); // API call to fetch all categories
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to handle category deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/category/${id}`);
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category. Please try again.");
    }
  };

  return (
    <div className="category-table-container">
      <NavLink to="/add-category">Add Category</NavLink>
      <h2>Category List</h2>
      {categories?.length > 0 ? (
        <table className="category-table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.category_name}</td>
                <td onClick={() => handleDelete(category._id)}>
                  <FaTrash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default Category;
