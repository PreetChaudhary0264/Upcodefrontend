import apiConnector from "../apiConnector"
import { categories } from "../apis"
import toast from "react-hot-toast"

export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", categories.GET_COURSE_CATEGORIES)

    console.log("Course Categories Response:", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch course categories")
    }

    result = response?.data?.allCategory || []
  } catch (error) {
    console.error("Course categories API error:", error)
    toast.error(error?.response?.data?.message || error.message || "Something went wrong")
  }
  return result
}

export const updateSection = async(data,token) =>{
  let result = null;
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST",categories.UPDATE_SECTION,data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if(!response?.data?.success){
      throw new Error("could not update section")
    }
    toast.success("Course section updated")
    result = response?.data?.data
  } catch (error) {
    console.log("Update section api res",error);
    toast.error(error.message);
  }
  toast.dismiss(toastId)
  return result;
}


export const createSection = async(data,token) =>{
  // const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST",categories.CREATE_SECTION,data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if(!response?.data?.success){
      throw new Error("could not create section")
    }
    toast.success("Course section created")
    
    return response.data.updatedCourseDetails;
  } catch (error) {
    console.log("create section api res",error);
    toast.error(error.message);
    return null;
  }
  // toast.dismiss(toastId)
  
}


export const createSubSection = async (formData, token) => {
  const toastId = toast.loading("Uploading Subsection...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      categories.CREATE_SUBSECTION,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("CREATE SUBSECTION RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Subsection created successfully");
    result = response.data.updatedSection; // backend se yahi aa raha hai
  } catch (error) {
    console.error("CREATE SUBSECTION ERROR:", error);
    toast.error(error.response?.data?.message || "Failed to create subsection");
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchInstructorCourses = async (token) => {
  const toastId = toast.loading("Fetching Courses...")
  let result = null
  try {
    result = await apiConnector(
      "GET",
      categories.INSTRUCTOR_COURSES,
      null, // GET me body nahi hoti
      {
        Authorization: `Bearer ${token}`,
      }
    )

    toast.success("Courses fetched")
    return result.data.data
  } catch (error) {
    console.log("FETCH INSTRUCTOR COURSES ERROR:", error)
    toast.error("Could not fetch courses")
  } finally {
    toast.dismiss(toastId)
  }
}


export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Deleting Course...")
  try {
    const response = await apiConnector("DELETE", categories.DELETE_COURSE + `/${courseId}`, null, {
      Authorization: `Bearer ${token}`,
    })
    toast.success("Course deleted successfully")
    return response?.data
  } catch (error) {
    toast.error("Could not delete course")
    console.error(error)
  } finally {
    toast.dismiss(toastId)
  }
}


export const getCatalogPageDetails = async (categoryId) => {
  console.log("Api ke ander ki categoryId",categoryId);
  
  let result = null;
  try {
    const response = await apiConnector("POST", categories.CATEGORY_PAGE_DETAILS, {
      categoryId,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch category data");
    }

    result = response.data.data; 
  } catch (error) {
    console.error("GET_CATALOG_PAGE_API ERROR:", error);
    throw error;
  }
  return result;
};

export default function GetAvgRating(ratingArr = []) {
  if (ratingArr.length === 0) return 0;

  const totalReviewCount = ratingArr.reduce((acc, curr) => acc + (curr.rating || 0), 0);

  const multiplier = 10; // 1 decimal place
  const avgReviewCount = Math.round((totalReviewCount / ratingArr.length) * multiplier) / multiplier;

  return avgReviewCount;
}


