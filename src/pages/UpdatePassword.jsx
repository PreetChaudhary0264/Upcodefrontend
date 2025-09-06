import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdatePassword() {
  const { token } = useParams(); // token comes from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://upcode-1.onrender.com/api/v1/resetPassword", {
        token,
        password,
        confirmPassword,
      });
      setMessage(res.data.message);

      if (res.data.success) {
        // Redirect to login after success
        toast.success("Password Reset Successfull");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Update Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 rounded-lg"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
      </div>
    </div>
  );
}

