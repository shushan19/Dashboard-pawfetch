import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Ecommerce = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get-all-products`
        ); // Replace with your actual API endpoint
        if (response.data.success) {
          setProducts(response.data.data); // Assuming the API returns `products` array
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="ecommerce-container">
      <NavLink to='/add-product'>Add Product</NavLink>
      <h1>All Products</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL
                      }/${product?.image?.slice(6)}`}
                    alt=""
                    className="rounded-3xl"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>Rs.{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category?.category_name || "N/A"}</td>
                <td>{product.isActive ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ecommerce;
