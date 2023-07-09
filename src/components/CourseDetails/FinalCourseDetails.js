import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FinalCoursePlan from "./FinalCoursePlan";
import { format, parseISO } from "date-fns";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
const FinalCourseDetails = ({
  courseName,
  orientationDate,
  batchNo,
  classStartDate,
  classDays,
  classTime,
  demoClassLink,
  id,
}) => {
  const formattedDate = format(
    parseISO(orientationDate),
    "d MMM, yyyy 'at' ha"
  );

  return (
    <div className="CourseDetails2_courseDetails_left__RXCVw">
      <h1>{courseName}</h1>
      <p style={{ marginBottom: "1rem" }}>
        At the end of the program the mentality of earning at least 1 lakh
        rupees per month if not If so, then this program is not for you! How to
        earn income by learning to work- The best trainers in the country will
        give full guidelines live!
      </p>
      <div
        className="BookFreeOrientation_free_orientation_card__YE4ve"
        style={{ background: "rgb(255, 241, 233)" }}
      >
        <div className="flex gap_1">
          <img alt="" src="/images/orientation.svg" />
          <div>
            <span>Free Orientation Class</span>
            <div className="flex gap_0_2_5">
              <img
                alt=""
                width="16px"
                src="https://cdn.ostad.app//public/icons/calendar-2-line.svg"
              />
              <p className="BookFreeOrientation_free_orientation_card_date__esJd_">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
        <div className="BookFreeOrientation_button_container__nzrJ0">
          <button
            id="btn-free-book"
            type="button"
            className="Button-module_btn__Fx11X Button-module_blackPrimaryBtn__nSDPc"
            style={{
              borderRadius: "5px",
              color: "inherit",
              height: "40px",
              padding: "8px 24px",
              fontSize: "14px",
            }}
          >
            <div className="flex justify_center align_center gap_small">
              <p className="nowrap false">Free Book</p>
            </div>
          </button>
        </div>
      </div>
      <div className="CourseDetails2_batch_schedules__GRciw">
        <div className="BatchSchedule_batch_schedule_container__Ad9rw">
          <div className="flex justify_center">
            <div
              className="Tags-module_tags__n4i1K"
              style={{
                backgroundColor: "rgb(255, 140, 75)",
                color: "rgb(255, 255, 255)",
                padding: "3px 6px",
                borderRadius: "4px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                border: "0px solid rgb(102, 112, 133)",
              }}
            >
              <p
                className="Tags-module_tags_text__-u2Tl"
                style={{
                  fontSize: "12px",
                  margin: "0px",
                  whiteSpace: "nowrap",
                }}
              >
                Batch {batchNo}
              </p>
            </div>
          </div>
          <div className="BatchSchedule_vertical_line__6MS5A"></div>
          <div>
            <div className="flex gap_0_2_5">
              <CalendarMonthIcon
                style={{ fontSize: "17px", color: "orange" }}
              />

              <span>Start at:</span>
            </div>
            <p className="BatchSchedule_date__im950">{classStartDate}</p>
          </div>
          <div className="BatchSchedule_vertical_line__6MS5A"></div>
          <div>
            <div className="flex gap_0_2_5">
              <CalendarTodayIcon
                style={{ fontSize: "17px", color: "orange" }}
              />
              <span>Class Days:</span>
            </div>
            <div className="BatchSchedule_date__im950">
              <p className="BatchSchedule_dayName__KpWnv">{classDays}</p>
            </div>
          </div>
          <div className="BatchSchedule_vertical_line__6MS5A"></div>
          <div>
            <div className="flex gap_0_2_5">
              <AccessTimeIcon style={{ fontSize: "17px", color: "orange" }} />
              <span>Class Time:</span>
            </div>
            <p className="BatchSchedule_date__im950">{classTime}</p>
          </div>
        </div>
        <div
          className="OrientationClass_orientation_class_container__fYcvm"
          style={{ borderLeft: "2px solid rgb(18, 183, 106)" }}
        >
          <div className="flex gap_1">
            <img alt="" src="/images/Videos-green.svg" />
            <p className="OrientationClass_title__c7tDz">Free Demo Class</p>
          </div>
          <button
            id="btn-view-orientation-video"
            type="button"
            className="Button-module_btn__Fx11X Button-module_blackSecondaryBtn__Z5yLH"
            style={{
              borderRadius: "5px",
              color: "inherit",
              height: "40px",
              padding: "8px 24px",
              fontSize: "14px",
            }}
          >
            <div className="flex justify_center align_center gap_small">
              <div className="flex justify_center align_center">
                <PlayCircleFilledIcon />
              </div>
              <a className="nowrap false" href={demoClassLink}>
                Watch Video
              </a>
            </div>
          </button>
        </div>
        <div className="CourseDetails2_feature_section__fkIWy">
          <div className="Index_wrapper__jEy0N">
            <div className="flex gap_1 w_100">
              <p className="subtitle_st text_white">What we Provide</p>
              <div style={{ flexGrow: 1 }}>
                <div className="hr-line"></div>
              </div>
            </div>
            <div className="Index_card_container__Gb4tz">
              <div className="Index_card__w75Lv">
                <p className="subtitle_st">Evalution Test</p>
                <p className="body_b2 text_black_overlay">
                  Test yourself with regular test
                </p>
                <div className="Index_img__eu6T7">
                  <img
                    alt=""
                    width="36"
                    src="https://cdn.ostad.app/https://cdn.ostad.app/public/upload/2023-01-30T08-55-12.864Z-icon-evaluation.svg"
                  />
                </div>
              </div>
              <div className="Index_card__w75Lv">
                <p className="subtitle_st">Support Class</p>
                <p className="body_b2 text_black_overlay">
                  Regular Problem Solving
                </p>
                <div className="Index_img__eu6T7">
                  <img
                    alt=""
                    width="36"
                    src="https://cdn.ostad.app/https://cdn.ostad.app/public/upload/2023-01-30T09-00-15.283Z-icon-support.svg"
                  />
                </div>
              </div>
              <div className="Index_card__w75Lv">
                <p className="subtitle_st">Progress Tracking</p>
                <p className="body_b2 text_black_overlay">
                  Stay always on Track
                </p>
                <div className="Index_img__eu6T7">
                  <img
                    alt=""
                    width="36"
                    src="https://cdn.ostad.app/https://cdn.ostad.app/public/upload/2023-01-30T09-00-35.833Z-icon-pprogress.svg"
                  />
                </div>
              </div>
              <div className="Index_card__w75Lv">
                <p className="subtitle_st">Pro Batch</p>
                <p className="body_b2 text_black_overlay">For Best Student</p>
                <div className="Index_img__eu6T7">
                  <img
                    alt=""
                    width="36"
                    src="https://cdn.ostad.app/https://cdn.ostad.app/public/upload/2023-01-30T09-01-03.809Z-icon-ostad-pro.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="CourseDetails2_courseDetails_tabs__leenU">
          <FinalCoursePlan id={id} />
        </div>
      </div>
    </div>
  );
};
export default FinalCourseDetails;
