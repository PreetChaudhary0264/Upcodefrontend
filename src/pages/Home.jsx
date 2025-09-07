import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from '../components/core/Homepage/HighlightText'
import codingVideo from '../assets/codingVideo.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import studentCoding from '../assets/studentCoding.jpeg'
import reviews from '../components/core/Homepage/reviews'
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useSelector } from 'react-redux'

const Home = () => {

  const {token} = useSelector((state) => state.auth);

  return (
    <div>
      {/*section1 */}
      <div className='bg-gray-900 relative flex flex-col w-full items-center text-black justify-between px-4 sm:px-6 lg:px-16'>
        <Link to={"/signup"}>
          <div className='group mt-16 p-1 mx-auto rounded-full text-shadow-indigo-100 bg-blue-300 font-bold transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-6 sm:px-10 py-[5px] transition-all duration-200 group-hover:bg-blue-400'>
              <p className='text-sm sm:text-base'>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='text-white text-center text-2xl sm:text-3xl md:text-4xl font-semibold mt-7'>
          Empower Your Future{" "}
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className='mt-4 w-full sm:w-4/5 md:w-2/3 text-center text-sm sm:text-base md:text-lg font-bold text-gray-400'>
          With Our Coding Course, you can learn at your own pace, from anywhere in the world,
          and get access to a wealth of resources, including hands-on projects, quizzes and 
          personalized feedback from instructors.
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-7 mt-8'>
          <Link to={"/about"}>
            <button className='px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition'>
              Learn More
            </button>
          </Link>
          {
            token == null && (
              <Link to={"/login"}>
                <button className='px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-500 transition'>
                  Login
                </button>
              </Link>
            )
          }
        </div>

        {/* Video Section */}
        <div className="mt-10 flex justify-center">
          <div className="relative inline-block">
            {/* White background behind video */}
            <div className="pt-10 absolute top-5 left-5 right-0 bottom-0 bg-blue-200 rounded-lg shadow-lg"></div>
            <video 
              className="w-full max-w-[600px] rounded-lg shadow-lg relative z-10 mb-8"
              src={codingVideo}  
              autoPlay 
              muted 
              loop
            />
          </div>
        </div>

        {/* codeblock - Hidden on screens 800px and below */}
        <div className="hidden min-[927px]:block">
          <CodeBlocks/>
        </div>
      </div>

      {/*section2 */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-10 py-16 gap-10">
        {/* Left Section - Points */}
        <div className="md:w-1/2 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Why Choose Our Platform?</h2>
          <ul className="space-y-4 text-base sm:text-lg text-gray-300">
            <li className="text-gray-600 font-semibold font-serif flex items-start gap-3">
              <span className="w-3 h-3 mt-2 rounded-full bg-yellow-400"></span>
              Learn from top industry experts with real-world experience.
            </li>
            <li className="text-gray-600 font-semibold font-serif flex items-start gap-3 mt-4 sm:mt-8">
              <span className="w-3 h-3 mt-2 rounded-full bg-yellow-400"></span>
              Interactive courses with projects, quizzes, and mentorship.
            </li>
            <li className="text-gray-600 font-semibold font-serif flex items-start gap-3 mt-4 sm:mt-8">
              <span className="w-3 h-3 mt-2 rounded-full bg-yellow-400"></span>
              Flexible learning at your own pace, anytime, anywhere.
            </li>
            <li className="text-gray-600 font-semibold font-serif flex items-start gap-3 mt-4 sm:mt-8">
              <span className="w-3 h-3 mt-2 rounded-full bg-yellow-400"></span>
              Career guidance & placement support to land your dream job.
            </li>
          </ul>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img 
            src={studentCoding}
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </div>
      </div>

      {/*section3 */}
      <section className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center bg-white overflow-hidden">
        {/* Background Huge Text - Responsive sizing */}
        <h1 className="absolute text-[60px] xs:text-[80px] sm:text-[120px] md:text-[180px] lg:text-[240px] xl:text-[300px] font-extrabold text-gray-700 opacity-10 select-none leading-none">
          UpCode
        </h1>

        {/* Button in Foreground */}
        <Link to="/signup" className="relative px-8 sm:px-10 py-3 sm:py-4 bg-yellow-400 text-black font-bold rounded-xl shadow-lg hover:bg-yellow-500 transition">
          Start Studying
        </Link>
      </section>

      {/* Reviews Section */}
      <section className="w-full bg-white py-16 px-4 sm:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center mb-10 text-gray-800">
          What Our Learners Say
        </h2>

        <div className="flex overflow-x-auto space-x-6 px-2 scrollbar-hide">
          {reviews.map((r, index) => (
            <div
              key={index}
              className="min-w-[250px] sm:min-w-[300px] max-w-[300px] bg-gray-100 rounded-xl shadow-md p-6 flex-shrink-0"
            >
              <div className="flex items-center mb-4">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <h3 className="text-gray-900 font-semibold">{r.name}</h3>
              </div>
              <p className="text-gray-700 italic">"{r.review}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8">
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

        <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} UpCode. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home
