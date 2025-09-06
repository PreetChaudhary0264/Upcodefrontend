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
    <div className="min-h-[calc(100vh-56px)] p-6 bg-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-white">Enrolled Courses</h2>

      {!enrolledCourses ? (
        <div className="text-gray-400">Loading ...</div>
      ) : !enrolledCourses.length ? (
        <p className="text-gray-400">You have not enrolled in any course yet</p>
      ) : (
        <div className="w-full">
          {/* Table Header */}
          <div className="grid grid-cols-3 font-semibold text-gray-200 bg-gray-800 px-4 py-3 rounded-t-lg">
            <p>Course Name</p>
            <p className="text-center">Duration</p>
            <p className="text-center">Progress</p>
          </div>

          {/* Cards */}
          <div className="divide-y divide-gray-700 bg-gray-900 rounded-b-lg">
            {enrolledCourses.map((course, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center px-4 py-4 hover:bg-gray-800 transition cursor-pointer"
                onClick={() => navigate(`/course/${course._id}`)} // 👈 navigate to course player
              >
                {/* Course Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-white">{course.courseName}</p>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {course.courseDescription}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="text-center text-gray-300">
                  {course?.totalDuration || "N/A"}
                </div>

                {/* Progress */}
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">
                    {course.progressPercentage || 0}%
                  </p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                    bgColor="#22c55e"
                    baseBgColor="#374151"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses

