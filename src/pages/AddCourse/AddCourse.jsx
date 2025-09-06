import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='bg-gray-900'>
       <div>
        <div>
            <h1 className='text-3xl font-semibold px-10 py-5 text-white'>Add Course</h1>
            <div>
                <RenderSteps/>
            </div>
        </div>

        {/* <div className='text-white'>
            <p> Code Upload Tips</p>
            <ul>
                <li>Set the course price option or make it free</li>
                <li>Standarad size for the course thumbnail is 1024*576</li>
                <li>Video section controls the course overview video</li>
            </ul>
        </div> */}



       </div>
    </div>
  )
}

export default AddCourse
