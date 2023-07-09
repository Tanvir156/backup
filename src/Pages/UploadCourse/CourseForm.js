import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Loading from "./../../components/LoginRegister/Loading";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Alert } from "@mui/material";
const CourseForm = () => {
  const theme = createTheme();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState([""]);
  const [inputValues, setInputValues] = useState([""]);
  const [severity, setSeverity] = useState("");
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
    setInputValues([...inputValues, ""]);
  };

  const [courseName, setCourseName] = useState("");
  const [courseBio, setCourseBio] = useState("");

  const [batchNo, setBatchNo] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [discountedFee, setDiscountedFee] = useState("");

  const [courseIntroLink, setCourseIntroLink] = useState("");
  const [orientationDate, setOrientationDate] = useState("");
  const [orientationClassLink, setOrientationClassLink] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [classDays, setClassDays] = useState("");
  const [classTime, setClassTime] = useState("");
  const [demoClassLink, setDemoClassLink] = useState("");
  const [courseThumbnail, setCourseThumbnail] = useState("");
  const [picMessage, setPicMessage] = useState(null);
  const [instructorName, setInstructorName] = useState(null);
  const [instructorLinkedin, setInstructorLinkedin] = useState(null);
  const handleOrientationDateChange = (date) => {
    setOrientationDate(date);
  };
  const postDetails = (pics) => {
    setLoading(true);
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "E-learning");
      data.append("cloud_name", "dorgov8ca");
      data.append("api_key", "652331341656527");
      data.append("api_secret", "8FjIpEGaOpUHjm14OFHV6Bf7ARY");
      fetch("https://api.cloudinary.com/v1_1/dorgov8ca/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setCourseThumbnail(data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  const insertDataToDB = (e) => {
    e.preventDefault();
    // Create an object with the data to be inserted
    const data = {
      id,
      courseName,

      batchNo,
      totalSeats,
      courseFee,
      discountedFee,

      courseIntroLink,
      orientationDate,
      orientationClassLink,
      classStartDate,
      classDays,
      classTime,
      demoClassLink,
      courseThumbnail,
      inputValues,
      instructorName,
      instructorLinkedin,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/api/course/insert", data, config)
      .then((response) => {
        // Handle the response from the server
        console.log("Data inserted successfully");
        setLoading(false);
        setSeverity("success");
        setMessage("Course Uploaded");
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error inserting data:", error);
        setLoading(false);
        setSeverity("error");
        setMessage(error.response.data.error); // Assuming the server returns the error message in `error` property of the response
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Course Details
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={
            onSubmit={insertDataToDB}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Course Name"
                  required
                  fullWidth
                  label="Course Name"
                  autoFocus
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Course Bio"
                  required
                  fullWidth
                  label="Course Bio"
                  autoFocus
                  value={courseBio}
                  onChange={(e) => setCourseBio(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="Batch No"
                  required
                  fullWidth
                  label="Batch No"
                  type="number"
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="Total seat"
                  required
                  fullWidth
                  label="Total seat"
                  type="number"
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="Course Fee"
                  required
                  fullWidth
                  label="Course Fee"
                  type="number"
                  value={courseFee}
                  onChange={(e) => setCourseFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="After Discount"
                  required
                  fullWidth
                  label="After Discount"
                  type="number"
                  value={discountedFee}
                  onChange={(e) => setDiscountedFee(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Course Intro YoutubeVidoId"
                  required
                  fullWidth
                  label="Course Intro YoutubeVidoId"
                  type="text"
                  value={courseIntroLink}
                  onChange={(e) => setCourseIntroLink(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Orientation Date and Time"
                      value={orientationDate}
                      onChange={(date) => handleOrientationDateChange(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Orientaion Class Link"
                  fullWidth
                  label="Orientaion Class Link"
                  type="text"
                  value={orientationClassLink}
                  onChange={(e) => setOrientationClassLink(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Class Start Date"
                  required
                  fullWidth
                  label="Class Start Date"
                  type="text"
                  placeholder="Friday, 20 June"
                  value={classStartDate}
                  onChange={(e) => setClassStartDate(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Class day"
                  required
                  fullWidth
                  label="Class day"
                  type="text"
                  placeholder="Fri, Sat"
                  value={classDays}
                  onChange={(e) => setClassDays(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Class time"
                  required
                  fullWidth
                  label="Class time"
                  type="text"
                  placeholder="9.00-10.00pm"
                  value={classTime}
                  onChange={(e) => setClassTime(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Demo Class Link"
                  required
                  fullWidth
                  label="Demo Class Link"
                  type="text"
                  value={demoClassLink}
                  onChange={(e) => setDemoClassLink(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Instructor Name"
                  required
                  fullWidth
                  label="Instructor Name"
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Instructor Linkedin Link"
                  required
                  fullWidth
                  label="Instructor Linkedin Link"
                  type="text"
                  value={instructorLinkedin}
                  onChange={(e) => setInstructorLinkedin(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid>
                    <Typography variant="subtitle1">
                      Course Thumbnail
                    </Typography>
                  </Grid>
                  <Grid>
                    <TextField
                      fullWidth
                      name="Profile Picture"
                      type="file"
                      onChange={(e) => postDetails(e.target.files[0])}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid>
                <Typography variant="subtitle1">We are providing</Typography>
              </Grid>
              {inputs.map((input, index) => (
                <div key={index}>
                  <TextField
                    value={input}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}
              <Button variant="contained" onClick={handleAddInput}>
                Add
              </Button>
            </Grid>
            {loading && <Loading />}
            {message ? <Alert severity={severity}>{message}</Alert> : <></>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Upload Course
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CourseForm;
