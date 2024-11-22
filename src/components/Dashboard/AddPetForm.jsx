// components/Dashboard/AddPetForm.jsx
import React, { useState } from "react";
import "./AddPetForm.css";

const AddPetForm = () => {
  const [petData, setPetData] = useState({ name: "", type: "", age: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Pet Data:", petData);
    // Add backend logic here for adding the pet
  };

  return (
    <div id="addPet">
      <h2>Add New Pet</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={petData.name}
          onChange={(e) => setPetData({ ...petData, name: e.target.value })}
        />
        <label>Type:</label>
        <input
          type="text"
          value={petData.type}
          onChange={(e) => setPetData({ ...petData, type: e.target.value })}
        />
        <label>Age:</label>
        <input
          type="number"
          value={petData.age}
          onChange={(e) => setPetData({ ...petData, age: e.target.value })}
        />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPetForm;
