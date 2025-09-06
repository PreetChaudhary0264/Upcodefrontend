import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import { IoLogoVue } from "react-icons/io5";
import NavbarLinks from '../components/core/NavbarLinks'
import { useLocation } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import ProfileDropDown from '../components/core/Auth/ProfileDropDown';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { fetchCourseCategories } from '../services/operations/courseDetailsApi';

const Navbar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        setSubLinks(categories)
      }
    }
    getCategories()
  }, [])

  return (
    <div className='bg-gray-900 flex h-14 items-center justify-center border-b-1 border-b-gray-500'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
        {/* logo*/}
        <div className="flex flex-row items-center space-x-2">
          <div className="text-2xl text-white">
            <IoLogoVue />
          </div>
          <Link to="/" className="text-2xl font-bold text-white">
            UpCode
          </Link>
        </div>

        {/* nav links */}
        <nav>
          <ul className='flex flex-row gap-x-6 text-white'>
            {
              NavbarLinks.map((link, index) => (
                <li key={index} className='relative overflow-visible'>
                  {
                    link.title === "Catalog" ? (
                      <div className='relative flex items-center gap-1 text-2xl group hover:cursor-pointer'>
                        <p className="text-2xl text-white">{link.title}</p>
                        <IoIosArrowDown className='mt-1.5' />

                        <div className='invisible absolute z-50  left-[50%] top-full flex flex-col rounded-md bg-white text-gray-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] group-hover:h-50 shadow-lg'>
                          {
                            subLinks.length ? (
                              subLinks.map((subLink, index) => (
                                <Link 
                                  to={`/catalog/${subLink.name}`} 
                                  key={index}
                                  className="px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-blue-600 transition-colors rounded-md"
                                >
                                  <p className="text-base">{subLink.name}</p>                          
                                </Link>
                              ))
                            ) : (<div />)
                          }
                        </div>

                      </div>
                    )
                      : (
                        <Link to={link?.path}>
                          <p className={`${matchRoute(link?.path) ? "text-yellow-400  text-2xl" : "text-white text-2xl"}`}>
                            {link.title}
                          </p>
                        </Link>
                      )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/* login signup */}
        <div className='flex gap-x- items-center'>
          {
            user && user.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className='relative '>
                <BsCart4 className='text-2xl text-white' />
                {
                  totalItems > 0 && (
                    <span className='text-red-500'>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }

          {
            token === null && (
              <Link to="/login" >
                <button className='border border-gray-500 bg-gray-800 px-[12px] py-[8px] text-white rounded-md mr-5 hover:cursor-pointer'>Login</button>
              </Link>
            )
          }

          {
            token === null && (
              <Link to="/signup">
                <button className='border border-gray-500 bg-gray-800 px-[12px] py-[8px] text-white rounded-md hover:cursor-pointer'>Sign UP</button>
              </Link>
            )
          }
          {
            token !== null && <ProfileDropDown />
          }
        </div>

      </div>
    </div>
  )
}

export default Navbar


 