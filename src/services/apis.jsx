const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("BASE_URL:", BASE_URL);


export const categories = {
    CATEGORIES_API: BASE_URL + "/showAllCategory",
    LOGIN_API:BASE_URL + "/login",
    SIGNUP_API:BASE_URL + "/signup",
    GET_USER_DETAILS:BASE_URL + "/getUserDetails",
    UPDATE_PROFILE:BASE_URL + "/updateProfile",
    GET_ENROLLED_COURSES:BASE_URL + "/getEnrolledCourses",
    GET_COURSE_CATEGORIES:BASE_URL + "/showAllCategory",
    ADD_COURSE:BASE_URL + "/createCourse",
    UPDATE_SECTION:BASE_URL + "/updateSection",
    CREATE_SECTION:BASE_URL + "/createSection",
    CREATE_SUBSECTION:BASE_URL +"/createSubSection",
    PUBLISH_COURSE:BASE_URL + "/publishCourse",
    INSTRUCTOR_COURSES:BASE_URL+ "/instructor-courses",
    DELETE_COURSE:BASE_URL+"/deleteCourse",
    CATEGORY_PAGE_DETAILS:BASE_URL+"/getCategoryPageDetails",
    GET_COURSE_DETAILS: BASE_URL+ "/getCourseDetails",
};
