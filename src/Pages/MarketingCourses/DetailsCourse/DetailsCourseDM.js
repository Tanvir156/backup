import React, { useState, useEffect } from "react";
import FinalCourseCard from "./../../../components/CourseDetails/FinalCourseCard";
import FinalCourseDetails from "./../../../components/CourseDetails/FinalCourseDetails";
import { useParams } from "react-router-dom";
import Loading from "./../../../components/LoginRegister/Loading";
import { format, parseISO, differenceInDays } from "date-fns";
const DetailsCourseDM = () => {
  const [details, setDetails] = useState("");

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/course/foredit/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setDetails(result);
      });
  }, []);
  const today = new Date();
  const parsedOrientationDate = parseISO(details.orientationDate);
  const difference = differenceInDays(parsedOrientationDate, today);

  return (
    <main>
      {details ? (
        <div className="CourseDetails2_courseDetails_container__mVx4H">
          <div className="Container-module_container__JMoiT">
            <div className="CourseDetails2_courseDetails__mov_7">
              <FinalCourseDetails
                courseName={details.courseName}
                orientationDate={details.orientationDate}
                batchNo={details.batchNo}
                classStartDate={details.classStartDate}
                classDays={details.classDays}
                classTime={details.classTime}
                demoClassLink={details.demoClassLink}
                id={details._id}
              />

              <div className="CourseDetails2_courseDetails_right__wASUl">
                <FinalCourseCard
                  courseIntroLink={details.courseIntroLink}
                  courseFee={details.courseFee}
                  discountedFee={details.discountedFee}
                  inputValues={details.inputValues}
                  id={details._id}
                  left={difference}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </main>
  );
};

export default DetailsCourseDM;
