import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import NoCourse from "./NoCourse";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./../../components/LoginRegister/Loading";

const MyCourses = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);

  const id = userInfo?._id;
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          history("/"); // Navigate to "/" route if id is not available
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await fetch(
          `http://localhost:5000/api/coursefetch/${id}`,
          config
        );
        const result = await response.json();

        if (result && result.length > 0) {
          setDetails(result);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, history, userInfo]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid">
      {details.length === 0 ? (
        <NoCourse />
      ) : (
        details.map((course) => (
          <Link
            to={`/course/module/${course._id}/${course.courseName}`}
            key={course._id}
          >
            <CourseCard
              thumbnail={course.courseThumbnail}
              courseName={course.courseName}
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default MyCourses;
