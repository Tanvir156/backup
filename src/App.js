import React from "react";
import Frontpage from "./Pages/ForntPage/Frontpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Frontpage/Navbar/Navbar";
import Footer from "./components/Frontpage/Footer/Footer";

import AllCourses from "./Pages/MarketingCourses/AllCourses";
import DetailsCourseDM from "./Pages/MarketingCourses/DetailsCourse/DetailsCourseDM";
import RegisterScreen from "./Pages/LoginRegister/RegisterScreen/RegisterScreen";
import LoginScreen from "./Pages/LoginRegister/LoginScreen/LoginScreen";
import ForgotPass from "./Pages/LoginRegister/LoginScreen/ForgotPass";
import ResetPassword from "./Pages/LoginRegister/LoginScreen/ResetPass";
import Payment from "./Pages/PaymentPage/Payment";
import CourseForm from "./Pages/UploadCourse/CourseForm";
import EditCourse from "./Pages/EditCourse/EditCourse";
import UploadCourseType from "./Pages/UploadCourseType/UploadCourseType";
import { useSelector } from "react-redux";
import SuccessfullPayment from "./Pages/PaymentResult/SuccessfullPayment";
import FailPayment from "./Pages/PaymentResult/FailPayment";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import ModulePage from "./Pages/ModulePage/ModulePage";
import ModuleUpdate from "./Pages/VideoUpload/ModulUpdate";
import InstructorUpload from "./Pages/InstructorUpload/InstructorUpload";
import Admin from "./Pages/Admin/Admin";
import ModuleUpload from "./Pages/VideoUpload/ModuleUpload";
import EditCategoriesCard from "./Pages/UploadCourseType/EditCourseType";
function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const isAdmin = userInfo && userInfo.email === "rana525203@gmail.com";
  const showNavbar = window.location.pathname !== "/dashboard"; // Check if the current path is not "/dashboard"

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Frontpage />} />

        {isAdmin && <Route path="/uploadcourses" element={<CourseForm />} />}
        {isAdmin && (
          <Route path="/uploadcourses/:id" element={<CourseForm />} />
        )}
        {isAdmin && (
          <Route path="/uploadcoursetype" element={<UploadCourseType />} />
        )}
        <Route path="/coursedetails/:id" element={<DetailsCourseDM />} />
        {isAdmin && <Route path="/editcourse/:id" element={<EditCourse />} />}

        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/forgotpassword/:id/:token" element={<ResetPassword />} />
        <Route path="/course/:id" element={<AllCourses />} />
        <Route
          path="/successpayment/:trans_id"
          element={<SuccessfullPayment />}
        />
        <Route path="/failpayment" element={<FailPayment />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        {isAdmin && (
          <Route
            path="/uploadcoursevideo/:id/:courseName"
            element={<ModuleUpload />}
          />
        )}
        {isAdmin && (
          <Route
            path="/module/update/:id/:courseName"
            element={<ModuleUpdate />}
          />
        )}
        {isAdmin && (
          <Route path="/instructor/upload" element={<InstructorUpload />} />
        )}
        {isAdmin && (
          <Route path="/editcoursetype/:id" element={<EditCategoriesCard />} />
        )}
        <Route path="/course/module/:id/:courseName" element={<ModulePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
