import React from "react";
const CourseCard = ({ thumbnail, courseName }) => {
  return (
    <div className="CourseCardV3_courseCardWrapper__Y9U_b">
      <div className="CourseCardV3_courseCard__yoRdM">
        <div>
          <img
            alt=""
            className="differ"
            src={thumbnail}
            style={{ objectFit: "cover", aspectRatio: "16 / 9" }}
          />

          <div className="CourseCardV3_courseCard_title__HYpAp">
            <h5>{courseName}</h5>
          </div>
        </div>
        <div
          className="CourseCardV3_courseCard_price_content__xMb5a"
          style={{ position: "relative" }}
        >
          <div>
            <button
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
                <p className="nowrap false">Module</p>
                <div className="flex justify_center align_center">
                  <img
                    src="https://cdn.ostad.app//public/icons/arrow-right-line.svg"
                    width="19"
                    height="19"
                    alt=""
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
