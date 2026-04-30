import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.user.user);

  const token = Cookies.get("token");

  console.log("token", token);

  const userProfile = async () => {
    try {
      const user = await axios.get("http://localhost:3000/profile/getUser", {
        withCredentials: true,
      });

      dispatch(addUser(user.data));
      console.log("fetch called");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
};

export default Body;
