import React, { useEffect, useState } from "react";
import "./PetList.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

const PetList = () => {
  const [userId, setUserId] = useState(null);
  const [pets, setPets] = useState([]);
  const [breedNames, setBreedNames] = useState({}); // store breed names by pet id
  const navigate = useNavigate();
  const { userDetail } = useSelector((state) => state.loginStatus);

  // Fetch all pets
  const fetchAllPets = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/getAllPets`,
      { id: userId }
    );
    console.log(response.data.data)
    if (response.data.data) {
      setPets(response.data.data);
    }
  };

  // Fetch breed name
  const getBreedName = async (breedId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/breed/${breedId}`
    );
    return response.data.data.breed_name;
  };

  // Delete pet
  const deletePets = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/pet/${id}`);
    toast.success("Pet deleted successfully");
    fetchAllPets();
  };

  // Navigate to pet details page
  const handelNavigate = (id) => {
    navigate(`/pets/${id}`);
  };

  // Navigate to edit pet page
  const handelEdit = (id) => {
    navigate(`/pets/edit/${id}`);
  };

  // Set userId when userDetail is available
  useEffect(() => {
    if (userDetail?._id) {
      setUserId(userDetail?._id);
    }
  }, [userDetail?._id]);

  // Fetch all pets and their breed names once userId is available
  useEffect(() => {
    if (userId) {
      fetchAllPets();
    }
  }, [userId]);

  // Fetch breed names for each pet after pets data is loaded
  useEffect(() => {
    if (pets.length > 0) {
      const fetchBreeds = async () => {
        const breedData = {};
        for (const pet of pets) {
          const breedName = await getBreedName(pet?.breed);
          breedData[pet._id] = breedName;
        }
        setBreedNames(breedData); // Store breed names
      };

      fetchBreeds();
    }
  }, [pets]); // Only run this when pets data is loaded

  return (
    <div id="pets">
      <h2>Manage Pets</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets?.length > 0 ? (
            pets?.map((pet) => (
              <tr key={pet._id}>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${pet?.image?.slice(6)}`}
                    alt={pet?.name}
                  />
                </td>
                <td>{pet.name}</td>
                {/* Display breed name if it's fetched, otherwise show 'Loading...' */}
                <td>{breedNames[pet._id] || 'Loading...'}</td>
                <td>{pet.age}</td>
                <td className="actions">
                  <button onClick={() => handelNavigate(pet._id)}><FaEye /></button>
                  <button onClick={() => handelEdit(pet._id)}><FaPen /></button>
                  <button onClick={() => deletePets(pet._id)}><FaTrash /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No pets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;
