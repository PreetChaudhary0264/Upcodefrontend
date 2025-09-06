import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../components/core/RatingStar";
import GetAvgRating from "../services/operations/courseDetailsApi";

const RenderCourses = ({ courses = [] }) => {
  return (
    <div className="w-full px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses?.length > 0 ? (
          courses.map((course, idx) => (
            <Link 
              key={course._id || idx} 
              to={`/buy/${course._id}`}   // Redirect to buy page
            >
              <div className="bg-gray-800 rounded-xl p-4 hover:scale-105 transition duration-300">
                <img
                  src={course.thumbnail || "https://via.placeholder.com/250x150"}
                  alt={course.name}
                  className="rounded-lg w-full h-60 object-cover"
                />
                <h3 className="text-white font-semibold mt-3 text-2xl">
                  {course.courseName}
                </h3>

                <div className="mt-2 flex gap-x-2">
                  <RatingStars 
                    Review_Count={GetAvgRating(course.ratingAndReviews)} 
                    Star_Size={22} 
                  />
                  <span className="text-gray-400">
                    ({course?.ratingAndReviews?.length || 0} Ratings)
                  </span>
                </div>

                <p className="text-yellow-400 font-bold mt-2">
                  ₹{course.price || "Free"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 col-span-2 text-center">
            No courses available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RenderCourses;











