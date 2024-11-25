// components/App.jsx
import React, { useEffect } from "react";
import Sidebar from "./components/Dashboard/Sidebar";
import Header from "./components/Dashboard/Header";
import PetList from "./components/Dashboard/PetList";
import AddPetForm from "./components/Dashboard/AddPetForm";
import AdoptionRequests from "./components/Dashboard/AdoptionRequests";
import UserManagement from "./components/Dashboard/UserManagement";
import Statistics from "./components/Dashboard/Statistics";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUserDetail } from "./store/slice/loginStatusSlice";
import axios from "axios";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("adminAuthToken");
      if (!token) {
        return;
      }
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/get-user-by-id`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response);
      dispatch(setLoggedIn(true));
      dispatch(setUserDetail(response.data.data));
    };
    fetchUserDetails();
  });
  return (
    <div className="contaier">
      <div className="admin-dashboard">
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/add-pet" element={<AddPetForm />} />
          <Route path="/adoptions" element={<AdoptionRequests />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
