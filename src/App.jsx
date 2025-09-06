import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './pages/Navbar'
import MyProfile from './pages/MyProfile'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import EnrolledCourses from './pages/EnrolledCourses'
import AddCourse from './pages/AddCourse/AddCourse'
import MyCourses from './pages/MyCourses'
import Catalog from './pages/Catalog'
import BuyCourse from './pages/BuyCourse'
import PurchaseHistory from './pages/PurchaseHistory'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import CoursePlayer from './pages/CoursePlayer'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'


function App() {

  return (
    <>
      <div className=' min-h-screen flex flex-col font-inte'> 
        <Navbar/>
        <Routes>


           <Route path = "/" element={<Home/>}/>
           <Route path = "/login" element={<Login/>}/>
           <Route path = "/signup" element={<Signup/>}/>
           <Route path='catalog/:catalogName' element={<Catalog/>}/>
           <Route path='buy/:courseId' element={<BuyCourse/>}/>
           <Route path='contact' element={<ContactUs/>}/>
           <Route path='about' element={<AboutUs/>}/>
           <Route path="/course/:courseId" element={<CoursePlayer />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/update-password/:token" element={<UpdatePassword />} />

           {/* Dashboard Layout */}

           <Route path="/dashboard" element={<Dashboard />}>
               {/* Nested Routes */}
               <Route path="my-profile" element={<MyProfile />} />
               <Route path="settings" element={<Settings />} />
               <Route path="enrolled-Courses" element={<EnrolledCourses />} />
               <Route path="add-course" element={<AddCourse />} />
               <Route path="my-courses" element={<MyCourses />} />
               <Route path="purchase-history" element={<PurchaseHistory />} />
           </Route>
          
        </Routes>

      </div>
    </>
  )
}

export default App
