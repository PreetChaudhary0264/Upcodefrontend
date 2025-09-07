import { useState } from "react";
import loginStudent from "../assets/login.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password, role, navigate));
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4 sm:px-6">
      <div className="bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">

        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Login</h2>

          {/* Role Switch */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setRole("Student")}
              className={`px-4 py-2 rounded-lg font-semibold hover:cursor-pointer ${
                role === "Student"
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole("Instructor")}
              className={`px-4 py-2 rounded-lg font-semibold hover:cursor-pointer ${
                role === "Instructor"
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              Instructor
            </button>
          </div>

          {/* Login Form */}
          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <div className="flex justify-between items-center text-sm">
              <a href="/forgot-password" className="text-yellow-400 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="hover:cursor-pointer transition-transform duration-300 hover:scale-105 w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 hidden md:flex justify-center items-center">
          <img
            src={loginStudent}
            alt="Login Illustration"
            className="w-3/4 md:w-[60%] h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;


