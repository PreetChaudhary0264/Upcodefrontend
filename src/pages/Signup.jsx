import React, { useState } from "react";
import signupImg from "../assets/login.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../services/operations/authAPI";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  // handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(
      signup(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.confirmPassword,
        role,
        formData.contactNumber,
        navigate
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4 sm:p-6">
      {/* Flex container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gray-900 rounded-2xl shadow-lg overflow-hidden gap-6 md:gap-10">
        
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
            Create Your Account
          </h2>

          {/* Toggle Student/Instructor */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-700 rounded-full overflow-hidden">
              <button
                type="button"
                onClick={() => setRole("Student")}
                className={`px-4 md:px-6 py-2 text-sm md:text-base font-semibold rounded-full transition ${
                  role === "Student"
                    ? "bg-yellow-400 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("Instructor")}
                className={`px-4 md:px-6 py-2 text-sm md:text-base font-semibold rounded-full transition ${
                  role === "Instructor"
                    ? "bg-yellow-400 text-white"
                    : "text-gray-300 hover:bg-gray-600"
                }`}
              >
                Instructor
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First + Last name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full sm:w-1/2 p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full sm:w-1/2 p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2"
            />

            {/* Phone */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value="+91"
                readOnly
                className="w-full sm:w-1/4 p-3 rounded-md bg-gray-800 text-gray-400 border border-gray-600"
              />
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full sm:w-3/4 p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2"
              />
            </div>

            {/* Password + Confirm */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full sm:w-1/2 p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full sm:w-1/2 p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:cursor-pointer text-white font-semibold py-3 rounded-md transition duration-200"
            >
              Sign Up
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-yellow-400 hover:underline hover:cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 hidden md:flex justify-center items-center">
          <img
            src={signupImg}
            alt="Student studying"
            className="w-3/4 h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;





