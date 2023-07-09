import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Loading from "./../../components/LoginRegister/Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "@mui/material";

function CourseAccordion() {
  const accordionContainerStyle = {
    justifyContent: "center",
    marginTop: "2rem",
  };

  const accordionStyle = {
    width: "80%",
    margin: "auto",
  };

  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const { id, courseName } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [accordionData, setAccordionData] = useState([
    {
      name: "Module",
      links: [],
      assignments: [],
      quizzes: [],
      zooms: [],
    },
  ]);

  const handleAddAccordion = () => {
    const newAccordion = {
      name: "",
      links: [],
      assignments: [],
      quizzes: [],
      zooms: [],
    };
    setAccordionData([...accordionData, newAccordion]);
  };

  const handleNameChange = (index, event) => {
    const newAccordionData = [...accordionData];
    newAccordionData[index].name = event.target.value;
    setAccordionData(newAccordionData);
  };

  // Function to handle adding a link to an accordion
  const handleAddLink = (accordionIndex) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].links.push("");
    setAccordionData(newAccordionData);
  };

  // Function to handle changing a link in an accordion
  const handleLinkChange = (accordionIndex, linkIndex, event) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].links[linkIndex] = event.target.value;
    setAccordionData(newAccordionData);
  };

  // Function to handle adding an assignment to an accordion
  const handleAddAssignment = (accordionIndex) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].assignments.push("");
    setAccordionData(newAccordionData);
  };

  // Function to handle changing an assignment in an accordion
  const handleAssignmentChange = (accordionIndex, assignmentIndex, event) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].assignments[assignmentIndex] =
      event.target.value;
    setAccordionData(newAccordionData);
  };

  // Function to handle adding a quiz to an accordion
  const handleAddQuiz = (accordionIndex) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].quizzes.push("");
    setAccordionData(newAccordionData);
  };

  // Function to handle changing a quiz in an accordion
  const handleQuizChange = (accordionIndex, quizIndex, event) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].quizzes[quizIndex] = event.target.value;
    setAccordionData(newAccordionData);
  };

  // Function to handle adding a zoom to an accordion
  const handleAddZoom = (accordionIndex) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].zooms.push({ time: "", link: "" });
    setAccordionData(newAccordionData);
  };

  // Function to handle changing a zoom time in an accordion
  const handleZoomTimeChange = (accordionIndex, zoomIndex, event) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].zooms[zoomIndex].time = event.target.value;
    setAccordionData(newAccordionData);
  };

  // Function to handle changing a zoom link in an accordion
  const handleZoomLinkChange = (accordionIndex, zoomIndex, event) => {
    const newAccordionData = [...accordionData];
    newAccordionData[accordionIndex].zooms[zoomIndex].link = event.target.value;
    setAccordionData(newAccordionData);
  };

  const updateData = async (e) => {
    e.preventDefault();

    // Create an object with the data to be updated
    const data = {
      accordions: accordionData,
    };

    setLoading(true);

    try {
      // Send the data to the server using an API request
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:5000/api/course/module/update/${id}`,
        data,
        config
      );

      setLoading(false);
      setSeverity("success");
      setMessage(response.data.message);
    } catch (error) {
      setLoading(false);
      setSeverity("error");
      setMessage("Error updating data. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await fetch(`http://localhost:5000/api/coursefetch/module/${id}`, config);
        const result = await response.json();
        setAccordionData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div style={accordionContainerStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8 text-center ">
            <h1 className="p-4">{courseName}</h1>
            {severity && <Alert severity={severity}>{message}</Alert>}
          </div>
        </div>
      </div>

      <form onSubmit={updateData} style={{ width: "100%" }}>
        {accordionData.map((accordion, index) => (
          <Accordion key={index} style={accordionStyle}>
            <AccordionSummary>
              <TextField
                label="Module Name"
                fullwidth
                value={accordion.name}
                onChange={(event) => handleNameChange(index, event)}
              />
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <h5>Links:</h5>
                {accordion.links.map((link, linkIndex) => (
                  <TextField
                    key={linkIndex}
                    label="Link"
                    value={link}
                    onChange={(event) =>
                      handleLinkChange(index, linkIndex, event)
                    }
                  />
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddLink(index)}
                >
                  Add Link
                </Button>
              </div>
              <div>
                <h5>Assignments:</h5>
                {accordion.assignments.map((assignment, assignmentIndex) => (
                  <TextField
                    key={assignmentIndex}
                    label="Assignment"
                    value={assignment}
                    onChange={(event) =>
                      handleAssignmentChange(index, assignmentIndex, event)
                    }
                  />
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddAssignment(index)}
                >
                  Add Assignment
                </Button>
              </div>
              <div>
                <h5>Quizzes:</h5>
                {accordion.quizzes.map((quiz, quizIndex) => (
                  <TextField
                    key={quizIndex}
                    label="Quiz"
                    value={quiz}
                    onChange={(event) =>
                      handleQuizChange(index, quizIndex, event)
                    }
                  />
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddQuiz(index)}
                >
                  Add Quiz
                </Button>
              </div>
              <div>
                <h5>Zooms:</h5>
                {accordion.zooms.map((zoom, zoomIndex) => (
                  <div key={zoomIndex}>
                    <TextField
                      label="Time"
                      value={zoom.time}
                      onChange={(event) =>
                        handleZoomTimeChange(index, zoomIndex, event)
                      }
                    />
                    <TextField
                      label="Link"
                      value={zoom.link}
                      onChange={(event) =>
                        handleZoomLinkChange(index, zoomIndex, event)
                      }
                    />
                  </div>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddZoom(index)}
                >
                  Add Zoom
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            margin: "5px",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddAccordion}
          >
            Add Module
          </Button>
          <Button type="submit" variant="contained">
            Save Data
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CourseAccordion;
