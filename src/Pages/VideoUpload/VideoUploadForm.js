import React, { useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";

const accordionContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
};

const accordionStyle = {
  width: "80%",
};

const addButtonStyle = {
  padding: "0.5rem",
  backgroundColor: "#2196f3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "1rem 0",
};

const saveButtonStyle = {
  padding: "0.5rem",
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "1rem 0",
};

export default function VideoUploadForm() {
  const [accordions, setAccordions] = useState([]);

  const handleAddAccordion = () => {
    setAccordions([
      ...accordions,
      { name: "", text: "", textList: [], videoLinks: [] },
    ]);
  };

  const handleNameChange = (index, name) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[index].name = name;
    setAccordions(updatedAccordions);
  };

  const handleTextChange = (index, text) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[index].text = text;
    setAccordions(updatedAccordions);
  };

  const handleAddText = (index) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[index].textList.push("");
    setAccordions(updatedAccordions);
  };

  const handleTextListChange = (accIndex, textIndex, text) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[accIndex].textList[textIndex] = text;
    setAccordions(updatedAccordions);
  };

  const handleAddVideoLink = (index) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[index].videoLinks.push("");
    setAccordions(updatedAccordions);
  };

  const handleVideoLinkChange = (accIndex, videoIndex, link) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[accIndex].videoLinks[videoIndex] = link;
    setAccordions(updatedAccordions);
  };

  const handleDeleteVideoLink = (accIndex, videoIndex) => {
    const updatedAccordions = [...accordions];
    updatedAccordions[accIndex].videoLinks.splice(videoIndex, 1);
    setAccordions(updatedAccordions);
  };

  const handleSaveAccordions = () => {
    axios
      .post("http://localhost:5000/api/accordions", { accordions })
      .then((response) => {
        // Handle successful save
        console.log("Accordions saved:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error saving accordions:", error);
      });
  };

  const { id, courseName } = useParams();

  return (
    <div style={accordionContainerStyle}>
      <div style={accordionStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8 text-center mt-2 mb-2">
              <h1 className="p-4">{courseName}</h1>
            </div>
          </div>
        </div>
        {accordions.map((accordion, accIndex) => (
          <Accordion key={accIndex}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${accIndex}-content`}
              id={`panel-${accIndex}-header`}
            >
              <Typography style={{ padding: "10px" }}>
                {accordion.name || `Module ${accIndex + 1}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <input
                  type="text"
                  value={accordion.name}
                  onChange={(e) => handleNameChange(accIndex, e.target.value)}
                  placeholder="Enter name for this accordion"
                  style={{ width: "100%", marginBottom: "0.5rem" }}
                />
                <input
                  type="text"
                  value={accordion.text}
                  onChange={(e) => handleTextChange(accIndex, e.target.value)}
                  placeholder="Enter text for this accordion"
                  style={{ width: "100%", marginBottom: "0.5rem" }}
                />
                {accordion.textList.map((text, textIndex) => (
                  <div key={textIndex}>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) =>
                        handleTextListChange(
                          accIndex,
                          textIndex,
                          e.target.value
                        )
                      }
                      placeholder="Enter additional text"
                      style={{ width: "100%", marginBottom: "0.5rem" }}
                    />
                  </div>
                ))}
                {accordion.videoLinks.map((link, videoIndex) => (
                  <div key={videoIndex}>
                    <input
                      type="text"
                      value={link}
                      onChange={(e) =>
                        handleVideoLinkChange(
                          accIndex,
                          videoIndex,
                          e.target.value
                        )
                      }
                      placeholder="Enter video link"
                      style={{ width: "100%", marginBottom: "0.5rem" }}
                    />
                    <div>
                      <video
                        src={link}
                        controls
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      ></video>
                      <button
                        style={{ marginLeft: "1rem" }}
                        onClick={() =>
                          handleDeleteVideoLink(accIndex, videoIndex)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  style={addButtonStyle}
                  onClick={() => handleAddText(accIndex)}
                >
                  Add Text
                </button>
                <button
                  style={addButtonStyle}
                  onClick={() => handleAddVideoLink(accIndex)}
                >
                  Add Video Link
                </button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
        <button style={addButtonStyle} onClick={handleAddAccordion}>
          Add Accordion
        </button>
        <button style={saveButtonStyle} onClick={handleSaveAccordions}>
          Save Accordions
        </button>
      </div>
    </div>
  );
}
