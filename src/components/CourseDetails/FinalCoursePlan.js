import React, { useState, useEffect } from "react";
import CourseModule from "./CourseModule";
import { useSelector } from "react-redux";

export default function FinalCoursePlan({ id }) {
  const [accordions, setAccordions] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const fetchAccordions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/coursefetch/coursemodule/${id}`
        );
        if (response.ok) {
          const result = await response.json();
          setAccordions(result);
        } else {
          throw new Error("Failed to fetch accordions");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccordions();
  }, [id]);

  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchDetails = () => {
      fetch(`http://localhost:5000/api/course/foredit/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch details");
          }
          return res.json();
        })
        .then((result) => {
          setDetails(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchDetails();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <nav>
        <div
          className="nav nav-tabs"
          id="nav-tab"
          role="tablist"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Study Plan
          </button>
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Instructor
          </button>
          {/* <button
            className="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            About Course
          </button> */}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabIndex="0"
        >
          {accordions && accordions.length > 0 && (
            <CourseModule accordions={accordions} />
          )}
        </div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
          tabIndex="0"
        >
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h5 className="card-title">{details.instructorName}</h5>
                  <p className="card-text text-wrap">
                    A Skilled Person having 5 years experience. Top-level
                    freelancers in the world
                  </p>
                </div>
                <div className="col-md-4">
                  <a
                    href={`http://${details.instructorLinkedin}`}
                    className="btn btn-primary"
                  >
                    Linkedin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
          tabIndex="0"
        >
          About
        </div>
      </div>
    </div>
  );
}
