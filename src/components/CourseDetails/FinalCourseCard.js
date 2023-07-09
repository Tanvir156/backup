import React from "react";
import YouTube from "react-youtube";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Person4Icon from "@mui/icons-material/Person4";
import CallIcon from "@mui/icons-material/Call";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FinalCourseCard({
  courseIntroLink,
  courseFee,
  discountedFee,
  inputValues,
  id,
  left,
}) {
  const opts = {
    playerVars: {
      rel: 0,
      modestbranding: 1,
      autohide: 1,
      mute: 1,
      showinfo: 0,
      autoplay: 1,
      enablejsapi: 1,
    },
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (left <= 0) {
    left = 0;
  }

  const renderEnrollButton = () => {
    if (left <= 0) {
      return (
        <button
          id="btn-join-live-batch"
          type="button"
          className="Button-module_btn__Fx11X Button-module_primaryBtn__LoKRT"
          style={{
            borderRadius: "8px",
            color: "inherit",
            height: "48px",
            padding: "12px 24px",
            fontSize: "14px",
            background: "#ff1a1a",
          }}
          disabled={true}
        >
          <div className="flex justify_center align_center gap_small">
            <p className="nowrap false">Enrollment Closed</p>
            <div className="flex justify_center align_center">
              <img
                src="https://cdn.ostad.app//public/icons/arrow-right-s-line.svg"
                width="19"
                height="19"
                alt="Arrow Right"
              />
            </div>
          </div>
        </button>
      );
    }

    return (
      <Link
        to={userInfo ? `/payment/${id}` : "/login"}
        className="Button-module_btn__Fx11X Button-module_primaryBtn__LoKRT"
      >
        <button
          id="btn-join-live-batch"
          type="button"
          className="Button-module_btn__Fx11X Button-module_primaryBtn__LoKRT"
          style={{
            borderRadius: "8px",
            color: "inherit",
            height: "48px",
            padding: "12px 24px",
          }}
        >
          <div className="flex justify_center align_center gap_small">
            <p style={{ color: "#fff" }} className="nowrap false">
              Enroll
            </p>
            <div className="flex justify_center align_center">
              <img
                src="https://cdn.ostad.app//public/icons/arrow-right-s-line.svg"
                width="19"
                height="19"
                alt="Arrow Right"
              />
            </div>
          </div>
        </button>
      </Link>
    );
  };

  return (
    <div className="CourseDetails2_courseDetails_right__wASUl">
      <div className="">
        <div className="iframe-container">
          <YouTube
            videoId={courseIntroLink}
            opts={opts}
            className="responsive-iframe"
          />
        </div>
      </div>
      <div className="CourseDetails2_courseDetailsCard_bottom__BfXMB">
        <div className="CourseDetails2_courseDetailsCard_bottom_tags__rxmVZ">
          <div
            className="Tags-module_tags__n4i1K"
            style={{
              backgroundColor: "rgb(255, 241, 233)",
              color: "rgb(29, 41, 57)",
              padding: "6px 10px",
              borderRadius: "4px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              border: "0px solid rgb(102, 112, 133)",
            }}
          >
            <AccessTimeFilledIcon />
            <p
              className="Tags-module_tags_text__-u2Tl Tags-module_tags_text_lg__DCPzU"
              style={{
                fontSize: "14px",
                margin: "0px",
                whiteSpace: "nowrap",
              }}
            >
              {left} day left
            </p>
          </div>
          <div
            className="Tags-module_tags__n4i1K"
            style={{
              backgroundColor: "rgba(161, 68, 255, 0.15)",
              color: "rgb(29, 41, 57)",
              padding: "6px 10px",
              borderRadius: "4px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              border: "0px solid rgb(102, 112, 133)",
            }}
          >
            <Person4Icon />
            <p
              className="Tags-module_tags_text__-u2Tl Tags-module_tags_text_lg__DCPzU"
              style={{ margin: "0px", whiteSpace: "nowrap" }}
            >
              Seat Left 14
            </p>
          </div>
        </div>
        <div className="CourseDetails2_courseDetailsCard_action_wrapper__GsZ9g">
          <div className="flex justify_between" style={{ marginBottom: "8px" }}>
            <div className="CoursePrice_courseDetailsCard_prices__8sV4i">
              <span className="CoursePrice_real_price__eSjwz">
                ৳ {courseFee}
              </span>
              <h2>৳ {courseFee - discountedFee}</h2>
            </div>
            <div style={{ cursor: "pointer" }}>
              <div className="CoursePrice_courseDetailsCard_promo__pbQhy">
                <img
                  height="16"
                  width="16"
                  src="https://cdn.ostad.app//public/icons/coupon-3-line.svg"
                  alt="Promo Code"
                />
                <p>Promo code</p>
              </div>
            </div>
            <div style={{ cursor: "pointer" }}>
              <div className="CoursePrice_courseDetailsCard_promo__pbQhy">
                <img
                  height="16"
                  width="16"
                  src="https://cdn.ostad.app//public/icons/share-line.svg"
                  alt="Share"
                />
                <p>Share</p>
              </div>
            </div>
          </div>
          {renderEnrollButton()} {/* Call the renderEnrollButton function */}
        </div>
        <div
          className="p_1"
          style={{ borderBottom: "1px solid rgb(234, 236, 240)" }}
        >
          <p className="subtitle_s2 text_black_100">We are giving</p>
          <ul className="CourseDetails2_kpis_container__cC0mI">
            {inputValues.map((input, index) => (
              <li className="flex align_start gap_sm mb_sm" key={index}>
                <CheckCircleOutlineIcon />
                <p className="body_b2 text_black_80">{input}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="CourseDetails2_courseDetails_help__vPHvJ">
          <div className="flex gap_sm">
            <CallIcon />
            <p className="body_b1">
              Call{" "}
              <a href="tel:01643072290" style={{ textDecoration: "underline" }}>
                <b>01643072290</b>
              </a>
            </p>
            <span>10.00Am to 10.00Pm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
