// components/Dashboard/PetList.jsx
import React, { useEffect, useState } from "react";
import "./PetList.css";
import "./AddPetForm";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PetList = () => {
  const [userId, setUserId] = useState(null);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  const fetchAllPets = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/getAllPets`,
      { id: userId }
    );
    if (response.data.data) {
      setPets(response.data.data);
    }
  };
  const deletePets = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/pet/${id}`);
    toast.success("Pet deletd Successfully");
    fetchAllPets();
  };
  const handelNavigate = (id) => {
    navigate(`/pets/${id}`);
  };
  const { userDetail } = useSelector((state) => state.loginStatus);
  useEffect(() => {
    if (userDetail?._id) {
      setUserId(userDetail?._id);
    }
  }, [userDetail?._id]);
  useEffect(() => {
    fetchAllPets();
  }, [userId]);

  return (
    <div id="pets">
      <h2>Manage Pets</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <tr key={pet._id}>
                <td>{pet.name}</td>
                <td>{pet.breed}</td>
                <td>{pet.age}</td>
                <td>
                  <button onClick={() => handelNavigate(pet._id)}>View</button>
                  <button>Edit</button>
                  <button onClick={() => deletePets(pet._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No pets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;
