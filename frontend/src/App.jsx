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
import AdmintLayout from './Admin/AdminLayout'
import Users from './Admin/Users'
import UserTable from './Admin/UserTable'
import AdminCourseManagement from './Admin/AdminCourseManagement'
import AdminPurchasedCourses from './Admin/AdminPurchasedCourses';
import AdminDashboard from './Admin/AdminDashboard';
import PurchaseUserPage from './Admin/PurchaseUserPage'

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
        } />
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

        {/* <Route path="/admin" element={<AdminPanel />} /> */}
        {/* <Route path="/userlist" element={<UsersList />} /> */}
        <Route path='/admin' element={<AdmintLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/userlist" element={<Users />} />
          <Route path="/admin/usertable" element={<UserTable />} />
          <Route path="/admin/course" element={<AdminCourseManagement />} />
          <Route path="/admin/purchased-courses" element={<AdminPurchasedCourses />} />
          <Route path="/admin/purchased-courses/:courseId" element={<PurchaseUserPage />} />
          <Route path="activity" element={<div>Activity Component</div>} />
          <Route path="hr-dashboard" element={<div>HR Dashboard Component</div>} />
          <Route path="holidays" element={<div>Holidays Component</div>} />
          <Route path="events" element={<div>Events Component</div>} />
          <Route path="activities" element={<div>Activities Component</div>} />
          <Route path="hr-social" element={<div>HR Social Component</div>} />
          <Route path="employees" element={<div>Employees Component</div>} />
          <Route path="accounts" element={<div>Accounts Component</div>} />
          <Route path="payroll" element={<div>Payroll Component</div>} />
          <Route path="report" element={<div>Report Component</div>} />
        </Route>
        {/* <Route path='/sidebar' element={<Sidebar />}/> */}
      </Routes>
    </>
  )
}

export default App
