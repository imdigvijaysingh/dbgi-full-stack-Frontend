import React from 'react'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import About from './pages/AboutUs'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import Admission from './pages/Admission'
import ContactUs from './pages/ContactUs'
import Placements from './pages/Placements'
import Career from './pages/Career'
import Academics from './pages/Academics'
import NotFoundPage from './pages/NotFoundPage'
import MainLayout from './components/MainLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/layout/AdminLayout'
import DashboardOverview from './pages/admin/DashboardOverview'
import TestimonialsManager from './pages/admin/TestimonialsManager'
import NoticesManager from './pages/admin/NoticesManager'
import AffiliationsManager from './pages/admin/AffiliationsManager'
import StudentsManager from './pages/admin/StudentsManager'
import MediaLibrary from './pages/admin/MediaLibrary'
import Users from './pages/admin/Users'
import MyProfile from './pages/admin/MyProfile'
import HelpSupport from './pages/admin/HelpSupport'
import CampusLifePage from './pages/CampusLifePage'
import StudentLogin from './pages/erp/StudentLogin'
import StudentSignup from './pages/erp/StudentSignup'
import StudentDashboard from './pages/erp/StudentDashboard'
import ErpNotificationsManager from './pages/admin/ErpNotificationsManager'
import ErpAssignmentsManager from './pages/admin/ErpAssignmentsManager'
import ErpStudyMaterialsManager from './pages/admin/ErpStudyMaterialsManager'

const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/pages/about-us' element={<About />} />
          <Route path='/pages/admission' element={<Admission />} />
          <Route path='/pages/courses' element={<Courses />} />
          <Route path='/pages/course/:slug' element={<CourseDetails />} />
          <Route path='/pages/academics' element={<Academics />} />
          <Route path='/pages/contact-us' element={<ContactUs />} />
          <Route path='/pages/placements' element={<Placements />} />
          <Route path='/pages/career' element={<Career />} />
          <Route path='/pages/campus-life' element={<CampusLifePage />} />
        </Route>
        
        {/* Admin Routes without MainLayout */}
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* ERP Routes without MainLayout */}
        <Route path='/erp/login' element={<StudentLogin />} />
        <Route path='/erp/signup' element={<StudentSignup />} />
        <Route path='/erp/dashboard' element={<StudentDashboard />} />
        
        {/* Admin CMS Layout Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<DashboardOverview />} />
          <Route path='testimonials' element={<TestimonialsManager />} />
          <Route path='notices' element={<NoticesManager />} />
          <Route path='affiliations' element={<AffiliationsManager />} />
          <Route path='students' element={<StudentsManager />} />
          <Route path='erp-notifications' element={<ErpNotificationsManager />} />
          <Route path='erp-assignments' element={<ErpAssignmentsManager />} />
          <Route path='erp-study-materials' element={<ErpStudyMaterialsManager />} />
          <Route path='media' element={<MediaLibrary />} />
          <Route path='users' element={<Users />} />
          <Route path='profile' element={<MyProfile />} />
          <Route path='help' element={<HelpSupport />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App