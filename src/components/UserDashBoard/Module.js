import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import VideocamIcon from "@mui/icons-material/Videocam";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import ForTab from "./ForTab";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Module({ accordions, courseName }) {
  const { id } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const fetchVideoData = async () => {
    const API_KEY = "AIzaSyBFzhiaW14lmKP45S1UWAEDJUG8dL4i2A4";

    const newData = await Promise.all(
      accordions.map(async (accordion) => {
        const videoIds = accordion.links.map((link) => extractVideoId(link));
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(
            ","
          )}&key=${API_KEY}`
        );
        const data = await response.json();

        const assignmentNum = accordion.assignments
          ? accordion.assignments.length
          : 0;
        const NoliveClass = accordion.zooms ? accordion.zooms.length : 0;
        const Noquiz = accordion.quizzes ? accordion.quizzes.length : 0;
        const assignment = accordion.assignments;
        const quizs = accordion.quizzes;
        const zoomData = accordion.zooms.map((zoom) => ({
          time: zoom.time,
          link: zoom.link,
        }));

        return {
          accordionName: accordion.name,
          videos: data.items,
          assignmentNum: assignmentNum,
          NoliveClass: NoliveClass,
          Noquiz: Noquiz,
          zoomData: zoomData,
          assignment: assignment,
          quizs: quizs,
        };
      })
    );

    setVideoData(newData);
  };

  useEffect(() => {
    fetchVideoData();
  }, []);
  const extractVideoId = (link) => {
    const regex = /(?:\/embed\/|\/watch\?v=|\/(?=p\/)|youtu\.be\/)([\w\/\-]+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const formatDuration = (duration) => {
    const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = duration.match(durationRegex);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    return `${hours > 0 ? hours + ":" : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const playVideo = (videoId) => {
    setSelectedVideo(videoId);
  };
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <div style={{ width: "80%" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8 text-center mt-2 mb-2">
              <h1 className="p-4">{courseName}</h1>
              {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                <Link to={`/module/update/${id}/${courseName}`}>
                  <Button
                    style={{ margin: "5px" }}
                    variant="contained"
                    color="secondary"
                  >
                    Edit
                  </Button>
                </Link>
              ) : (
                <>
                  <div></div>
                </>
              )}
            </div>
          </div>
        </div>
        {selectedVideo && (
          <div style={{ marginTop: "20px" }}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              title="YouTube Video Player"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {videoData.map((accordion, index) => {
          const {
            accordionName,
            videos,
            assignmentNum,
            NoliveClass,
            Noquiz,
            assignment,
            quizs,
          } = accordion;

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
                    <div className="flex_col justify_between gap_0_2_5">
                      <h5 className="text_black_100">{accordionName}</h5>
                      <div className="flex gap_0_2_5 pt_0_2_5">
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
              <AccordionDetails>
                <div>
                  <ul className="list-unstyled video-list-thumbs row">
                    {videos.map((video, videoIndex) => {
                      return (
                        <li
                          key={videoIndex}
                          onClick={() => playVideo(video.id)}
                        >
                          <div className="war">
                            <img
                              src={video.snippet.thumbnails.default.url}
                              alt="Thumbnail"
                              className="img-responsive"
                              height="70px"
                            />
                            <div style={{ height: "70px", overflow: "hidden" }}>
                              <h2>{video.snippet.title}</h2>
                            </div>
                            {video.contentDetails && (
                              <span className="duration">
                                {formatDuration(video.contentDetails.duration)}
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            value="one"
                            label={
                              <ForTab
                                text="Class Schedule"
                                icon={
                                  <VideocamIcon style={{ fontSize: "18px" }} />
                                }
                              />
                            }
                          />
                          <Tab
                            value="two"
                            label={
                              <ForTab
                                text="Assignment"
                                icon={
                                  <DescriptionIcon
                                    style={{ fontSize: "18px" }}
                                  />
                                }
                              />
                            }
                          />
                          <Tab
                            value="three"
                            label={
                              <ForTab
                                text="Quiz"
                                icon={
                                  <EventNoteIcon style={{ fontSize: "18px" }} />
                                }
                              />
                            }
                          />
                        </TabList>
                      </Box>

                      <TabPanel value="one">
                        {accordion.zoomData.map((zoom, zoomIndex) => (
                          <div key={zoomIndex}>
                            <p>Zoom Time: {zoom.time}</p>
                            <p>Zoom Link: {zoom.link}</p>
                          </div>
                        ))}
                      </TabPanel>
                      <TabPanel value="two">
                        {assignmentNum > 0 ? (
                          assignment.map((assignment, assignmentIndex) => (
                            <div key={assignmentIndex}>
                              Assignment {assignmentIndex + 1}: {assignment}
                            </div>
                          ))
                        ) : (
                          <p>No assignments available</p>
                        )}
                      </TabPanel>

                      <TabPanel value="three">
                        {" "}
                        {Noquiz > 0 ? (
                          quizs.map((assignment, assignmentIndex) => (
                            <div key={assignmentIndex}>
                              Quiz {assignmentIndex + 1}: {assignment}
                            </div>
                          ))
                        ) : (
                          <p>No quiz available</p>
                        )}
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
