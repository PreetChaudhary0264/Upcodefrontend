import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CourseInfoForm from './CourseInfoForm'
import BuilderForm from './BuilderForm'
import PublishForm from './PublishForm'

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course)

  const steps = [
    { id: 1, title: 'Course Information' },
    { id: 2, title: 'Course Builder' },
    { id: 3, title: 'Publish' },
  ]

  return (
    <>
      {/* Stepper numbers */}
      <div className="flex items-center justify-center gap-8">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300
                ${
                  step === item.id
                    ? 'bg-yellow-900 border-yellow-50 text-yellow-50'
                    : step > item.id
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-300'
                }`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>

            {/* dashes except after last step */}
            {index !== steps.length - 1 && (
              <div
                className={`h-[2px] w-16 ${
                  step > item.id ? 'bg-green-600' : 'bg-gray-600'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step titles */}
      <div className="mt-4 flex items-center justify-center gap-24">
        {steps.map((item) => (
          <div key={item.id}>
            <p
              className={`text-sm ${
                step === item.id ? 'text-yellow-400 font-semibold' : 'text-gray-400'
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Step forms */}
      <div className="mt-8">
        {step === 1 && <CourseInfoForm />}
        {step === 2 && <BuilderForm />}
        {step === 3 && <PublishForm />}
      </div>
    </>
  )
}

export default RenderSteps

