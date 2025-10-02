import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import GetStarted from "./Pages/GetStarted.jsx";
import LoginPage from "./Pages/Login.jsx";
import AdminDashbord from "./Pages/AdminDashbord.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import StudentDashbord from "./Pages/StudentDashbord.jsx";
import CourseDetails from "./Pages/CourseDetails.jsx"
import StudentCourseDetails from "./Pages/StudentCourseDetails"
import StudentCertificate from "./Pages/StudentCertificate"
import "./App.css";

  


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> 
        < Route path="/" element={<HomePage/>}/>
        < Route path="/first" element={<GetStarted/>}/>
        < Route path="/landing" element={<LandingPage/>}/>
        < Route path="/get-started" element={<GetStarted/>}/>
        <Route path="/Admin/Dashbord" element={<AdminDashbord/>}/>
    <Route path="/Login" element={<LoginPage/>}/>
        < Route path="/Register/Page" element={<RegisterPage/>}/>
        <Route path="/Student/Dashbord" element={<StudentDashbord/>}/>
        <Route path="/Courses/:id" element={<CourseDetails/>}/>
        <Route path="/student/courses/:id" element={<StudentCourseDetails />} />
<Route path="/Student/Certificate/:id" element={<StudentCertificate />} />

        

      </Routes>
     </BrowserRouter>
  </StrictMode> 
);