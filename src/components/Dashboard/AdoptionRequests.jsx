// components/Dashboard/AdoptionRequests.jsx
import React, { useEffect, useState } from "react";
import "./AdoptionRequests.css";
import axios from "axios";
import { useSelector } from "react-redux";

const AdoptionRequests = () => {
  const { userDetail } = useSelector((state) => state.loginStatus);
  const [request, setRequest] = useState(null);
  useEffect(() => {
    const fetchAllRequest = async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/getAllFormRequest`,
        { userId: userDetail?._id }
      );
      setRequest(response.data.data);
    };
    fetchAllRequest();
  }, [userDetail?._id]);
  return (
    <div id="adoptions">
      <h2>Adoption Requests</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Pet Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {request?.map((request) => (
            <tr key={request?._id}>
              <td>{request?.fullName}</td>
              <td>{request?.currentPets[0]?.name}</td>
              <td>
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/${request?.currentPets[0]?.image?.slice(6)}`}
                  alt=""
                  className="rounded-3xl"
                />
              </td>
              <td>
                <button>Approve</button>
                <button>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionRequests;
