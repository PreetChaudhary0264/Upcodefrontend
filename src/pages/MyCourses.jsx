import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../services/operations/courseDetailsApi'
import CoursesTable from './CoursesTable'

const MyCourses = () => {
  const { token, user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      if (!token) return
      const result = await fetchInstructorCourses(token) //token pass karo
      if (result) {
        console.log("Instructor Courses Api Response",result);
        
        setCourses(result) // result me agar {courses: [...]} aata hai
      }
    }
    fetchCourses()
  }, [token, user])

  return (
    <div className="bg-gray-900 min-h-[calc(100vh-56px)] px-4 sm:px-6 lg:px-8 py-6">
  {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">
      My Courses
    </h1>
    <button
      className="bg-yellow-400 px-4 py-2 rounded-md text-black hover:cursor-pointer w-full sm:w-auto text-center"
      onClick={() => navigate('/dashboard/add-course')}
    >
      Add Course
    </button>
  </div>

  {/* Courses Table */}
  {courses && courses.length > 0 ? (
    <div className="overflow-x-auto">
      <CoursesTable courses={courses} setCourses={setCourses} />
    </div>
  ) : (
    <p className="text-gray-400 text-center mt-6">No courses found.</p>
  )}
</div>

  )
}

export default MyCourses

