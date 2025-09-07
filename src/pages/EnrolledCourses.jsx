import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiConnector from '../services/apiConnector'
import { categories } from '../services/apis'
import toast from 'react-hot-toast'
import ProgressBar from '@ramonak/react-progress-bar'
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const navigate = useNavigate();

  const getEnrolledCourses = async () => {
    try {
      const response = await apiConnector(
        'GET',
        categories.GET_ENROLLED_COURSES,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // set enrolled courses
      setEnrolledCourses(response.data.data)
    } catch (error) {
      console.log('Get user enrolled courses error', error)
      toast.error('Could not get enrolled courses')
    }
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
  <div className="min-h-[calc(100vh-56px)] p-4 sm:p-6 bg-gray-900">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Enrolled Courses</h2>

    {!enrolledCourses ? (
      <div className="text-gray-400">Loading ...</div>
    ) : !enrolledCourses.length ? (
      <p className="text-gray-400 text-lg">You have not enrolled in any course yet</p>
    ) : (
      <div className="w-full space-y-4">
        {enrolledCourses.map((course, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-800 rounded-lg p-4 sm:p-6  transition cursor-pointer gap-4"
            onClick={() => navigate(`/course/${course._id}`)}
          >
            {/* Course Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1">
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full sm:w-32 h-32 sm:h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-semibold text-xl sm:text-2xl text-white">
                  {course.courseName}
                </p>
                <p className="text-gray-400 text-sm sm:text-base line-clamp-2 mt-1 sm:mt-2">
                  {course.courseDescription}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-3 sm:mt-0 w-full sm:w-1/4 flex flex-col items-start sm:items-center">
              <p className="text-sm sm:text-base text-gray-300 mb-1">
                {course.progressPercentage || 0}%
              </p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="10px"
                isLabelVisible={false}
                bgColor="#22c55e"
                baseBgColor="#374152"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default EnrolledCourses

