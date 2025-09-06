import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import { FaUserCircle } from "react-icons/fa";

const ProfileDropDown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full border border-gray-600 hover:bg-gray-700 transition"
      >
        <FaUserCircle className="text-2xl" />
        {/*<span>{user?.firstName || "Profile"}</span>*/}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 z-50">
          <Link
            to="/dashboard/my-profile"
            className="block px-4 py-2 hover:bg-gray-800 rounded-t-lg"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-600 rounded-b-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;


