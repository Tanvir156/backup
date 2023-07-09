import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Instructor.css";
import axios from "axios";
const InstructorCard = () => {
  const [details, setDetails] = useState([]);

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
        {details
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
                  <p className="body_b2 mb_1">{detail.about}</p>
                </div>
              </div>
            </Link>
          ))}
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
