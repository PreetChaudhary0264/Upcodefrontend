import { useState } from "react";
import { useSelector } from "react-redux";
import apiConnector from "../services/apiConnector";
import { categories } from "../services/apis";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  });

  // input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  edit profile function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiConnector(
        "PUT",
        categories.UPDATE_PROFILE,
        formData,
        { Authorization: `Bearer ${token}` }
      );

      if (response?.data?.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response?.data?.message || "Update failed");
      }
      navigate("/dashboard/my-profile")
    } catch (error) {
      toast.error("Something went wrong while updating profile");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 py-10 px-4 sm:px-6 lg:px-16">
    <div className="bg-gray-800 p-6 sm:p-8 md:p-10 rounded-xl shadow-xl w-full max-w-lg border border-gray-700">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
        
        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-sm sm:text-base">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-sm sm:text-base">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Number */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-sm sm:text-base">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="+91"
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium text-sm sm:text-base">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Write Something About Yourself"
            className="w-full p-3 min-h-[100px] sm:min-h-[120px] rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="mt-4 px-6 py-3 sm:py-4 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all shadow-md text-sm sm:text-base"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
);


};

export default EditProfile;



