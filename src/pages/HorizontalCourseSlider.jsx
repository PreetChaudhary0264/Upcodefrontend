// HorizontalCourseSlider.jsx
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const HorizontalCourseSlider = ({ courses = [] }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative w-full px-10">

      {/* Scrollable Slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth scrollbar-hide"
      >
        {courses?.length > 0 ? (
          courses.map((course, idx) => (
            <div
              key={idx}
              className="min-w-[250px] bg-gray-800 rounded-xl p-4 flex-shrink-0 hover:scale-105 transition duration-300"
            >
              <img
                src={course.thumbnail || "https://via.placeholder.com/250x150"}
                alt={course.name}
                className="rounded-lg w-full h-60 object-cover"
              />
              <h3 className="text-white font-semibold mt-3 text-2xl">
                {course.courseName}
              </h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                {course.courseDescription}
              </p>
              <p className="text-yellow-400 font-bold mt-2">
                ₹{course.price || "Free"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default HorizontalCourseSlider;
