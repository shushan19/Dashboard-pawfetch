import React, { useEffect, useState } from "react";
import "./AddPetForm.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPetForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginStatus.userDetail);
  const [category, setCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchAllCategory = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getallcategory`
      );
      if (response.status === 200) {
        setCategory(response.data);
      } else {
        toast.error("Error fetch categories");
      }
    };
    fetchAllCategory();
  }, []);

  const [petData, setPetData] = useState({
    name: "",
    image: "",
    age: "",
    gender: "",
    category: "6741d01f1c6ee898cd745d64",
    address: "",
    owner: `${user?._id}`,
    vaccination_status: "",
    health_issue: "",
    medication: "",
    breed: "",
    description: "",
  });
  useEffect(() => {
    if (user?._id) {
      setPetData((prev) => ({ ...prev, owner: user._id }));
    }
  }, [user?._id]);
  const [imagePreview, setImagePreview] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", petData?.name);
    formData.append("image", petData?.image);
    formData.append("age", petData?.age);
    formData.append("gender", petData?.gender);
    formData.append("category", selectedCategory);
    formData.append("address", petData?.address);
    formData.append("vaccination_status", petData?.vaccination_status);
    formData.append("health_issue", petData?.health_issue);
    formData.append("medication", petData?.medication);
    formData.append("breed", petData?.breed);
    formData.append("description", petData?.description);
    formData.append("owner", user._id);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

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
        setPetData({
          name: "",
          image: "",
          age: "",
          gender: "",
          category: "",
          address: "",
          owner: "",
          vaccination_status: "",
          health_issue: "",
          medication: "",
          breed: "",
          description: "",
        });
        toast.success("Pet added success");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.log(error.response)
    }
  };

  return (
    <div id="addPet">
      <h2>Add New Pet</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input required
          type="text"
          value={petData.name}
          onChange={(e) => setPetData({ ...petData, name: e.target.value })}
        />

        <label>Image:</label>
        <input required type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}

        <label>Age:</label>
        <input required
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
        >
          <option value="">Select Category</option>
          {category?.map((data, index) => (
            <option key={index} value={data._id}>
              {data.category_name}
            </option>
          ))}
        </select>

        {/* <label>Category (Object ID):</label>
        <input required
          type="text"
          value={petData.category}
          onChange={(e) => setPetData({ ...petData, category: e.target.value })}
        /> */}

        <label>Address:</label>
        <input required
          type="text"
          value={petData.address}
          onChange={(e) => setPetData({ ...petData, address: e.target.value })}
        />

        {/* <label>Owner (Object ID):</label>
        <input required
          type="text"
          value={petData.owner}
          onChange={(e) => setPetData({ ...petData, owner: e.target.value })}
        /> */}

        <label>Vaccination Status:</label>
        <input required
          type="text"
          value={petData.vaccination_status}
          onChange={(e) =>
            setPetData({
              ...petData,
              vaccination_status: e.target.value,
            })
          }
        />

        <label>Health Issue:</label>
        <input required
          type="text"
          value={petData.health_issue}
          onChange={(e) =>
            setPetData({ ...petData, health_issue: e.target.value })
          }
        />

        <label>Medication:</label>
        <input required
          type="text"
          value={petData.medication}
          onChange={(e) =>
            setPetData({ ...petData, medication: e.target.value })
          }
        />

        <label>Breed:</label>
        <input required
          type="text"
          value={petData.breed}
          onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
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
