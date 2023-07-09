import React from "react";
import "./Stepper.css";
const Stepper = () => {
  return (
    <div className="Stepper">
      <div className="Stepper__step is-complete">
        <div className="Stepper__indicator">
          <span
            className="Stepper_Stepper__info__zqvjO"
            style={{ background: "#FFC000" }}
          >
            <img
              src="https://cdn.ostad.app/public/upload/2022-12-21T08-59-48.573Z-check-line.svg"
              height="32"
              width="32"
              alt="checkmark"
            />
          </span>
        </div>
        <p className="Stepper__label body_b2">Course Selection</p>
      </div>

      <div className="Stepper__step is-complete">
        <div className="Stepper__indicator">
          <span
            className="Stepper_Stepper__info__zqvjO"
            style={{ background: "rgb(255, 192, 0)" }}
          >
            <img
              src="https://cdn.ostad.app/public/upload/2022-12-21T08-59-48.573Z-check-line.svg"
              height="32"
              width="32"
              alt="checkmark"
            />
          </span>
        </div>
        <p className="Stepper__label body_b2">Payment Details</p>
      </div>

      <div className="Stepper__step is-active">
        <div className="Stepper__indicator">
          <span
            className="Stepper_Stepper__info__zqvjO"
            style={{ background: "rgb(255, 246, 217)" }}
          >
            <p
              className="subtitle_s2"
              style={{ color: "rgb(255, 192, 0)", fontSize: "24px" }}
            >
              3
            </p>
          </span>
        </div>
        <p className="Stepper__label body_b2">Payment Success</p>
      </div>
    </div>
  );
};

export default Stepper;
