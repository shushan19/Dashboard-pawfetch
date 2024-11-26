import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./SinglePet.css";

const SinglePet = () => {
  const { id } = useParams(); // Extract the pet ID from the URL
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/pets/${id}`
        );
        setPet(response.data.data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!pet) return <div>Pet not found</div>;

  return (
    <div className="single-pet">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/${pet?.image?.slice(5)}`}
        alt={pet.name}
        className="pet-image"
      />
      <div className="pet-details">
        <h2 className="pet-name">{pet.name}</h2>
        <p>
          <strong>Breed:</strong> {pet.breed}
        </p>
        <p>
          <strong>Age:</strong> {pet.age} years
        </p>
        <p>
          <strong>Gender:</strong> {pet.gender}
        </p>
        <p>
          <strong>Health Issues:</strong> {pet.health_issue || "None"}
        </p>
        <p>
          <strong>Medication:</strong> {pet.medication || "None"}
        </p>
        <p>
          <strong>Vaccination Status:</strong> {pet.vaccination_status}
        </p>
        <p>
          <strong>Description:</strong> {pet.description}
        </p>
        <p>
          <strong>Owner ID:</strong> {pet.owner}
        </p>
        <p>
          <strong>Address:</strong> {pet.address}
        </p>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default SinglePet;
