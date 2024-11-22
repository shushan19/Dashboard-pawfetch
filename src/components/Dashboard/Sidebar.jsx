// components/Dashboard/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Pawfetch Admin</h2>
      <ul>
        <li>
          <NavLink to="/" end activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/pets" activeClassName="active-link">
            Manage Pets
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-pet" activeClassName="active-link">
            Add New Pet
          </NavLink>
        </li>
        <li>
          <NavLink to="/adoptions" activeClassName="active-link">
            Adoption Requests
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" activeClassName="active-link">
            User Management
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
