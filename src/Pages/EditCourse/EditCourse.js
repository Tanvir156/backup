import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Loading from "./../../components/LoginRegister/Loading";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
const EditCourse = () => {
  const theme = createTheme();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
  const [inputValues, setInputValues] = useState([]);
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

  const [details, setDetails] = useState("");

  const [courseName, setCourseName] = useState("");

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
  const handleOrientationDateChange = (date) => {
    setOrientationDate(date);
  };
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/course/foredit/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setDetails(result);
        setInputs(result.inputValues);
      });
  }, []);

  const updateCourse = async (e) => {
    e.preventDefault();

    try {
      // Create an object with the updated data
      const data = {
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
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setLoading(true);
      // Make an API request to update the data in MongoDB
      await axios.put(
        `http://localhost:5000/api/course/update/${id}`,
        data,
        config
      ); // Replace "http://localhost:5000/api/course" with your actual API endpoint for updating the data

      // Data successfully updated
      setLoading(false);
      setSeverity("success");
      setMessage("Course updated");
    } catch (error) {
      // Handle error
      setLoading(false);
      setSeverity("error");

      setMessage("Error Occur");
      console.error(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      {details ? (
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
              onSubmit={updateCourse}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    focused
                    name="Course Name"
                    required
                    fullWidth
                    label="Course Name"
                    defaultValue={details.courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    focused
                    name="Batch No"
                    required
                    fullWidth
                    label="Batch No"
                    type="number"
                    defaultValue={details.batchNo}
                    onChange={(e) => setBatchNo(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    focused
                    name="Total seat"
                    required
                    fullWidth
                    label="Total seat"
                    type="number"
                    defaultValue={details.totalSeats}
                    onChange={(e) => setTotalSeats(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    focused
                    name="Course Fee"
                    required
                    fullWidth
                    label="Course Fee"
                    type="number"
                    defaultValue={details.courseFee}
                    onChange={(e) => setCourseFee(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    focused
                    name="After Discount"
                    required
                    fullWidth
                    label="After Discount"
                    type="number"
                    defaultValue={details.discountedFee}
                    onChange={(e) => setDiscountedFee(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    focused
                    name="Course Intro YoutubeVidoId"
                    required
                    fullWidth
                    label="Course Intro YoutubeVidoId"
                    type="text"
                    defaultValue={details.courseIntroLink}
                    onChange={(e) => setCourseIntroLink(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        label="Orientation Date and Time"
                        value={orientationDate} // Set a default value if orientationDate is null
                        onChange={(date) => handleOrientationDateChange(date)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    focused
                    name="Orientaion Class Link"
                    fullWidth
                    label="Orientaion Class Link"
                    type="text"
                    defaultValue={details.orientationClassLink}
                    onChange={(e) => setOrientationClassLink(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    focused
                    name="Class Start Date"
                    required
                    fullWidth
                    label="Class Start Date"
                    type="text"
                    placeholder="Friday, 20 June"
                    defaultValue={details.classStartDate}
                    onChange={(e) => setClassStartDate(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    focused
                    name="Class day"
                    required
                    fullWidth
                    label="Class day"
                    type="text"
                    placeholder="Fri, Sat"
                    defaultValue={details.classDays}
                    onChange={(e) => setClassDays(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    focused
                    name="Class time"
                    required
                    fullWidth
                    label="Class time"
                    type="text"
                    placeholder="9.00-10.00pm"
                    defaultValue={details.classTime}
                    onChange={(e) => setClassTime(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    focused
                    name="Demo Class Link"
                    required
                    fullWidth
                    label="Demo Class Link"
                    type="text"
                    defaultValue={details.demoClassLink}
                    onChange={(e) => setDemoClassLink(e.target.value)}
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
                      focused
                      name="We Provide"
                      required
                      fullWidth
                      label="We Provide"
                      type="text"
                      defaultValue={input}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      style={{ margin: "8px" }}
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
                Update Course
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <>
          <Loading />
        </>
      )}
    </ThemeProvider>
  );
};

export default EditCourse;
