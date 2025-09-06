import toast from "react-hot-toast";
import { categories } from "../apis";
import apiConnector from "../apiConnector";

export const addCourseDetails = async (formData, token) => {
  try {
    console.log("addCourse ka token",token);
    
    const response = await apiConnector(
      "POST",
      categories.ADD_COURSE,
      formData,
       { 
         Authorization: `Bearer ${token}`,
         "Content-Type": "multipart/form-data",
       }
    );

    console.log("addCourse api response", response);
    if (!response?.data?.success) {
      throw new Error("Could not add course details");
    }
    toast.success("Course details added successfully");
    return response
  } catch (error) {
    console.log("addCourse api error", error);
    toast.error(error.message);
    return null;
  }
};



