import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import  apiConnector  from "../services/apiConnector"; //  aapki api connector file
import { categories } from "../services/apis"; // jisme GET_USER_DETAILS hoga

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);


  // Local state for additional details
  const [additionalDetails, setAdditionalDetails] = useState({
    dateOfBirth: null,
    gender: null,
    contactNumber: null,
    about: null,
  });

  // Fetch user additional details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await apiConnector(
          "GET",
           categories.GET_USER_DETAILS,
           null,
          {
            Authorization: `Bearer ${token}`,
          }
      );


        console.log("Printing MyProfile Response",response);
        
        if (response?.data?.success) {
          const details = response.data.userDetails.additionalDetails;
          setAdditionalDetails({
            dateOfBirth: details?.dateOfBirth || null,
            gender: details?.gender || null,
            contactNumber: details?.contactNumber || null,
            about: details?.about || null,
          });
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 p-8 text-white bg-gray-900 shadow-lg">
      {/* Heading */}
      <h1 className="text-3xl font-semibold">My Profile</h1>

      {/* Section 1: Basic Info */}
      <div className="flex items-center gap-6 bg-gray-800 p-6 rounded-lg w-full">
        <img
          src={user?.image || "/default-avatar.png"}
          alt={`${user?.firstName}`}
          className="aspect-square w-[100px] rounded-full object-cover border border-gray-700"
        />
        <div>
          <p className="text-xl font-medium">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Section 2: Additional Info */}
      <div className="bg-gray-800 p-6 rounded-lg flex flex-col gap-3 w-full">
        <h2 className="text-xl font-semibold mb-2">Additional Details</h2>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-400">Date of Birth</p>
            <p>{additionalDetails?.dateOfBirth || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400">Gender</p>
            <p>{additionalDetails?.gender || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400">Contact Number</p>
            <p>{additionalDetails?.contactNumber || "N/A"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400">About</p>
            <p>{additionalDetails?.about || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Section 3: Account Info + Edit */}
      <div className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4 w-full">
        <h2 className="text-xl font-semibold mb-2">Account Info</h2>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-400">First Name</p>
            <p>{user?.firstName || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-400">Last Name</p>
            <p>{user?.lastName || "N/A"}</p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition-all"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;




