import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../slices/courseSlice'
import apiConnector from '../../services/apiConnector'
import { categories } from '../../services/apis'
import toast from 'react-hot-toast'

const PublishForm = ({ onBack }) => {
  const { register, handleSubmit } = useForm()
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await apiConnector(
        "POST",
        categories.PUBLISH_COURSE,
        { courseId: course._id },
        { Authorization: `Bearer ${token}` }
      )

      console.log("Publish result:", res)
      toast.success("Course Published Successfully");
      dispatch(resetCourseState())
      // navigate("/dashboard/my-courses")
    } catch (error) {
      console.error("Error while publishing course:", error)
      toast.error("Course Publication Failed")
    } finally {
      setLoading(false)
    }
  }

  // goBack function
  const goBack = () => {
    dispatch(setStep(2))
  }

  return (
    <div className="min-h-126 flex justify-center items-start py-8 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md rounded-md border bg-gray-800 p-6 border-gray-700">
    <p className="text-2xl text-yellow-400">Publish Course</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5">
        <label htmlFor="public" className="flex items-center gap-3">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-5 w-5 rounded border-gray-600 text-yellow-400 focus:ring-yellow-500 bg-gray-700"
          />
          <span className="text-white text-lg">Make this Course Public</span>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={goBack}
          className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition w-full sm:w-auto"
        >
          Back
        </button>

        {/* Publish Button */}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition disabled:opacity-50 w-full sm:w-auto"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default PublishForm


