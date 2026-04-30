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
  const [isSignup, setIsSignUp] = useState(false);
  const [formTitle, setFormTitle] = useState("Login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
      setError(err.response?.data || "Error Occurs");

      console.log(err.response?.message);
    }
  };

  if (isSignup) {
    let signup = "SignUp";
  } else {
    let signup = "Login";
  }

  const signupBtn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          emailId: email,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true },
      );
      if (res) {
        console.log(res);
        setError("");
        dispatch(addUser(res.data));
        navigate("/profile");
      }

      btn();

      console.log("rrr", res);
    } catch (err) {
      setError(err?.response?.data || "Error Occured");
    }
  };

  return (
    <div style={{ height: "60vh" }} className="flex justify-center">
      <div className="card card-dash bg-base-100 w-96 h-50 my-auto shadow-2xl">
        <div className="card-body">
          <h1 className="card-title font-bold mx-auto">{formTitle}</h1>
          {isSignup && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
          )}

          {isSignup && (
            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Email ID</legend>
            <input
              type="email"
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
          {isSignup ? (
            <input
              type="button"
              value="SignUp"
              className="btn bg-primary w-[75px] items-center align-center block mx-auto"
              onClick={signupBtn}
            />
          ) : (
            <input
              type="button"
              value="Login"
              className="btn bg-primary w-[75px] items-center align-center block mx-auto"
              onClick={btn}
            />
          )}
          {!isSignup && (
            <span
              onClick={() => {
                setIsSignUp(true);
                setFormTitle("SignUp");
                setEmail("");
                setPassword("");
              }}
              className="cursor-pointer text-primary underline block text-center"
            >
              SignUp
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
