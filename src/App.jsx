// components/App.jsx
import React, { useEffect } from "react";
import Sidebar from "./components/Dashboard/Sidebar";
import Header from "./components/Dashboard/Header";
import PetList from "./components/Dashboard/PetList";
import AddPetForm from "./components/Dashboard/AddPetForm";
import AdoptionRequests from "./components/Dashboard/AdoptionRequests";
import UserManagement from "./components/Dashboard/UserManagement";
import Statistics from "./components/Dashboard/Statistics";
import "./App.css";
import {
  Routes,
  Route,
  useNavigate,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn, setUserDetail } from "./store/slice/loginStatusSlice";
import axios from "axios";
import SinglePet from "./Pages/singlepet/SinglePet";
import EditPets from "./Pages/edit/EditPets";
import SuperAdminDashboard from "./Pages/superAdmin/SuperAdminDashboard";
import IndividualListPage from "./Pages/individualListPage/IndividualListPage";
import OrganizationListPage from "./Pages/organizationListPage/OrganizationListPage";
import Breed from "./Pages/breed/Breed";
import Category from "./Pages/category/Category";
import AddBreed from "./Pages/addbreed/AddBreed";
import AddCategory from "./Pages/addcategory/AddCategory";
import Ecommerce from "./Pages/ecommerce/Ecommerce";
import AddProduct from "./Pages/addproduct/AddProduct";

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.loginStatus);
  const userDetail = useSelector((state) => state.loginStatus.userDetail);
  const navigate = useNavigate();

  if (
    userDetail?.role !== "admin" &&
    window.location.href.includes("superadmindashboard")
  ) {
    navigate("/");
  }
  if (
    userDetail?.role !== "admin" &&
    window.location.href.includes("individualslist")
  ) {
    navigate("/");
  }
  if (
    userDetail?.role !== "admin" &&
    window.location.href.includes("organizationslist")
  ) {
    navigate("/");
  }
  const token = localStorage.getItem("adminAuthToken");
  useEffect(() => {
    if (isLoggedIn && window.location.href.includes("/login")) {
      navigate("/");
      alert("ggs");
    }
  }, []);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("adminAuthToken");
      if (!token) {
        return;
      }
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/get-user-by-id`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response);
      dispatch(setLoggedIn(true));
      dispatch(setUserDetail(response.data.data));
    };
    fetchUserDetails();
  }, []);
  return (
    <div className="contaier">
      {isLoggedIn && (
        <div className="admin-dashboard">
          <Sidebar />
        </div>
      )}
      <div className="main-content">
        {isLoggedIn && <Header />}
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Statistics /> : <Navigate to="/login" />}
          />
          <Route
            path="/pets"
            element={isLoggedIn ? <PetList /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-pet"
            element={isLoggedIn ? <AddPetForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/adoptions"
            element={
              isLoggedIn ? <AdoptionRequests /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/users"
            element={isLoggedIn ? <UserManagement /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/pets/edit/:id"
            element={isLoggedIn ? <EditPets /> : <Navigate to="/login" />}
          />
          <Route
            path="/pets/:id"
            element={isLoggedIn ? <SinglePet /> : <Navigate to="/login" />}
          />
          <Route
            path="/superadmindashboard"
            element={<SuperAdminDashboard />}
          />
          <Route path="/individualslist" element={<IndividualListPage />} />
          <Route path="/organizationslist" element={<OrganizationListPage />} />
          <Route path="/breed" element={<Breed />} />
          <Route path="/add-breed" element={<AddBreed />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/category" element={<Category />} />
          <Route path='/ecommerce' element={<Ecommerce/>}/>
          <Route path='/add-product' element={<AddProduct/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
