import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setEditCourse, setStep, setCourse } from '../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection } from '../../services/operations/courseDetailsApi';
import { updateSection } from '../../services/operations/courseDetailsApi';
import NestedView from './NestedView';

const BuilderForm = () => {

    const{register,handleSubmit,setValue,formState:{errors} }= useForm();
    const [editSectionname,setEditSectionName] = useState(null);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth)
    const {course} = useSelector((state)=>state.course)
    
    const courseId = course?._id || localStorage.getItem("courseId"); //  always resolve

    function goBack(){
       dispatch(setStep(1));
    //    dispatch(setEditCourse(true))
    }
    function goToNext(){
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one section")
            return;
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Please add atleast on lecture in each section")
            return;
        }

        dispatch(setStep(3))
    }
    if (!courseId) {
       toast.error("Course not found. Please save course info first.");
       return;
    }

    const onSubmit = async(data) =>{
        setLoading(true)
        let result;

        if(editSectionname){
            result = await updateSection(
                {
                    sectionName:data.sectionName,
                    sectionId:editSectionname,
                    courseId:course._id,
                }, token,
            )
        }else{
            // console.log("Course from redux:", course);
            // console.log("CourseId in localStorage:", localStorage.getItem("courseId"));

            //create section
            result = await createSection(
                {
                    sectionName:data.sectionName,
                    courseId:course?._id,
                }, token,
            )
            console.log("Section response",result);
            
             //update values
            if(result){
             dispatch(setCourse(result))
             setEditSectionName(null);
             setValue("sectionName", "")  // clear input
            }
        }
        setLoading(false);
    }
    

  return (
    <div className="text-white min-h-[calc(100vh-15rem)] px-4 sm:px-6 lg:px-8">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-gray-800 p-6 rounded-md w-full max-w-4xl mx-auto space-y-6 border border-gray-700"
  >
    <div>
      <label htmlFor="sectionName">
        Section Name<sup className="text-red-800">*</sup>
      </label>
      <input
        id="sectionName"
        placeholder="Add Section Name"
        {...register("sectionName", { required: true })}
        className="w-full text-white bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      {errors.sectionName && (
        <span className="text-red-500 text-sm">Section Name is Required</span>
      )}
    </div>

    <div>
      <button
        className="flex gap-1 items-center bg-yellow-500 text-gray-900 font-semibold px-3 py-2 rounded-md hover:bg-yellow-600 transition"
        type="submit"
      >
        {editSectionname ? (
          "Edit Section Name"
        ) : (
          <>
            Create Section <IoIosAddCircleOutline className="text-2xl" />
          </>
        )}
      </button>
    </div>

    {course?.courseContent?.length > 0 && <NestedView />}
  </form>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mt-4">
    <button
      onClick={goBack}
      className="bg-gray-400 text-gray-900 font-semibold px-3 py-2 rounded-md hover:bg-gray-500 transition"
    >
      Back
    </button>
    <button
      onClick={goToNext}
      className="bg-yellow-500 text-gray-900 font-semibold px-3 py-2 rounded-md hover:bg-yellow-600 transition"
    >
      Next
    </button>
  </div>
</div>

  )
}

export default BuilderForm
