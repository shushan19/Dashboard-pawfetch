// components/Dashboard/PetList.jsx
import React from "react";
import "./PetList.css";
import "./AddPetForm";

const PetList = () => {
  const pets = [
    { id: 1, name: `BOB`, type: "Dog", age: 2 },
    { id: 2, name: "Whiskers", type: "Cat", age: 3 },
    // More pets
  ];

  return (
    <div id="pets">
      <h2>Manage Pets</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>{pet.age}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;
