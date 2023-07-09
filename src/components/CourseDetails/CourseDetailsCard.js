import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import { useSelector } from "react-redux";
const CourseCard = ({
  thumbnail,
  amount,
  courseName,
  batchNo,
  dayLeft,
  discountAmount,
  id,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [open, setOpen] = useState(false);
  if (dayLeft <= 0) {
    dayLeft = 0;
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(
        `http://localhost:5000/api/course/delete/${id}`,
        config
      );
      handleClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error response if needed
    }
  };

  return (
    <div className="CourseCardV3_courseCardWrapper__Y9U_b">
      <div className="CourseCardV3_courseCard__yoRdM">
        <div>
          <img
            alt=""
            width="338px"
            src={thumbnail}
            style={{ objectFit: "cover", aspectRatio: "16 / 9" }}
          />
          <div className="CourseCardV3_courseCard_tags__lNF0G">
            <div className="flex_wrap gap_0_5">
              <div
                className="Tags-module_tags__n4i1K"
                style={{
                  backgroundColor: "rgb(234, 236, 240)",
                  color: "rgb(29, 41, 57)",
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
                    fontSize: "14px",
                    margin: "0px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Batch {batchNo}
                </p>
              </div>
              {/* <div
                className="Tags-module_tags__n4i1K"
                style={{
                  backgroundColor: "rgb(234, 236, 240)",
                  color: "rgb(29, 41, 57)",
                  padding: "3px 6px",
                  borderRadius: "4px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  border: "0px solid rgb(102, 112, 133)",
                }}
              >
                <img
                  width="16"
                  height="16"
                  src="https://cdn.ostad.app/public/icons/team-line.svg"
                  alt=""
                />
                <p
                  className="Tags-module_tags_text__-u2Tl"
                  style={{
                    fontSize: "14px",
                    margin: "0px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Available seat 44
                </p>
              </div> */}
              <div
                className="Tags-module_tags__n4i1K"
                style={{
                  backgroundColor: "rgb(234, 236, 240)",
                  color: "rgb(29, 41, 57)",
                  padding: "3px 6px",
                  borderRadius: "4px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  border: "0px solid rgb(102, 112, 133)",
                }}
              >
                <img
                  width="16"
                  height="16"
                  src="https://cdn.ostad.app/public/icons/time-line.svg"
                  alt=""
                />
                <p
                  className="Tags-module_tags_text__-u2Tl"
                  style={{
                    fontSize: "14px",
                    margin: "0px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {dayLeft} day left
                </p>
              </div>
            </div>
          </div>
          <div className="CourseCardV3_courseCard_title__HYpAp">
            <h5>{courseName}</h5>
          </div>
          <div style={{ display: "flex" }}>
            {userInfo && userInfo.email === "rana525203@gmail.com" ? (
              <Link to={`/editcourse/${id}`}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ margin: "5px" }}
                >
                  Edit
                </Button>
              </Link>
            ) : (
              <>
                <div></div>
              </>
            )}

            <div>
              {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                <Link to={`/uploadcoursevideo/${id}/${courseName}`}>
                  <Button
                    style={{ margin: "5px" }}
                    variant="contained"
                    color="secondary"
                  >
                    Module
                  </Button>
                </Link>
              ) : (
                <>
                  <div></div>
                </>
              )}

              {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                <Link>
                  <Button
                    style={{ margin: "5px" }}
                    variant="contained"
                    color="secondary"
                    onClick={handleOpen}
                  >
                    Delete
                  </Button>
                </Link>
              ) : (
                <>
                  <div></div>
                </>
              )}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <p>Are you sure you want to delete this item?</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDelete} color="secondary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
        <div
          className="CourseCardV3_courseCard_price_content__xMb5a"
          style={{ position: "relative" }}
        >
          <div>
            <p className="CourseCardV3_real_price__nUrJ9">৳{amount}</p>
            <p className="subtitle_s1 nowrap">৳ {discountAmount}</p>
          </div>
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
                <p className="nowrap false">Details</p>
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
        <div className="CourseCardV3_live_tag__xm1_9">
          <div className="CourseCardV3_live_tag_circle__vnVXQ">
            <div className="CourseCardV3_live_dot__F_Ari"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
