import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUserDetail } from "../../store/slice/loginStatusSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formData
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("adminAuthToken", token);
        toast.success("Login Successful");
        navigate("/");
        dispatch(setUserDetail(response.data));
        dispatch(setLoggedIn(true));
      } else {
        setMessage(response.data.message || "Login failed!");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          error.response.data.msg || "An error occurred during login"
        );
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-containers">
      <div className="login-contents">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password:</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div onClick={togglePasswordVisibility} className="toggle-password">
              {passwordVisible ? <FaEye/>:<FaEyeSlash/>}
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {message && <p style={{ color:'red' }}> Error:{message}</p>}
      </div>
    </div>
  );
};

export default Login;
