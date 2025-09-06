import React from "react";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName]; // dynamic icon
  const location = useLocation();
  const dispatch = useDispatch();

  // check if current route matches
  const isActive = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 ${
        isActive(link.path) ? "bg-yellow-800 text-yellow-50" : "text-gray-300"
      }`}
    >
      {/* left border indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 transition-opacity ${
          isActive(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex items-center gap-x-2">
        {Icon && <Icon className="text-lg" />}
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;

