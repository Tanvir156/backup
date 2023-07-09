import React from "react";
import "./CourseDetails.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
const CourseCard = ({
  courseName,
  courseBio,
  companynum,
  jobOpening,
  remoteJob,
  id,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className="style_header__cjAUc">
      <div className="flex gap_1">
        <img
          alt=""
          className="style_head_icon__a3MzR"
          src="https://cdn.ostad.app/public/upload/2023-05-06T09-18-10.793Z-icon-stage.png"
        />
        <p className="style_head_title__Wpchc">{courseName}</p>
        {userInfo && userInfo.email === "rana525203@gmail.com" ? (
          <Link to={`/uploadcourses/${id}`}>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "5px" }}
            >
              Add Course
            </Button>
          </Link>
        ) : (
          <>
            <div></div>
          </>
        )}
      </div>
      <p className="body_paragraph text_black_80">{courseBio}</p>
      <div className="flex gap_0_5">
        <div
          className="Tags-module_tags__n4i1K"
          style={{
            backgroundColor: "rgb(233, 239, 255)",
            color: "rgb(5, 4, 0)",
            padding: "3px 6px",
            borderRadius: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            border: "1px solid rgb(218, 228, 255)",
          }}
        >
          <img
            alt=""
            width="16"
            height="16"
            src="https://cdn.ostad.app/public/upload/2023-05-06T09-50-26.996Z-icon-briefcase.svg"
          />
          <p
            className="Tags-module_tags_text__-u2Tl"
            style={{
              fontSize: "11px",
              margin: "0px",
              whiteSpace: "nowrap",
            }}
          >
            {companynum} Companies hiring BD
          </p>
        </div>
        <div
          className="Tags-module_tags__n4i1K"
          style={{
            backgroundColor: "rgb(246, 254, 249)",
            color: "rgb(5, 4, 0)",
            padding: "3px 6px",
            borderRadius: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            border: "1px solid rgb(209, 250, 223)",
          }}
        >
          <img
            width="16"
            height="16"
            alt=""
            src="https://cdn.ostad.app/public/upload/2023-05-06T09-52-33.930Z-icon-global.svg"
          />
          <p
            className="Tags-module_tags_text__-u2Tl"
            style={{
              fontSize: "11px",
              margin: "0px",
              whiteSpace: "nowrap",
            }}
          >
            {jobOpening} Job Openings
          </p>
        </div>
        <div
          className="Tags-module_tags__n4i1K"
          style={{
            backgroundColor: "rgb(255, 241, 233)",
            color: "rgb(5, 4, 0)",
            padding: "3px 6px",
            borderRadius: "20px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            border: "1px solid rgb(255, 232, 219)",
          }}
        >
          <img
            width="16"
            height="16"
            alt=""
            src="https://cdn.ostad.app/public/upload/2023-05-06T09-52-58.898Z-icon-remote.svg"
          />
          <p
            className="Tags-module_tags_text__-u2Tl"
            style={{
              fontSize: "11px",
              margin: "0px",
              whiteSpace: "nowrap",
            }}
          >
            {remoteJob} Remote Jobs
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
