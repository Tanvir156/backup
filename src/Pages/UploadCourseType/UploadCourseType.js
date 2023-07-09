import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Loading from "./../../components/LoginRegister/Loading";
import { useSelector } from "react-redux";

import { Alert } from "@mui/material";
const UploadCourseType = () => {
  const theme = createTheme();
  const currencies = [
    {
      value: "Professional",
      label: "Professional",
    },
    {
      value: "Academic",
      label: "Academic",
    },
    {
      value: "Skill Development",
      label: "Skill_Development",
    },
  ];

  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("");

  const [courseType, setCourseType] = useState("");
  const [courseIcon, setCourseIcon] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseBio, setCourseBio] = useState("");
  const [hiringCompany, setHiringCompany] = useState("");
  const [jobCount, setJobCount] = useState("");
  const [remoteJobCount, setRemoteJobCount] = useState("");
  const [inspiringBio, setInspiringBio] = useState("");
  const insertDataToDB = (e) => {
    e.preventDefault();
    // Create an object with the data to be inserted
    const data = {
      courseType,
      courseIcon,
      courseName,
      courseBio,
      hiringCompany,
      jobCount,
      remoteJobCount,
      inspiringBio,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/api/course/inserttype", data, config)
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
        console.log("error");
        setMessage(error);
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
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select your course type"
                  value={courseType}
                  onChange={(e) => setCourseType(e.target.value)}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Course Catagory"
                  required
                  fullWidth
                  label="Course Catagory"
                  autoFocus
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Course Icon"
                  required
                  fullWidth
                  label="Course Icon Link"
                  autoFocus
                  value={courseIcon}
                  onChange={(e) => setCourseIcon(e.target.value)}
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
                  name="Hiring company in bd"
                  required
                  fullWidth
                  label="Hiring company in bd"
                  type="number"
                  value={hiringCompany}
                  onChange={(e) => setHiringCompany(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="how many job"
                  required
                  fullWidth
                  label="how many job"
                  type="number"
                  value={jobCount}
                  onChange={(e) => setJobCount(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="how many remote job"
                  required
                  fullWidth
                  label="how many remote job"
                  type="number"
                  value={remoteJobCount}
                  onChange={(e) => setRemoteJobCount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Inspiring Bio"
                  fullWidth
                  label="Inspiring Bio"
                  type="text"
                  value={inspiringBio}
                  onChange={(e) => setInspiringBio(e.target.value)}
                />
              </Grid>
            </Grid>

            {loading && <Loading />}
            {message ? <Alert severity={severity}>{message}</Alert> : <></>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Upload Course Type
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UploadCourseType;
