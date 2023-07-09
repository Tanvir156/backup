import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
const InstructorCard = () => {
  const [details, setDetails] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [open, setOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteId(null);
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
        `http://localhost:5000/api/coursefetch/instructor/delete/${deleteId}`,
        config
      );
      handleClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error response if needed
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/course/instructors/all"
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };

    fetchData();
  }, []);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const showNextCard = () => {
    if (currentCardIndex + visibleCards < details.length) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const showPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  const updateVisibleCards = () => {
    if (window.innerWidth < 768) {
      setVisibleCards(1);
    } else {
      setVisibleCards(3);
    }
  };

  // Update the visible cards count on window resize
  useEffect(() => {
    updateVisibleCards(); // Call the function immediately
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  return (
    <div>
      <div className="card-container">
        {currentCardIndex > 0 && (
          <div className="arrow previous" onClick={showPreviousCard}>
            <ArrowBackIosIcon />
          </div>
        )}
        {details.length === 0 ? (
          <div className="loading-text">Loading...</div>
        ) : (
          details
            .slice(currentCardIndex, currentCardIndex + visibleCards)
            .map((detail, index) => (
              <Link
                to={`http://${detail.linkedin}`}
                key={currentCardIndex + index}
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="InstructorCard4_card_container__z__Wh">
                  <img alt="" width="268" height="200px" src={detail.profile} />
                  <div className="px_1 pb_1 pt_0_5">
                    <h5>{detail.instructorName}</h5>
                    {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                      <Link>
                        <Button
                          style={{ margin: "5px" }}
                          variant="contained"
                          color="secondary"
                          onClick={() => handleOpen(detail._id)}
                        >
                          Delete
                        </Button>
                      </Link>
                    ) : null}
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
                  <p className="body_b2 mb_1">{detail.about}</p>
                </div>
              </Link>
            ))
        )}
        {currentCardIndex + visibleCards < details.length && (
          <div className="arrow next" onClick={showNextCard}>
            <ArrowForwardIosIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCard;
