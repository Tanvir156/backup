import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import "./courses.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddCourse from "./AddCourse";
import axios from "axios";

import { useSelector } from "react-redux";
function Courses() {
  const [activeTab, setActiveTab] = useState("hot-jobs");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const [courses, setCourses] = useState("");
  const [professionalCourse, setProfessionalCourse] = useState("");
  const [academicCourse, setAcademicCourse] = useState("");
  const [skilldevelopment, setSkilldevelopment] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/course/type");
      const profession = response.data.filter(
        (course) => course.courseType === "Professional"
      );
      const academi = response.data.filter(
        (course) => course.courseType === "Academic"
      );
      const skill = response.data.filter(
        (course) => course.courseType === "Skill Development"
      );
      setProfessionalCourse(profession);
      setAcademicCourse(academi);
      setSkilldevelopment(skill);
    } catch (error) {
      console.error(error);
      // Retry after a delay of 1 second
      setTimeout(fetchCourses, 1000);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="tr-job-posted section-padding style_wrapper__T_7Nt">
      <div className="container" style={{ paddingBottom: "100px" }}>
        <div className="job-tab text-center">
          <ul
            className="nav nav-tabs justify-content-center style_head__VD5_v"
            role="tablist"
          >
            <h1 style={{ color: "#fff" }}>OUR COURSES</h1>
            <div className="tabss">
              <li
                className={`nav-item ${
                  activeTab === "hot-jobs" ? "active" : ""
                }`}
              >
                <p
                  className={`nav-link ${
                    activeTab === "hot-jobs" ? "active show" : ""
                  }`}
                  onClick={() => handleTabClick("hot-jobs")}
                >
                  Professional
                </p>
              </li>
              <li
                className={`nav-item ${
                  activeTab === "recent-jobs" ? "active" : ""
                }`}
              >
                <p
                  className={`nav-link ${
                    activeTab === "recent-jobs" ? "active show" : ""
                  }`}
                  onClick={() => handleTabClick("recent-jobs")}
                >
                  Academic
                </p>
              </li>
              <li
                className={`nav-item ${
                  activeTab === "popular-jobs" ? "active" : ""
                }`}
              >
                <p
                  className={`nav-link ${
                    activeTab === "popular-jobs" ? "active show" : ""
                  }`}
                  onClick={() => handleTabClick("popular-jobs")}
                >
                  Skill Development
                </p>
              </li>
            </div>
          </ul>
          <div className="tab-content text-left">
            <div
              className={`tab-pane fade ${
                activeTab === "hot-jobs" ? "active show" : ""
              }`}
              id="hot-jobs"
            >
              <div className="tab-content text-left">
                <div
                  role="tabpanel"
                  className="tab-pane fade active show"
                  id="hot-jobs"
                >
                  <div className=" style_body___vNmP">
                    {professionalCourse ? (
                      professionalCourse.map((course) => (
                        <Link to={`/course/${course._id}`}>
                          <CourseCard
                            key={course.id}
                            courseBio={course.courseBio}
                            tittle={course.courseName}
                            icon={course.courseIcon}
                          />
                        </Link>
                      ))
                    ) : (
                      <>
                        <AddCourse tittle="Loading..." />
                      </>
                    )}

                    {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                      <Link to="/uploadcoursetype">
                        <AddCourse tittle="Add Category" icon={<AddIcon />} />
                      </Link>
                    ) : (
                      <>
                        <div></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "recent-jobs" ? "active show" : ""
              }`}
              id="recent-jobs"
            >
              <div className=" style_body___vNmP">
                {academicCourse ? (
                  academicCourse.map((course) => (
                    <Link to={`/course/${course._id}`}>
                      <CourseCard
                        key={course.id}
                        courseBio={course.courseBio}
                        tittle={course.courseName}
                        icon={course.courseIcon}
                      />
                    </Link>
                  ))
                ) : (
                  <>
                    <AddCourse tittle="Loading..." />
                  </>
                )}

                {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                  <Link to="/uploadcoursetype">
                    <AddCourse tittle="Add Category" icon={<AddIcon />} />
                  </Link>
                ) : (
                  <>
                    <div></div>
                  </>
                )}
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "popular-jobs" ? "active show" : ""
              }`}
              id="popular-jobs"
            >
              <div className=" style_body___vNmP">
                {skilldevelopment ? (
                  skilldevelopment.map((course) => (
                    <Link to={`/course/${course._id}`}>
                      <CourseCard
                        key={course.id}
                        courseBio={course.courseBio}
                        tittle={course.courseName}
                        icon={course.courseIcon}
                      />
                    </Link>
                  ))
                ) : (
                  <>
                    <AddCourse tittle="Loading..." />
                  </>
                )}
                {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                  <Link to="/uploadcoursetype">
                    <AddCourse tittle="Add Category" icon={<AddIcon />} />
                  </Link>
                ) : (
                  <>
                    <div></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
