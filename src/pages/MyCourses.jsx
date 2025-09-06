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
    <div className='bg-gray-900 min-h-[calc(100vh-56px)]'>
      <div className="flex justify-between items-center mb-4 text-white">
        <h1 className="text-3xl font-bold mx-6 mt-3">My Courses</h1>
        <button
          className="bg-yellow-400 px-4 py-2 rounded-md text-black hover:cursor-pointer mx-6 mt-3"
          onClick={() => navigate('/dashboard/add-course')}
        >
          Add Course
        </button>
      </div>

        {courses && courses.length > 0 ? (
        <CoursesTable courses={courses} setCourses={setCourses} />
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  )
}

export default MyCourses

