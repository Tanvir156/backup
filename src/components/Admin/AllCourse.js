import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseDetailsCard from "./../../components/CourseDetails/CourseDetailsCard";
const AllCourse = () => {
  const [details, setDetails] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/course/allcourses")
      .then((res) => res.json())
      .then((result) => {
        setDetails(result);
      });
  }, []);
  return (
    <div className="grid">
      {Array.isArray(details) ? (
        details.map((details) => (
          <Link key={details._id} to={`/coursedetails/${details._id}`}>
            <CourseDetailsCard
              thumbnail={details.courseThumbnail}
              amount={details.courseFee}
              courseName={details.courseName}
              batchNo={details.batchNo}
              dayLeft="20"
              discountAmount={details.discountedFee}
              id={details._id}
            />
          </Link>
        ))
      ) : (
        <>
          <CourseDetailsCard courseName="No Course Yet" />
        </>
      )}
    </div>
  );
};

export default AllCourse;
