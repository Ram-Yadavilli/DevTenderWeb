import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";

import Profile from "./Profile";

import Login from "./Login";

import Body from "./Body";
import Home from "./Home";
import Feed from "./Feed";
import "../index.css";

import { Provider } from "react-redux";
import userStore from "../utils/userStore";
import Connections from "./Connections";
import ConnectionsList from "./ConnectionsList";
import ConnectectionRequest from "./ConnectionRequest";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={userStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/connections"
              element={
                <ProtectedRoute>
                  <Connections />
                </ProtectedRoute>
              }
            />
            <Route
              path="/connectionRequest"
              element={
                <ProtectedRoute>
                  <ConnectectionRequest />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
