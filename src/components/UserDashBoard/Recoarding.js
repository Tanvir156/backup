import React from "react";

const Recoarding = () => {
  return (
    <div style={{ marginBottom: "0px" }}>
      <div
        className="flex_col align_center w_100"
        style={{
          padding: "40px 0px",
          gap: "40px",
          height: "307px",
          background: "rgb(255, 255, 255)",
          border: "1px solid rgb(234, 236, 240)",
          borderRadius: "8px",
        }}
      >
        <div className="Index_empty_card__TrcVA">
          <img
            alt=""
            width="80"
            height="80"
            className="Index_img__Kdcma"
            src="https://cdn.ostad.app/public/upload/2023-01-26T06-51-20.600Z-warning-1.png"
          />
          <div className="flex_col align_center Index_img__Kdcma">
            <p className="subtitle_s1 text_yellow_110">No Recoarding</p>
            <p className="overline text_black_80">Look for Enroll</p>
          </div>
        </div>
        <div>
          <button
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
              <p className="nowrap false">Upcoming Live Batch</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recoarding;
