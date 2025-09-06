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
  <div className="mt-6 w-full px-8">
    <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-800">
      <Table className="w-full border-collapse">
        <Thead className="bg-gray-900 text-white">
          <Tr>
            <Th className="py-4 px-6 text-left font-semibold text-lg">Course</Th>
            <Th className="py-4 px-6 text-left font-semibold text-lg">Price</Th>
            <Th className="py-4 px-6 text-left font-semibold text-lg">Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td colSpan={3} className="text-center p-6 text-gray-300">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses.map((course, idx) => (
              <Tr
                key={course._id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition-colors`}
              >
                <Td className="p-4">
                  <div className="flex gap-4 items-start">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[120px] w-[200px] rounded-lg object-cover shadow-md"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-white text-lg">{course.courseName}</p>
                      <p className="text-sm text-gray-300">{course.courseDescription}</p>
                      <p className="text-xs font-medium text-pink-400 uppercase tracking-wide">
                        {course.status}
                      </p>
                    </div>
                  </div>
                </Td>

                <Td className="p-4 text-gray-200 font-medium">
                  ₹{course.price}
                </Td>

                <Td className="p-4 flex gap-3 mt-10">
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
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  </div>
);

}

export default CoursesTable



