// components/App.jsx
import React from "react";
import Sidebar from "./components/Dashboard/Sidebar";
import Header from "./components/Dashboard/Header";
import PetList from "./components/Dashboard/PetList";
import AddPetForm from "./components/Dashboard/AddPetForm";
import AdoptionRequests from "./components/Dashboard/AdoptionRequests";
import UserManagement from "./components/Dashboard/UserManagement";
import Statistics from "./components/Dashboard/Statistics";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="contaier">
      <div className="admin-dashboard">
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/pets" element={<PetList />} />
          <Route path="/add-pet" element={<AddPetForm />} />
          <Route path="/adoptions" element={<AdoptionRequests />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
