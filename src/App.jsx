import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";

import Profile from "./Profile";

import Login from "./Login";

import Body from "./Body";

import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
