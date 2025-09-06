import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
  const [mood, setMood] = useState(null);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-gray-600 to-gray-600">
        <h1 className="text-4xl font-bold mb-4">We’re here to help you learn better</h1>
        <p className="text-lg text-gray-200">
          Have questions about courses, payments, or careers? Let’s talk.
        </p>
      </section>

      {/* Contact Options */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-12 max-w-6xl mx-auto">
        {[
          { icon: <Mail />, title: "Email Support", info: "support@upcode.com" },
          { icon: <MessageSquare />, title: "Live Chat", info: "Chat with us 24/7" },
          { icon: <Phone />, title: "Call Us", info: "+91 8433070121" },
          { icon: <MapPin />, title: "Visit Us", info: "Bangalore, India" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 text-center shadow-lg rounded-2xl hover:scale-105 transition"
          >
            <div className="p-3 bg-indigo-600 rounded-full w-fit mx-auto">{item.icon}</div>
            <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
            <p className="text-gray-300">{item.info}</p>
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="px-6 py-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message ✨</h2>
        <form className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />

          <select className="w-full p-3 rounded-lg bg-gray-700 text-gray-200">
            <option>Course Query</option>
            <option>Payment Issue</option>
            <option>Partnership</option>
            <option>Other</option>
          </select>

          <textarea
            placeholder="Your Message..."
            className="w-full p-3 rounded-lg bg-gray-700 text-white"
          />

          {/* Emoji Mood Selector */}
          <div className="flex gap-3 justify-center">
            {["😊", "😐", "😟"].map((emoji, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setMood(emoji)}
                className={`text-2xl ${
                  mood === emoji ? "scale-125" : "opacity-70"
                } transition`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 py-3 rounded-lg hover:cursor-pointer"
          >
            Submit
          </button>
        </form>
      </section>

      {/* FAQ Accordion */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions ❓</h2>
        <div className="space-y-4">
          {[
            {
              q: "How do I enroll in a course?",
              a: "Go to the Catalog, select your course, and click Enroll.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept cards, UPI, wallets, and net banking.",
            },
            {
              q: "Do you offer refunds?",
              a: "Yes, refunds are available within 7 days of purchase.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer"
            >
              <summary className="font-semibold">{faq.q}</summary>
              <p className="mt-2 text-gray-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-12 text-center bg-gradient-to-r from-gray-700 to-gray-400">
        <h2 className="text-3xl font-bold mb-4">Why Contact Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div>
            <p className="text-4xl font-bold">10k+</p>
            <p>Students Supported</p>
          </div>
          <div>
            <p className="text-4xl font-bold">&lt; 2 hrs</p>
            <p>Avg Response Time</p>
          </div>
          <div>
            <p className="text-4xl font-bold">98%</p>
            <p>Satisfaction Rate</p>
          </div>
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

export default ContactUs;

