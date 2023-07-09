import React, { useState, useEffect } from "react";
import SuccessCard from "./SuccessCard";
import axios from "axios";
import { Link } from "react-router-dom";
function Success() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/coursefetch/hiredpeople/all"
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="GotHiredSection_got_hired_container__MtWTq">
      <h1 className="text_center mb_2">Who Got Hired</h1>
      <div className="GotHiredSection_talent_container__Z_lkd">
        <ul className="GotHiredSection_marquee_content__leTJo">
          {details.map((detail, index) => (
            <Link
              to={`http://${detail.linkedin}`}
              key={index}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SuccessCard
                img={detail.profile}
                name={detail.instructorName}
                comimg={detail.logo}
                about={detail.about}
                caption={detail.companyName}
              />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Success;
