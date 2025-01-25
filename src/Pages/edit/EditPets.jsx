import React, { useEffect, useState } from "react";
import "./EditPet.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditPets = () => {
  const [pet, setPet] = useState({
    name: "",
    age: "",
    breed: "",
    category: "",
    address: "",
    description: "",
    gender: "",
    health_issue: "",
    medication: "",
    vaccination_status: "",
    image: "",
  });

  const [categories, setCategories] = useState([]); // State for categories
  const [breeds, setBreeds] = useState([]); // State for breeds
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [preview, setPreview] = useState(null); // Image preview
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch pet details, categories, and breeds
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/pets/${id}`
        );
        if (response.status === 200) {
          const {
            name,
            age,
            breed,
            category,
            address,
            description,
            gender,
            health_issue,
            medication,
            vaccination_status,
            image,
          } = response.data.data;
          setPet({
            name,
            age,
            breed: breed?._id || "", // Use breed ID
            category: category?._id || "", // Use category ID
            address,
            description,
            gender,
            health_issue,
            medication,
            vaccination_status,
            image,
          });
          setSelectedCategory(category?._id || ""); // Set selected category
          setPreview(`${import.meta.env.VITE_BACKEND_URL}/${image?.slice(6)}`);
        } else {
          toast.error("No Pet Found!");
          navigate("/pets");
        }
      } catch {
        toast.error("Failed to fetch pet data!");
        navigate("/pets");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchPet();
    fetchCategories();
  }, [id, navigate]);

  // Fetch breeds based on selected category
  useEffect(() => {
    const fetchBreeds = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/breeds-by-category/${selectedCategory}`
          );
          setBreeds(response.data);
        } catch (error) {
          console.error("Error fetching breeds:", error);
        }
      }
    };

    fetchBreeds();
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({ ...prevPet, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPet((prevPet) => ({ ...prevPet, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all non-file fields from the state
    Object.keys(pet).forEach((key) => {
      if (key !== "image") {
        formData.append(key, pet[key]);
      }
    });

    // Append the file if one is selected
    if (pet.image) {
      formData.append("image", pet.image);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/pet/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Pet updated successfully!");
        navigate("/pets");
      } else {
        toast.error("Failed to update pet!");
      }
    } catch (error) {
      toast.error("An error occurred while updating the pet!");
      console.error(error);
    }
  };

  return (
    <div className="edit-pet-container">
      <h2>Edit Pet</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={pet.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="age"
          value={pet.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleChange(e);
          }}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <select
          name="breed"
          value={pet.breed}
          onChange={handleChange}
          required
        >
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed._id} value={breed._id}>
              {breed.breed_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="address"
          value={pet.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <textarea
          name="description"
          value={pet.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <select name="gender" value={pet.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="text"
          name="health_issue"
          value={pet.health_issue}
          onChange={handleChange}
          placeholder="Health Issue"
        />
        <input
          type="text"
          name="medication"
          value={pet.medication}
          onChange={handleChange}
          placeholder="Medication"
        />
        <input
          type="text"
          name="vaccination_status"
          value={pet.vaccination_status}
          onChange={handleChange}
          placeholder="Vaccination Status"
        />
        <input type="file" name="image" onChange={handleFileChange} />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Pet Preview" />
          </div>
        )}
        <button type="submit">Update Pet</button>
      </form>
    </div>
  );
};

export default EditPets;