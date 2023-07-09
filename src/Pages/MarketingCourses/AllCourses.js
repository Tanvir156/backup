import React, { useState, useEffect } from "react";
import CourseTittle from "./../../components/CourseDetails/CourseTittle";
import CourseDetailsCard from "./../../components/CourseDetails/CourseDetailsCard";
import { Link } from "react-router-dom";
import Instructor from "./../../components/CourseDetails/Instructor";
import { useLocation, useParams } from "react-router-dom";
import { parseISO, differenceInDays } from "date-fns";

const AllCourses = () => {
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);
  const [typedetails, setTypeDetails] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsRes, typeDetailsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/course/${id}`).then((res) =>
            res.json()
          ),
          fetch(`http://localhost:5000/api/course/type/details/${id}`).then(
            (res) => res.json()
          ),
        ]);

        setDetails(detailsRes);
        setTypeDetails(typeDetailsRes);
      } catch (error) {
        // Handle error here
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const today = new Date();

  const renderCourseDetailsCards = () => {
    if (Array.isArray(details) && details.length > 0) {
      return details.map((detail) => {
        const parsedOrientationDate = parseISO(detail.orientationDate);
        const difference = differenceInDays(parsedOrientationDate, today);

        return (
          <Link key={detail._id} to={`/coursedetails/${detail._id}`}>
            <CourseDetailsCard
              thumbnail={detail.courseThumbnail}
              amount={detail.courseFee}
              courseName={detail.courseName}
              batchNo={detail.batchNo}
              dayLeft={difference}
              discountAmount={detail.discountedFee}
              id={detail._id}
            />
          </Link>
        );
      });
    } else {
      return <CourseDetailsCard courseName="No Course Yet" />;
    }
  };

  return (
    <div className="w_100 mb_2">
      <div className="CategoryDetailsV3_categoryDetails__oC_RN">
        <div className="CategoryDetailsV3_categoryDetails_content__ikhFS">
          <div className="Container-module_container__JMoiT">
            <div className="grid" style={{ marginBottom: "40px" }}>
              <CourseTittle
                courseName={typedetails.courseName}
                courseBio={typedetails.inspiringBio}
                companynum={typedetails.hiringCompany}
                jobOpening={typedetails.jobCount}
                remoteJob={typedetails.remoteJobCount}
                id={id}
              />
              {renderCourseDetailsCards()}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Instructor />
      </div>
    </div>
  );
};

export default AllCourses;
