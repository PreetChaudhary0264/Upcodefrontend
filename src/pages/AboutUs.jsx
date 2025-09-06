import React from "react";
import { Users, BookOpen, Rocket, Target } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-gray-900 to-gray-900">
        <h1 className="text-4xl font-bold mb-4">About UpCode</h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Empowering learners worldwide with cutting-edge tech education, 
          practical skills, and real-world projects.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-16 max-w-6xl mx-auto">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
          <Target className="text-yellow-500 w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-300">
            To make quality tech education accessible, affordable, and 
            practical for everyone—whether you’re a beginner or an advanced learner.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition">
          <Rocket className="text-yellow-500 w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p className="text-gray-300">
            To build the world’s most learner-centric edtech platform, 
            enabling millions to upgrade their careers with real skills.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-12 text-center bg-gradient-to-r from-gray-700 to-gray-700">
        <h2 className="text-3xl font-bold mb-8">Our Journey in Numbers 📊</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div>
            <p className="text-4xl font-bold">50k+</p>
            <p>Learners</p>
          </div>
          <div>
            <p className="text-4xl font-bold">200+</p>
            <p>Courses</p>
          </div>
          <div>
            <p className="text-4xl font-bold">100+</p>
            <p>Instructors</p>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      {/* <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Story 📖</h2>
        <div className="relative border-l-4 border-yellow-500 pl-6 space-y-8">
          {[
            { year: "2021", text: "UpCode was founded by passionate educators." },
            { year: "2022", text: "Launched our first 50 online courses." },
            { year: "2023", text: "Expanded to 50k+ learners globally." },
            { year: "2024", text: "Partnered with universities & tech companies." },
          ].map((event, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-8 top-1.5 w-6 h-6 bg-yellow-500 rounded-full"></span>
              <h3 className="text-xl font-semibold">{event.year}</h3>
              <p className="text-gray-300">{event.text}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Team Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team 👨‍💻👩‍💻</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Preet Chaudhary", role: "Founder & CEO" },
            { name: "Alex Smith", role: "Head of Engineering" },
            { name: "Sara Khan", role: "Lead Instructor" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition"
            >
              <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 text-center bg-gradient-to-r from-gray-900 to-gray-900">
        <h2 className="text-3xl font-bold mb-4">Join Us Today ✨</h2>
        <p className="mb-6 text-gray-200 max-w-xl mx-auto mt-8">
          Be part of our journey. Learn, grow, and shape the future of tech with us.
        </p>
        <div className="mt-12">
          <a
          href="/signup"
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Get Started
        </a>
        </div>
      </section>

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
  );
};

export default AboutUs;
