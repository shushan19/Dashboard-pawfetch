// components/Dashboard/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn, setUserDetail } from "../../store/slice/loginStatusSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.loginStatus);
  const handelLogout = () => {
    localStorage.removeItem("adminAuthToken");
    dispatch(setLoggedIn(false));
    dispatch(setUserDetail([]));
    navigate("/");
    toast.success("Logout Successful");
  };

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
        {isLoggedIn && (
          <li>
            <button onClick={handelLogout}>Log Out!</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
