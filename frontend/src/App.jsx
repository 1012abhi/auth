import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUpForm from './pages/SignUp'
import EnrolledCoursesDashboard from './pages/EnrolledCoursesDashboard'
import CourseList from './components/CourseList'
import Home from './pages/Home'
import ViewCourse from './pages/ViewCourse'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import Logout from './pages/Logout'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
import VerifyEmailPrompt from './pages/VerifyEmailPrompt'
import OAuthSuccess from './pages/OAuthSuccess'
import MyAccount from './components/MyAccount'

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          } />
          <Route path="/profile" element={
            <UserProtectedWrapper>
              <MyAccount />
            </UserProtectedWrapper>
          } />
          <Route path="/logout" element={
            <UserProtectedWrapper>
              <Logout />
            </UserProtectedWrapper>
          }/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/coursesdashboard" element={
            <UserProtectedWrapper>
              <EnrolledCoursesDashboard />
            </UserProtectedWrapper>
          } />
          <Route path="/courseslist" element={<CourseList />} />
          <Route path="/viewcourse" element={
            <UserProtectedWrapper>
              <ViewCourse />
            </UserProtectedWrapper>
          } />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmailPrompt />} />
          <Route path="/verifyemail/:token" element={<VerifyEmail />} />
          <Route path="/oauthsuccess" element={<OAuthSuccess />} />
        </Routes>
    </>
  )
}

export default App
