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
      <div className='bg-gray-600 p-15'>
        <p className='text-white'>{`Home / Catalog / `}
            <span className='text-yellow-400 font-semibold'>
               {catalogPageData?.selectedCategory?.name}
            </span>
        </p>
        <p className='text-2xl text-white my-3'>{catalogPageData?.selectedCategory?.name}</p>
        <p className='text-white'>{catalogPageData?.selectedCategory?.description}</p>
      </div>

      <div className='bg-gray-900'>
        {/* section1 */}
        <div>
         {/* <div className='text-2xl text-white font-bold'>Courses To Get You Started</div> */}
          <div className="w-2/3 mx-auto">
           <p className='text-white mb-3 font-Bold text-3xl p-6 ml-6'>{catalogPageData?.selectedCategory?.name} Courses</p>
            <RenderCourses courses={catalogPageData?.selectedCategory?.course}/>
          </div>
        </div>

        {/* section2 */}
        <div>
          <div className="w-2/3 mx-auto">
            <p className='text-white mb-3 font-Bold text-3xl p-6 ml-6'>Most Selling Courses</p>
            <RenderCourses courses={catalogPageData?.topSellingCourses}/>
          </div>
        </div>

        {/* section3
        <div>
          <div className="w-2/3 mx-auto">
           <p className='text-white mb-3 font-Bold text-3xl p-6 ml-6'>Check Out Other Courses</p>
            <HorizontalCourseSlider courses={catalogPageData?.differentCategories}/>
          </div>
        </div> */}

        <div className="mt-25 border-t border-gray-700 pt-5 text-center text-sm text-gray-400"/>

        <footer className="bg-gray-900 text-gray-300 py-10 mt-5">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
                {/* Brand Section */}
                <div>
                  <h2 className="text-2xl font-bold text-white">UpCode</h2>
                  <p className="mt-3 text-sm">
                    Empowering students to code, learn, and grow with structured paths,
                    real-world projects, and mentorship.
                  </p>
                </div>
        
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                  <ul className="mt-3 space-y-2 text-sm">
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
              <div className="mt-25 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} UpCode. All rights reserved.
              </div>
            </footer>

        </div>

        

    </div>
  )
}

export default Catalog
