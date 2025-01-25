import React, { useEffect, useState } from "react";
import "./AddPetForm.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPetForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginStatus.userDetail);
  const [categories, setCategories] = useState([]); // State for categories
  const [breeds, setBreeds] = useState([]); // Initialize breeds as an empty array
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [selectedBreed, setSelectedBreed] = useState(""); // Selected breed

  // Fetch all categories
  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getallcategory`
        );
        if (response.status === 200) {
          setCategories(response.data);
        } else {
          toast.error("Error fetching categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchAllCategory();
  }, []);

  // Fetch breeds based on selected category
  useEffect(() => {
    const fetchBreedsByCategory = async () => {
      if (selectedCategory) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/breeds-by-category/${selectedCategory}`
          );
          if (response.status === 200) {
            setBreeds(response.data.data);
          } else {
            toast.error("Error fetching breeds");
          }
        } catch (error) {
          console.error("Error fetching breeds:", error);
          toast.error("Failed to fetch breeds");
        }
      } else {
        setBreeds([]); // Clear breeds if no category is selected
      }
    };

    fetchBreedsByCategory();
  }, [selectedCategory]);

  // Pet form data
  const [petData, setPetData] = useState({
    name: "",
    image: "",
    age: "",
    gender: "",
    category: "",
    address: "",
    owner: user?._id || "",
    vaccination_status: "",
    health_issue: "",
    medication: "",
    breed: "",
    description: "",
  });

  // Update owner ID in petData when user changes
  useEffect(() => {
    if (user?._id) {
      setPetData((prev) => ({ ...prev, owner: user._id }));
    }
  }, [user?._id]);

  // Image preview state
  const [imagePreview, setImagePreview] = useState("");

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetData({ ...petData, image: file });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all form fields to FormData
    formData.append("name", petData.name);
    formData.append("image", petData.image);
    formData.append("age", petData.age);
    formData.append("gender", petData.gender);
    formData.append("category", selectedCategory); // Use selected category
    formData.append("address", petData.address);
    formData.append("vaccination_status", petData.vaccination_status);
    formData.append("health_issue", petData.health_issue);
    formData.append("medication", petData.medication);
    formData.append("breed", selectedBreed); // Use selected breed
    formData.append("description", petData.description);
    formData.append("owner", user._id);

    try {
      // Send the form data using Axios
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addpet`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type
          },
        }
      );

      if (response?.data) {
        // Reset form data
        setPetData({
          name: "",
          image: "",
          age: "",
          gender: "",
          category: "",
          address: "",
          owner: user._id,
          vaccination_status: "",
          health_issue: "",
          medication: "",
          breed: "",
          description: "",
        });
        setSelectedCategory("");
        setSelectedBreed("");
        setImagePreview("");
        toast.success("Pet added successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add pet. Please try again.");
    }
  };

  return (
    <div id="addPet">
      <h2>Add New Pet</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          required
          type="text"
          value={petData.name}
          onChange={(e) => setPetData({ ...petData, name: e.target.value })}
        />

        <label>Image:</label>
        <input
          required
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}

        <label>Age:</label>
        <input
          required
          type="number"
          value={petData.age}
          onChange={(e) => setPetData({ ...petData, age: e.target.value })}
        />

        <label>Gender:</label>
        <select
          value={petData.gender}
          onChange={(e) => setPetData({ ...petData, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category_name}
            </option>
          ))}
        </select>

        <label>Breed:</label>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          required
        >
          <option value="">Select Breed</option>
          {breeds?.map((breed) => (
            <option key={breed._id} value={breed._id}>
              {breed.breed_name}
            </option>
          ))}
        </select>

        <label>Address:</label>
        <input
          required
          type="text"
          value={petData.address}
          onChange={(e) => setPetData({ ...petData, address: e.target.value })}
        />

        <label>Vaccination Status:</label>
        <input
          required
          type="text"
          value={petData.vaccination_status}
          onChange={(e) =>
            setPetData({ ...petData, vaccination_status: e.target.value })
          }
        />

        <label>Health Issue:</label>
        <input
          required
          type="text"
          value={petData.health_issue}
          onChange={(e) =>
            setPetData({ ...petData, health_issue: e.target.value })
          }
        />

        <label>Medication:</label>
        <input
          required
          type="text"
          value={petData.medication}
          onChange={(e) =>
            setPetData({ ...petData, medication: e.target.value })
          }
        />

        <label>Description:</label>
        <textarea
          value={petData.description}
          onChange={(e) =>
            setPetData({ ...petData, description: e.target.value })
          }
        ></textarea>

        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPetForm;