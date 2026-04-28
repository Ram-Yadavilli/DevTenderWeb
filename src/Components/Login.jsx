import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("sushant@gmail.com");
  const [password, setPassword] = useState("Sushant@2104");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const btn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Error Occurs");

      console.log(err);
    }
  };

  return (
    <div style={{ height: "60vh" }} className="flex justify-center">
      <div className="card card-dash bg-base-100 w-96 h-50 my-auto shadow-2xl">
        <div className="card-body">
          <h1 className="card-title font-bold mx-auto">Login</h1>
          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Email ID</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Type here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <input type="submit" value="Submit" className="btn" onClick={btn} />
        </div>
      </div>
    </div>
  );
};

export default Login;
