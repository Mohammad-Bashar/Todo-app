import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://todo-app-72z3.onrender.com/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "User registered successfully");
      localStorage.setItem("jwt", data.token);
      navigateTo("/login");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
toast.error(
    error.response?.data?.message ||
    error.response?.data?.errors ||
    "User registration failed"
  );    }
  };

  return (
    <div>
  <div>
    <div className="flex h-screen items-center justify-center bg-[#7EA172]">
      <div className="w-full max-w-md p-8 bg-[#C7CB85] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-900">
          Signup
        </h2>

        <form onSubmit={handleRegister}>
          {/* username */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-800">
              Username
            </label>
            <input
              className="w-full p-3 border border-[#7EA172] rounded focus:outline-none focus:ring-2 focus:ring-[#7EA172] bg-white"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Type Username"
            />
          </div>

          {/* email */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-800">
              Email
            </label>
            <input
              className="w-full p-3 border border-[#7EA172] rounded focus:outline-none focus:ring-2 focus:ring-[#7EA172] bg-white"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Email"
            />
          </div>

          {/* password */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-800">
              Password
            </label>
            <input
              className="w-full p-3 border border-[#7EA172] rounded focus:outline-none focus:ring-2 focus:ring-[#7EA172] bg-white"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type Username"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6b8f60] text-white hover:bg-[#6b8f60] duration-300 rounded-xl font-semibold p-3"
          >
            Signup
          </button>

          <p className="mt-4 text-center text-gray-800">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#C64D21] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>

  );
}

export default Signup;
