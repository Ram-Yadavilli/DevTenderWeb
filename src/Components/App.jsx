import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";

import Profile from "./Profile";

import Login from "./Login";

import Body from "./Body";
import Home from "./Home";

import "../index.css";

import { Provider } from "react-redux";
import userStore from "../utils/userStore";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={userStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
