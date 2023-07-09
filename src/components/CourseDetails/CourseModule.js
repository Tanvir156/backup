import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import VideocamIcon from "@mui/icons-material/Videocam";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DescriptionIcon from "@mui/icons-material/Description";
import Tab from "@mui/material/Tab";
import ForTab from "./../../components/UserDashBoard/ForTab";
export default function CourseModule({ accordions }) {
  const [videoData, setVideoData] = useState([]);

  const fetchVideoData = async () => {
    const newData = await Promise.all(
      accordions.map(async (accordion) => {
        const assignmentNum = accordion.assignments
          ? accordion.assignments.length
          : 0;
        const NoliveClass = accordion.zooms ? accordion.zooms.length : 0;
        const Noquiz = accordion.quizzes ? accordion.quizzes.length : 0;
        return {
          accordionName: accordion.name,
          assignmentNum: assignmentNum,
          NoliveClass: NoliveClass,
          Noquiz: Noquiz,
        };
        console.log(Noquiz);
      })
    );
    setVideoData(newData);
  };
  useEffect(() => {
    fetchVideoData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <div>
        {videoData.map((accordion, index) => {
          const { accordionName, assignmentNum, NoliveClass, Noquiz } =
            accordion;

          const moduleNumber = index + 1;
          return (
            <Accordion key={index} style={{ marginBottom: "5px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: "18px" }} />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
                style={{ padding: "10px" }}
              >
                <div className="flex justify_between w_100">
                  <div className="flex gap_1 align_start">
                    <div
                      className="ModuleCard_module_number_container__IZbYh"
                      style={{ background: "rgb(18, 183, 106)" }}
                    >
                      <p className="text_white">Module</p>
                      <h5 className="text_white">{moduleNumber}</h5>{" "}
                    </div>
                    <div className="flex_col justify_between">
                      <h5 className="text_black_100">{accordionName}</h5>
                      <div className="flex gap_0_2_5">
                        <ForTab
                          text={`${NoliveClass} Live Class`}
                          icon={<VideocamIcon style={{ fontSize: "18px" }} />}
                        />
                        <ForTab
                          text={`${assignmentNum} Assignment`}
                          icon={
                            <DescriptionIcon style={{ fontSize: "18px" }} />
                          }
                        />
                        <ForTab
                          text={`${Noquiz} Quiz`}
                          icon={<EventNoteIcon style={{ fontSize: "18px" }} />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionSummary>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
