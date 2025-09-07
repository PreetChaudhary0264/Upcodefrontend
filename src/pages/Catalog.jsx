import React, { useState } from 'react'
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCatalogPageDetails } from '../services/operations/courseDetailsApi';
import { fetchCourseCategories } from '../services/operations/courseDetailsApi';
import RenderCourses from './RenderCourses';
import HorizontalCourseSlider from './HorizontalCourseSlider';

const Catalog = () => {

   const {catalogName} = useParams();
   const [catalogPageData,setCatalogPageData] = useState();
   const [categoryId,setCatagoryId] = useState("");

   useEffect(() => {
  const getCategories = async () => {
    try {
      const categories = await fetchCourseCategories();
      // find the category whose name matches catalogName
      console.log("catalogname",catalogName);
      
      const matchedCategory = categories.find(
        (cat) => cat.name.toLowerCase() === catalogName.toLowerCase()
      );

      if (matchedCategory) {
        setCatagoryId(matchedCategory._id);
      } else {
        console.warn("No matching category found for", catalogName);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  getCategories();
}, [catalogName]);

     
     useEffect(() => {
  if (!categoryId) {
    console.log("⏸ Skipping API call because categoryId is empty");
    return;
  }

  const getCategoryDetails = async () => {
    try {
      console.log("Api call with categoryId", categoryId);
      const res = await getCatalogPageDetails(categoryId);
      console.log("Courses By Category", res);
      setCatalogPageData(res);
    } catch (error) {
      console.log(error);
    }
  };

  getCategoryDetails();
}, [categoryId]);

     

  return (
  <div>
    {/* Breadcrumb & Category Info */}
    <div className="bg-gray-600 p-6 md:p-10">
      <p className="text-white text-sm md:text-base">
        Home / Catalog /{" "}
        <span className="text-yellow-400 font-semibold">
          {catalogPageData?.selectedCategory?.name}
        </span>
      </p>
      <p className="text-2xl md:text-3xl text-white my-2 md:my-3 font-bold">
        {catalogPageData?.selectedCategory?.name}
      </p>
      <p className="text-white text-sm md:text-base">
        {catalogPageData?.selectedCategory?.description}
      </p>
    </div>

    {/* Courses Sections */}
    <div className="bg-gray-900 py-8 md:py-12">
      {/* Section 1: Selected Category Courses */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <p className="text-white mb-4 md:mb-6 text-2xl md:text-3xl font-bold">
          {catalogPageData?.selectedCategory?.name} Courses
        </p>
        <RenderCourses courses={catalogPageData?.selectedCategory?.course} />
      </div>

      {/* Section 2: Top Selling Courses */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <p className="text-white mb-4 md:mb-6 text-2xl md:text-3xl font-bold">
          Most Selling Courses
        </p>
        <RenderCourses courses={catalogPageData?.topSellingCourses} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-10"></div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">UpCode</h2>
            <p className="mt-3 text-sm md:text-base">
              Empowering students to code, learn, and grow with structured paths,
              real-world projects, and mentorship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm md:text-base">
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#courses" className="hover:text-white">Courses</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
              <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-5 mt-3 text-2xl">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="hover:text-pink-500 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="hover:text-blue-400 transition" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin className="hover:text-blue-600 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm md:text-base text-gray-400">
          © {new Date().getFullYear()} UpCode. All rights reserved.
        </div>
      </footer>
    </div>
  </div>
);

}

export default Catalog
