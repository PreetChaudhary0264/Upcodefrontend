import React, { useState, useEffect, useRef } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { IoLogoVue } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';

import NavbarLinks from '../components/core/NavbarLinks';
import ProfileDropDown from '../components/core/Auth/ProfileDropDown';
import { fetchCourseCategories } from '../services/operations/courseDetailsApi';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  const [subLinks, setSubLinks] = useState([]);
  const [catalogOpen, setCatalogOpen] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const desktopCatalogRef = useRef(null);
  const mobileCatalogRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCourseCategories();
      if (categories.length > 0) setSubLinks(categories);
    };
    getCategories();
  }, []);

  // Close dropdowns if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (desktopCatalogRef.current && !desktopCatalogRef.current.contains(event.target)) {
        setCatalogOpen(false);
      }
      if (mobileCatalogRef.current && !mobileCatalogRef.current.contains(event.target)) {
        setCatalogOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-900 flex flex-col custom-md:flex-row custom-md:h-14 items-center justify-between border-b border-gray-500 px-4 custom-md:px-6 lg:px-16 relative">
      <style jsx>{`
        @media (min-width: 800px) {
          .custom-md\\:flex-row { flex-direction: row; }
          .custom-md\\:h-14 { height: 3.5rem; }
          .custom-md\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .custom-md\\:py-0 { padding-top: 0; padding-bottom: 0; }
          .custom-md\\:w-auto { width: auto; }
          .custom-md\\:mt-0 { margin-top: 0; }
          .custom-md\\:gap-x-6 { column-gap: 1.5rem; }
          .custom-md\\:flex { display: flex; }
          .custom-md\\:hidden { display: none; }
          .custom-md\\:gap-3 { gap: 0.75rem; }
        }
      `}</style>

      {/* Logo + Hamburger */}
      <div className="flex flex-row items-center space-x-2 py-3 custom-md:py-0 w-full custom-md:w-auto justify-between">
        <div className="flex items-center space-x-2">
          <IoLogoVue className="text-2xl text-white" />
          <Link to="/" className="text-2xl font-bold text-white">UpCode</Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="custom-md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <GiHamburgerMenu className="text-white text-2xl" />
          </button>
        </div>
      </div>

      {/* Desktop Center Nav Links */}
      <nav className="hidden custom-md:flex flex-row items-center gap-x-6 flex-1 justify-center">
        <ul className="flex flex-row gap-x-6 text-white items-center">
          {NavbarLinks.map((link, index) => (
            <li key={index} className="relative">
              {link.title === "Catalog" ? (
                <div ref={desktopCatalogRef} className="relative flex flex-col items-start">
                  <div
                    className="flex items-center gap-1 text-2xl text-white cursor-pointer px-2 py-1"
                    onClick={() => {
                      if (token === null) {
                        toast.error("Please login first");
                      } else {
                        setCatalogOpen((prev) => !prev);
                      }
                    }}
                  >
                    <p className="text-2xl">Catalog</p>
                  </div>

                  {/* Desktop Catalog dropdown */}
                  <div
                    className={`absolute z-50 left-0 top-full flex flex-col rounded-md bg-white text-gray-800 shadow-lg lg:w-[300px] transition-all duration-200
                      ${catalogOpen ? "visible opacity-100" : "invisible opacity-0"}`}
                  >
                    {subLinks.map((subLink, index) => (
                      <Link
                        to={`/catalog/${subLink.name}`}
                        key={index}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-600 transition-colors rounded-md"
                        onClick={() => setCatalogOpen(false)}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={link?.path}
                  className="px-2 py-1 flex items-center"
                >
                  <p className={`${matchRoute(link?.path) ? "text-yellow-400 text-2xl" : "text-white text-2xl"}`}>
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Right Section */}
      <div className="hidden custom-md:flex flex-row items-center gap-3">
        {user && user.accountType !== "Instructor" && (
          <Link to="/dashboard/cart" className="relative">
            <BsCart4 className="text-2xl text-white" />
            {totalItems > 0 && (
              <span className="text-red-500 absolute -top-1 -right-2 text-sm">
                {totalItems}
              </span>
            )}
          </Link>
        )}

        {token === null ? (
          <>
            <Link to="/login">
              <button className="border border-gray-500 bg-gray-800 px-3 py-2 text-white rounded-md hover:cursor-pointer">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="border border-gray-500 bg-gray-800 px-3 py-2 text-white rounded-md hover:cursor-pointer">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <ProfileDropDown setMenuOpen={setMenuOpen} />
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={menuRef} className="absolute top-14 right-0 w-full bg-gray-900 flex flex-col gap-4 p-4 z-50 custom-md:hidden shadow-lg">
          <ul className="flex flex-col gap-4 text-white items-end">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative text-right">
                {link.title === "Catalog" ? (
                  <div
                    ref={mobileCatalogRef}
                    className="block text-xl cursor-pointer"
                    onClick={() => {
                      if (token === null) {
                        toast.error("Please login first");
                      } else {
                        setCatalogOpen((prev) => !prev);
                      }
                    }}
                  >
                    {link.title}
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className="block text-xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}

                {/* Mobile Catalog dropdown */}
                {catalogOpen && link.title === "Catalog" && (
                  <div className="absolute top-full right-0 w-56 bg-white text-gray-800 rounded-md shadow-lg mt-2 z-50 text-left">
                    {subLinks.map((subLink, idx) => (
                      <Link
                        to={`/catalog/${subLink.name}`}
                        key={idx}
                        className="block px-4 py-2 hover:bg-gray-200 hover:text-blue-600 rounded-md"
                        onClick={() => {
                          setCatalogOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-row items-start gap-2 mt-4 justify-end">
            {token === null ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="border border-gray-500 bg-gray-800 px-3 py-2 text-white rounded-md">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <button className="border border-gray-500 bg-gray-800 px-3 py-2 text-white rounded-md">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropDown setMenuOpen={setMenuOpen} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;





 