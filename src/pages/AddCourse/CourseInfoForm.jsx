import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../services/operations/courseDetailsApi';
import { useForm } from "react-hook-form";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import toast from 'react-hot-toast';
import {setStep,setCourse } from '../../slices/courseSlice'
import {addCourseDetails} from '../../services/operations/addCourseDetails'
import Spinner from '../../components/core/Spinner'

const CourseInfoForm = () => {

   const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
   } = useForm();

   const dispatch = useDispatch();
   const {course,editCourse} = useSelector((state)=>state.course);
   const [loading,setLoading] = useState(false);
   const [courseCategories,setCourseCategories] = useState([]);
   const [tags, setTags] = useState([]);
   const [tagInput, setTagInput] = useState("");
   const {token} = useSelector((state)=>state.auth)
   const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState('');

      // console.log(localStorage.getItem("token"));
      const { step } = useSelector((state) => state.course)
      console.log("Redux course state:", useSelector((state) => state.course))



   useEffect(()=>{
    const getCategories = async()=>{
        setLoading(true);
        const categories = await fetchCourseCategories()
        if(categories.length > 0){
            setCourseCategories(categories)
        }
        setLoading(false);
    }

    if(editCourse){
        setValue("courseTitle",course.courseName)
        setValue("courseShortDes",course.courseDescription)
        setValue("coursePrice",course.price)
        setValue("courseTag",course.tag)
        setValue("courseBenefits",course.whatYouWillLearn)
        setValue("courseCategory",course.category)
        // setValue("courseRequirements",course.instructions)
        setValue("courseImage",course.thumbnail)
        setTags(course.tag || [])
    }

    getCategories()
   },[]);

   const handleAddTag = () => {
     if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
       const updatedTags = [...tags, tagInput.trim()];
       setTags(updatedTags);
       setValue("courseTag", updatedTags); // bind tags to form
       setTagInput("");
     }
   };

   const handleRemoveTag = (tagToRemove) => {
     const updatedTags = tags.filter(tag => tag !== tagToRemove);
     setTags(updatedTags);
     setValue("courseTag", updatedTags);
   };

   const isFormUpdated = ()=>{
      const currentValues = getValues();
      //baaki fields bhi likh lena
      if(currentValues.courseTitle !== course.courseName || 
         currentValues.courseShortDes !== course.courseDescription
      ){
        return true;
      }else{
        return false;
      }
    }

    const onSubmit = async(data)=>{
        // if(editCourse){
        //    if(isFormUpdated()){
        //     const currentValues = getValues();
        // const formData = new FormData();
        // formData.append("courseId",course._id);
        // //yhi same baaki sab ke liye bhi krdo
        // if(currentValues.courseTitle !== course.courseName){
        //     formData.append("courseName",data.courseTitle);
        // }

        // setLoading(true);
        // const result = await editCourseDetails(formData,token);
        // setLoading(false);
        // if(result){
        //     setStep(2);
        //     dispatch(setCourse(result));
        // }
        //    }else{
        //      toast.error("No changes made so far")
        //    }
        //    return;
        // }
        
        //create course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDes);
        formData.append("price", data.coursePrice);
        formData.append("category", data.courseCategory);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("tag", JSON.stringify(data.courseTag));
        const fileInput = document.getElementById('courseImage');
        if (fileInput && fileInput.files[0]) {
        formData.append("thumbnail", fileInput.files[0]);
        }



        setLoading(true)
        try {
            console.log("courseForm Token",token);      
            const result = await addCourseDetails(formData, token); // FormData bhej rahe ho

        const courseData = result?.data?.course; //  correct key
      if (result) {
    dispatch(setCourse(courseData));
    localStorage.setItem("courseId", courseData._id);
    console.log("course saved:", courseData);
    dispatch(setStep(2));
  } else {
    console.error("course missing in response:", result?.data);
  }
        } catch(err){
          console.error("Add course failed:", err);
          toast.error("Failed to add course");
          }
          setLoading(false);
    }

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Clear any previous errors
      setError('');
      
      // Create preview
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };
   const handleRemove = (e) => {
    e.stopPropagation();
    setThumbnailPreview(null);
    setError('');
    // Reset the file input
    document.getElementById('courseImage').value = '';
  };
  const handleUploadClick = () => {
    document.getElementById('courseImage').click();
  };

  return (
  <>
  {loading && <Spinner />}

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-gray-800 p-6 sm:p-8 rounded-2xl w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 shadow-lg border border-gray-700"
  >
    {/* Course Title */}
    <div className="flex flex-col">
      <label
        htmlFor="courseTitle"
        className="text-gray-200 font-semibold mb-2 tracking-wide uppercase text-sm"
      >
        Course Title <sup className="text-red-500">*</sup>
      </label>
      <input
        type="text"
        id="courseTitle"
        placeholder="Enter Course Title"
        {...register("courseTitle", { required: true })}
        className="w-full text-white bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      />
      {errors.courseTitle && (
        <span className="text-red-500 text-xs mt-1">
          Course Title is Required
        </span>
      )}
    </div>

    {/* Course Short Description */}
    <div className="flex flex-col">
      <label
        htmlFor="courseShortDes"
        className="text-gray-200 font-semibold mb-2 tracking-wide uppercase text-sm"
      >
        Course Short Description <sup className="text-red-500">*</sup>
      </label>
      <textarea
        id="courseShortDes"
        placeholder="Enter Description"
        {...register("courseShortDes", { required: true })}
        className="w-full text-white bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 min-h-[120px] sm:min-h-[140px] focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      />
      {errors.courseShortDes && (
        <span className="text-red-500 text-xs mt-1">
          Course Description is Required
        </span>
      )}
    </div>

    {/* Course Price */}
    <div className="flex flex-col">
      <label
        htmlFor="coursePrice"
        className="text-gray-200 font-semibold mb-2 tracking-wide uppercase text-sm"
      >
        Course Price <sup className="text-red-500">*</sup>
      </label>
      <div className="relative">
        <input
          type="number"
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className="w-full text-white bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />
        <RiMoneyRupeeCircleFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      {errors.coursePrice && (
        <span className="text-red-500 text-xs mt-1">
          Course Price is Required
        </span>
      )}
    </div>

    {/* Category */}
    <div className="flex flex-col">
      <label
        htmlFor="courseCategory"
        className="text-gray-200 font-semibold mb-2 tracking-wide uppercase text-sm"
      >
        Course Category <sup className="text-red-500">*</sup>
      </label>
      <select
        id="courseCategory"
        defaultValue=""
        {...register("courseCategory", { required: true })}
        onChange={(e) =>
          setValue("courseCategory", e.target.value, { shouldValidate: true })
        }
        className="w-full text-white bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      >
        <option value="" disabled>
          Choose a Category
        </option>
        {!loading &&
          courseCategories.map((category, index) => (
            <option key={index} value={category?._id}>
              {category?.name}
            </option>
          ))}
      </select>
      {errors.courseCategory && (
        <span className="text-red-500 text-xs mt-1">
          Course Category is Required
        </span>
      )}
    </div>

    {/* Tags */}
    <div className="flex flex-col">
      <label
        htmlFor="courseTag"
        className="text-gray-200 font-semibold mb-2 tracking-wide uppercase text-sm"
      >
        Tags <sup className="text-red-500">*</sup>
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          id="courseTag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Enter a tag"
          className="flex-1 text-white bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-yellow-600 transition shadow-md mt-2 sm:mt-0"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 text-xs text-red-700 font-bold hover:text-red-900 transition"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <input type="hidden" {...register("courseTag", { required: true })} />
      {errors.courseTag && (
        <span className="text-red-500 text-xs mt-1">
          At least one Tag is Required
        </span>
      )}
    </div>

    {/* Thumbnail */}
    <div className="flex flex-col">
      <label
        htmlFor="courseImage"
        className="text-gray-200 font-semibold mb-2 tracking-wide uppercase text-sm"
      >
        Course Thumbnail <sup className="text-red-500">*</sup>
      </label>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="courseImage"
        onChange={handleFileChange}
      />

      <div
        onClick={handleUploadClick}
        className="mt-2 w-full h-40 sm:h-52 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative hover:border-yellow-500 transition"
      >
        {thumbnailPreview ? (
          <>
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold hover:bg-red-700 transition"
            >
              ✕
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Click to upload</div>
            <div className="text-gray-500 text-xs">
              Supported formats: JPG, PNG, GIF
            </div>
          </div>
        )}
      </div>

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      {!thumbnailPreview && !error && (
        <span className="text-red-500 text-xs mt-1">Thumbnail is Required</span>
      )}
    </div>

    {/* Benefits */}
    <div className="flex flex-col">
      <label
        htmlFor="courseBenefits"
        className="text-gray-200 font-semibold mb-2 tracking-wide uppercase text-sm"
      >
        Benefits of the Course <sup className="text-red-500">*</sup>
      </label>
      <textarea
        id="courseBenefits"
        placeholder="Enter Benefits of the Course"
        {...register("courseBenefits", { required: true })}
        className="w-full text-white bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 min-h-[120px] sm:min-h-[140px] focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
      />
      {errors.courseBenefits && (
        <span className="text-red-500 text-xs mt-1">
          Benefits of the Course are Required
        </span>
      )}
    </div>

    {/* Submit */}
    <div className="flex flex-col sm:flex-row gap-4 justify-end">
      {editCourse && (
        <button
          onClick={() => dispatch(setStep(2))}
          className="bg-gray-700 text-white font-medium px-6 py-2 rounded-lg hover:bg-gray-600 transition shadow"
        >
          Continue without Saving
        </button>
      )}
      <button
        type="submit"
        className="bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-yellow-600 transition shadow-md"
      >
        Next
      </button>
    </div>
  </form>
</>

);

}

export default CourseInfoForm


