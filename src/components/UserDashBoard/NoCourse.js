import React from "react";
import "./UserDashboard.css";
export default function NoCourse() {
  return (
    <div className="style_card__CY7Rk">
      <img
        width="104"
        height="104"
        alt=""
        src="https://cdn.ostad.app/public/upload/2023-05-27T08-52-03.886Z-Image.png"
      />
      <div className="flex_col gap_0_5 align_center">
        <p className="style_text__rwvv5">You Dont enroll any courses</p>
        <div>
          <button
            type="button"
            className="Button-module_btn__Fx11X Button-module_blackPrimaryBtn__nSDPc"
            style={{
              borderRadius: "8px",
              color: "inherit",
              height: "48px",
              padding: "12px 24px",
              fontSize: "14px",
            }}
          >
            <div className="flex justify_center align_center gap_small">
              <p className="nowrap false">Upcoming Live Batch</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
