import "./App.css";
import {Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./Components/common/Navbar"
import OpenRoute from "./Components/core/Auth/openRoute"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/forgotPassword";
import UpdatePassword from "./pages/UpdatePassword";


function App() {
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

      </Routes>
    </div>
  );
}

export default App;
