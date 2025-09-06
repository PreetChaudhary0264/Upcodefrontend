import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import SubSectionModal from './SubSectionModal';
import SubSectionList from './SubSectionList'

const NestedView = () => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  return (
    <div className="mt-6">
      <div className="rounded-xl bg-gray-800 shadow-lg border border-gray-700">
        {course?.courseContent?.map((section, index) => {
          return (
            <div key={section._id} className="p-4">
              <details open className="group">
                <summary className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 transition">
                  <div className="flex items-center gap-3 text-white">
                    <RxDropdownMenu className="text-2xl text-yellow-400 group-open:rotate-90 transition-transform" />
                    <p className="font-medium text-lg">{section.sectionName}</p>
                  </div>

                  <button
                    onClick={() =>
                      setConfirmationModal({
                        sectionId: section._id,
                        sectionName: section.sectionName
                      })
                    }
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </summary>

                <button
                  className="ml-10 mt-4 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
                  onClick={() => setAddSubSection(section._id)}
                >
                  <IoIosAddCircleOutline className="text-xl" />
                  <p className="font-medium">Add Lecture</p>
                </button>

                {/* Subsections */}
                <div className="ml-10 mt-2">
                  <SubSectionList section={section} />
                </div>
              </details>

              {/* Divider between sections */}
              {index !== course.courseContent.length - 1 && (
                <div className="border-b border-gray-600 mt-4"></div>
              )}
            </div>
          )
        })}
      </div>

      {/* SubSection Modal */}
      {addSubSection && (
        <SubSectionModal
          sectionId={addSubSection}
          onClose={() => setAddSubSection(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-lg shadow-xl p-6 w-96 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-red-400">
              Delete Section "{confirmationModal.sectionName}"?
            </h2>
            <p className="text-sm text-gray-300 mb-6">
              This action cannot be undone. Are you sure you want to delete this section?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
                onClick={() => setConfirmationModal(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={() => {
                  console.log("Delete confirmed for:", confirmationModal.sectionId)
                  setConfirmationModal(null)
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NestedView




