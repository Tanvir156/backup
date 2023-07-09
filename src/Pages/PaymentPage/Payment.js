import React, { useEffect, useState } from "react";
import Stepper from "./../../components/Payment/Stepper";
import "./Payment.css";
import { useParams } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import Loading from "./../../components/LoginRegister/Loading";

import { useSelector } from "react-redux";
import axios from "axios";
const Payment = () => {
  const [details, setDetails] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/course/foredit/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setDetails(result);
      });
  }, []);

  const total = details.courseFee - details.discountedFee;
  const userid = userInfo._id;
  const courseName = details.courseName;
  const customerName = userInfo.name;
  const customerEmail = userInfo.email;
  const payment = (e) => {
    e.preventDefault();
    // Create an object with the data to be inserted
    const data = {
      id,
      userid,
      courseName,
      total,
      customerName,
      customerEmail,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .post("http://localhost:5000/api/payment/init", data, config)
      .then((response) => {
        console.log(response);
        window.location.replace(response.data.url);
        // Handle the response from the server
        console.log(response);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
    <div>
      {details ? (
        <div>
          <Stepper />
          <div className="Stepper_course_wrapper__mUXbq">
            <div className="Stepper_course_card__k_ctd">
              <div
                className="flex gap_1 mb_1"
                style={{ borderBottom: "1px solid rgb(233, 233, 233)" }}
              >
                <img
                  width="120"
                  height="68"
                  src={details.courseThumbnail}
                  alt="course cover"
                />
                <div>
                  <h3>{details.courseName}</h3>
                  <div className="flex gap_2">
                    <p className="Stepper_tag_header__Pigzd">
                      <a
                        href={`http://${details.instructorLinkedin}`}
                        className="Stepper_tag_content__vlIpv"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instructor: {details.instructorName}
                      </a>
                    </p>
                    <p className="Stepper_tag_header__Pigzd">
                      <span className="Stepper_tag_content__vlIpv">
                        Start At: {details.classStartDate}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="Stepper_cart_container__msZw0">
                <h4>Payment Details</h4>
                <div>
                  <div className="flex justify_between mb_0_5">
                    <p>CourseFee:</p>
                    <p>৳ {details.courseFee}</p>
                  </div>
                  <div className="flex justify_between mb_0_5">
                    <p>Discount:</p>
                    <p>৳ {details.discountedFee}</p>
                  </div>
                  <div className="horizontal_line my_0_5"></div>
                  <div className="Stepper_purchase_action__MWlxG">
                    <div className="Stepper_total__pACMZ">
                      <h4>Total:</h4>
                      <h3>৳ {total}</h3>
                    </div>
                    <div className="Stepper_action__Op_RD">
                      <button
                        onClick={payment}
                        type="button"
                        className="Button-module_btn__Fx11X Button-module_primaryBtn__LoKRT"
                        style={{
                          borderRadius: "8px",
                          color: "inherit",
                          height: "48px",
                          padding: "12px 24px",
                          fontSize: "14px",
                        }}
                      >
                        <div className="flex justify_center align_center gap_small">
                          <p className="nowrap false">Complete Payment</p>
                          <div className="flex justify_center align_center">
                            <img
                              src="https://cdn.ostad.app//public/icons/arrow-right-s-line.svg"
                              width="19"
                              height="19"
                              alt="arrow icon"
                            />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap_sm Stepper_support_container__gfI41">
              <CallIcon />
              <span className="Stepper_support__upspP">
                Call for any help{" "}
                <a href="tel: +8801960999918">+8801960999918</a>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
};

export default Payment;
