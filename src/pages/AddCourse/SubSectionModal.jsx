import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../slices/courseSlice'
import { RxCross2 } from "react-icons/rx";
import { createSubSection } from '../../services/operations/courseDetailsApi'

const SubSectionModal = ({ sectionId, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {course} = useSelector((state)=>state.course)

  console.log("Course from Redux:", course)


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      formData.append("title", data.lectureTitle);
      formData.append("description", data.lectureDesc);
      formData.append("timeDuration", data.timeDuration); 
      formData.append("videoFile", data.lectureVideo[0]);

      setLoading(true);
      const result = await createSubSection(formData, token);

      if (result) {
           console.log("Result from API:", result);
  const updatedSection = result; //  API already returns section

  const prevSections = course?.courseContent || [];

  const newSections = prevSections.map(section =>
    section._id === updatedSection._id ? updatedSection : section
  );

  dispatch(setCourse({ ...course, courseContent: newSections }));
      }
      onClose(); 
    } catch (error) {
      console.error("Error while adding subsection:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* transparent/blur background */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* modal box */}
      <div className="relative bg-white text-black rounded-lg shadow-lg p-6 w-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Add Lecture</p>
          <button onClick={onClose}>
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Form content (no <form> tag here) */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Lecture Video</label>
            <input
              type="file"
              accept="video/*"
              {...register("lectureVideo", { required: true })}
              className="w-full border p-2 rounded-md"
            />
            {errors.lectureVideo && (
              <span className="text-red-500 text-sm">
                Lecture Video is required
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Lecture Title</label>
            <input
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full border p-2 rounded-md"
            />
            {errors.lectureTitle && (
              <span className="text-red-500 text-sm">
                Lecture Title is required
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Lecture Description</label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full border p-2 rounded-md min-h-[120px]"
            />
            {errors.lectureDesc && (
              <span className="text-red-500 text-sm">
                Lecture Description is required
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Time Duration (in mins)</label>
            <input
              type="number"
              id="timeDuration"
              placeholder="Enter Duration"
              {...register("timeDuration", { required: true })}
              className="w-full border p-2 rounded-md"
            />
            {errors.timeDuration && (
              <span className="text-red-500 text-sm">
                Duration is required
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubSectionModal;




