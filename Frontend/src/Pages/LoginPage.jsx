import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { Navigate, useNavigate} from 'react-router-dom'

const LoginPage = () => {
  // Initialize state with default values
  const [password, setpassword] = useState(""); // Default is an empty string
  const [role, setrole] = useState("admin"); // Default role
  const [error , seterror] = useState (null)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/auth/login",
        { role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        // Save token and role in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);  // Save the user's role
  
        if (response.data.user.role === "admin") {
          navigate('/admin');
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        seterror(error.response.data.error);
      } else {
        seterror("server Error");
      }
    }
  };
  

  
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-3/4 max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-8">
          <div className="flex flex-col items-center">
            {/* Replace Image with React Icon */}
            <FaUserCircle className="text-6xl text-orange-500" />
            <h2 className="mt-4 text-lg font-semibold text-gray-700">
              Login into your account
            </h2>
          </div>
          
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
             {/* Role Selection Dropdown */}
             <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-600"
              >
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setrole(e.target.value)}
                className="w-full mt-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="admin">Admin</option>
                <option value="kitchen">Kitchen</option>
                <option value="counter">Counter</option>
              </select>
            </div>


            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  value={password}
                  id="password"
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

           

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Login now
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-between">
              <span className="w-full border-t border-gray-300"></span>
              <span className="mx-2 text-sm text-gray-500">OR</span>
              <span className="w-full border-t border-gray-300"></span>
            </div>
          </form>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-1/2  bg-gray-100 flex items-center justify-center">
          <img
            src="https://i.pinimg.com/736x/29/e4/95/29e4956443c22ee5512c103944fcb0fe.jpg"
            alt=""
            className="w-3/4 h-[300px] rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
