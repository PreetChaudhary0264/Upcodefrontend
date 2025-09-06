import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import apiConnector from "../services/apiConnector";
import { categories } from "../services/apis";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);

  // Fetch course details
  const getCourseDetails = async () => {
    try {
      const response = await apiConnector(
        "POST",
        categories.GET_COURSE_DETAILS,
        { courseId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        const courseData = response.data.courseDetails;
        setCourse(courseData);

        // default: first lecture
        if (
          courseData.courseContent?.length > 0 &&
          courseData.courseContent[0].subSection?.length > 0
        ) {
          setCurrentLecture(courseData.courseContent[0].subSection[0]);
        }
      }
    } catch (err) {
      console.log("Error fetching course details:", err);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, [courseId]);

  if (!course) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
  <div className="flex h-170 bg-gray-900 text-white overflow-hidden">
    {/* Video Player */}
    <div className="flex-1 p-6 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">{course.courseName}</h1>
      {currentLecture ? (
        <>
          <h2 className="text-lg mb-2">{currentLecture.title}</h2>
          <video
            key={currentLecture._id}
            src={currentLecture.videoUrl}
            controls
            className="w-full max-h-[70vh] rounded-lg bg-black"
          />
        </>
      ) : (
        <p>Select a lecture to start</p>
      )}
    </div>

    {/* Lecture Sidebar */}
    <div className="w-80 border-l border-gray-700 p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Lectures</h2>
      {course.courseContent.map((section) => (
        <div key={section._id} className="mb-4">
          <p className="text-yellow-400 font-medium">{section.sectionName}</p>
          <ul className="mt-2 space-y-2">
            {section.subSection.map((lec) => (
              <li
                key={lec._id}
                onClick={() => setCurrentLecture(lec)}
                className={`p-2 rounded cursor-pointer ${
                  currentLecture?._id === lec._id
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {lec.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);
};

export default CoursePlayer;




