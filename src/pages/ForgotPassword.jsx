import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://upcode-1.onrender.com/api/v1/resetPasswordToken",
        { email }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Please enter a registered email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Reset Your Password
        </h2>

        <form onSubmit={handleReset} className="flex flex-col gap-6">
          <label className="text-white text-sm flex flex-col">
            Enter your registered email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-lg transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-gray-400 text-xs mt-6 text-center">
          You will receive an email with a link to reset your password.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

