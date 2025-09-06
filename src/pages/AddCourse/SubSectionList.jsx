import React from "react"

const SubSectionList = ({ section }) => {
  return (
    <div className="ml-8 mt-2">
      {section?.subSection?.length > 0 ? (
        section.subSection.map((sub) => (
          <div
            key={sub._id}
            className="bg-gray-600 text-white rounded-lg p-3 my-2 mx-2 flex flex-col"
          >
            <p className="font-semibold text-lg">{sub.title}</p>
            <p className="text-sm text-gray-300">{sub.description}</p>
            <p className="text-sm text-yellow-400">
              Duration: {sub.timeDuration}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 italic">No lectures yet.</p>
      )}
    </div>
  )
}

export default SubSectionList
