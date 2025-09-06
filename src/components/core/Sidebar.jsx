import React from "react";
import { sidebarLinks } from "./Homepage/sidebarLinks";
import { useSelector, useDispatch } from "react-redux";
import SidebarLink from "./SidebarLink";
import * as Icons from "react-icons/vsc";
import { logout } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // agar tera profileSlice alag hai:
  const { user, loading: profileLoading } = useSelector((state) => state.auth);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="mt-10 text-center text-gray-300">
        Loading...
      </div>
    );
  }
  console.log("Sidebar user type:", user?.accountType);

  return (
    <div className="flex w-[200px] flex-col border-r border-gray-700 h-[calc(100vh-3.5rem)] bg-gray-900 py-10">

      {/* Sidebar Links */}
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;

          return (
            <SidebarLink key={link.id} link={link} iconName={link.icon} />
          );
        })}
      </div>
      

      {/* Divider */}
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-600"></div>

      {/* Settings + Logout */}
      <div className="flex flex-col gap-1">
        {/* Settings Link */}
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
        />

        {/* Logout Button */}
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              dispatch(logout(navigate));
            }
          }}
          className="flex mx-2 items-center gap-x-2 px-6 py-2 text-sm font-medium text-white hover:bg-red-600/20 transition-all"
        >
          <Icons.VscSignOut className="text-lg" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


