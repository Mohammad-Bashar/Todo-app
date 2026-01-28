import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  // ✅ Use state for token so App re-renders after login/logout
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            token ? <Home setToken={setToken} /> : <Navigate to="/login" replace />
          }
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

        {/* Signup route */}
        <Route
          path="/signup"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <Signup setToken={setToken} />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
