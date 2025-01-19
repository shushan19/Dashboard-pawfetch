// components/Dashboard/AdoptionRequests.jsx
import React, { useEffect, useState } from "react";
import "./AdoptionRequests.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdoptionRequests = () => {
  const { userDetail } = useSelector((state) => state.loginStatus);
  const [request, setRequest] = useState(null);
  const fetchAllRequest = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/getAllFormRequest`,
      { userId: userDetail?._id }
    );
    setRequest(response.data.data);
  };
  useEffect(() => {
    fetchAllRequest();
  }, [userDetail?._id]);

  const deletePets = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/pet/${id}`);
      if (response.status === 200) {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/adoption-form/${id}`)
        if (response.status === 200) {
          toast.success(response.data.message);
          fetchAllRequest();
        }
      }
    } catch (error) {
      toast.success("Something Went Wrong!!");
      console.log(error)
    }
  };
  const handleReject = async (id) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/adoption-form/${id}`);
      console.log(response)
    } catch (error) {
      toast.error("Something went wrong!!")
      console.log(error.response)
    }
  }
  return (
    <div id="adoptions">
      <h2>Adoption Requests</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>User Phone</th>
            <th>User Email</th>
            <th>Pet Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            request?.length > 0 && (
              request?.map((request) => (
                <tr key={request?._id}>
                  <td>{request?.fullName}</td>
                  <td>{request?.phoneNumber}</td>
                  <td>{request?.email}</td>
                  <td>{request?.currentPets[0]?.name}</td>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL
                        }/${request?.currentPets[0]?.image?.slice(6)}`}
                      alt=""
                      className="rounded-3xl"
                    />
                  </td>
                  <td>
                    <button onClick={() => deletePets(request?.petId)}>Approve</button>
                    <button onClick={() => handleReject(userDetail?._id)}>Decline</button>
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>
      {!request?.length > 0 && <p className="not-found">No Request Found!!</p>}
    </div>
  );
};

export default AdoptionRequests;
