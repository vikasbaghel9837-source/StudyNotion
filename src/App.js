import "./App.css";
import {Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./Components/common/Navbar"
import OpenRoute from "./Components/core/Auth/openRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/forgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs"
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import { ACCOUNT_TYPE } from "./utils/constants";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state)=> state.profile)

  return (
    <div className="bg-richblack-900 w-screen min-h-screen flex flex-col font-inter ">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/signup" element={
          <OpenRoute>
            <Signup></Signup>
          </OpenRoute>
        } />

        <Route path="/login" element={
          <OpenRoute>
            <Login></Login>
          </OpenRoute>
        } />

        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword></ForgotPassword>
          </OpenRoute>
        } />

        <Route path="/update-password/:token" element={
          <OpenRoute>
            <UpdatePassword/>
          </OpenRoute>
        } />

        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        } />

        <Route path="/about" element={
          <OpenRoute>
            <AboutUs/>
          </OpenRoute>
        } />

        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          // <Route path="dashboard/my-profile" element={<MyProfile />} />
          {/* // <Route path="dashboard/Settings" element={<Settings />} />/ */}
          

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              {/* <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} /> */}
              </>
            )
          }


        </Route>
        

      </Routes>
    </div>
  );
}

export default App;
