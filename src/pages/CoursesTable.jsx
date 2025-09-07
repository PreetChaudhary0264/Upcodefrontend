import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdEdit, MdDelete } from "react-icons/md"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { deleteCourse } from '../services/operations/courseDetailsApi'

const CoursesTable = ({ courses, setCourses }) => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return
    setLoading(true)
    const result = await deleteCourse(courseId, token)
    if (result?.success) {
      setCourses(prev => prev.filter(course => course._id !== courseId)) // remove from UI
    }
    setLoading(false)
  }

  return (
  <div className="mt-6 w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
  {courses.length === 0 ? (
    <p className="text-center text-gray-300 text-lg py-6">No Courses Found</p>
  ) : (
    courses.map((course, idx) => (
      <div
        key={course._id}
        className={`flex flex-col md:flex-row bg-gray-${idx % 2 === 0 ? "800" : "700"} rounded-2xl shadow-lg overflow-hidden hover:bg-gray-600 transition cursor-pointer`}
      >
        {/* Course Info */}
        <div className="flex flex-col md:flex-row flex-1 gap-4 p-4">
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="w-full md:w-[200px] h-48 md:h-[120px] object-cover rounded-lg shadow-md"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-white font-semibold text-lg md:text-xl">{course.courseName}</p>
              <p className="text-gray-300 text-sm md:text-base mt-1 line-clamp-3">{course.courseDescription}</p>
            </div>
            <p className="text-pink-400 uppercase font-medium text-xs mt-2 md:mt-0">{course.status}</p>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:w-[200px]">
          <p className="text-gray-200 font-medium text-lg">₹{course.price}</p>
          <div className="flex gap-3">
            <button className="text-blue-400 hover:text-blue-500 transition-colors">
              <MdEdit size={22} />
            </button>
            <button
              onClick={() => handleDelete(course._id)}
              disabled={loading}
              className="text-red-400 hover:text-red-500 transition-colors"
            >
              <MdDelete size={22} />
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>



);

}

export default CoursesTable



