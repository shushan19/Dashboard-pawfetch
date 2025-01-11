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
  const role = useSelector((state) => state.loginStatus.userDetail?.role);
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
          <NavLink to="/" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/pets">Manage Pets</NavLink>
        </li>
        <li>
          <NavLink to="/add-pet">Add New Pet</NavLink>
        </li>
        <li>
          <NavLink to="/adoptions">Adoption Requests</NavLink>
        </li>
        <li>
          <NavLink to="/users">User Management</NavLink>
        </li>
        {role === "admin" && (
          <>
            <li>
              <NavLink to="/individualslist">Individual List</NavLink>
            </li>
            <li>
              <NavLink to="/organizationslist">Organization List</NavLink>
            </li>
            <li>
              <NavLink to="/ecommerce">Pet Shop</NavLink>
            </li>
            <li>
              <NavLink to="/category">Category</NavLink>
            </li>
            <li>
              <NavLink to="/breed">Breeds</NavLink>
            </li>
          </>
        )}
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
