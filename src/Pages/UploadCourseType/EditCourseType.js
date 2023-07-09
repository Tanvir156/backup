import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

import { Alert } from "@mui/material";
const UploadCourseType = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { id } = useParams();
  const theme = createTheme();
  const currencies = [
    {
      defaultValue: "Professional",
      label: "Professional",
    },
    {
      defaultValue: "Academic",
      label: "Academic",
    },
    {
      defaultValue: "Skill Development",
      label: "Skill_Development",
    },
  ];
  const [details, setDetails] = useState("");

  const [message, setMessage] = useState("");

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
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    fetch(`http://localhost:5000/api/course/type/${id}`, config)
      .then((res) => res.json())
      .then((result) => {
        setDetails(result);
      });
  }, []);
  const updateDataToDB = (e) => {
    e.preventDefault();

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
      .put(`http://localhost:5000/api/course/type/update/${id}`, data, config)
      .then((response) => {
        console.log("Data updated successfully");
        setLoading(false);
        setSeverity("success");
        setMessage("Course Updated");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        setLoading(false);
        setSeverity("error");
        setMessage(error.response.data.error);
      });
  };

  return (
    <>
      {details ? (
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
                Edit Course Type
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={updateDataToDB}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select"
                      helperText="Please select your course type"
                      value={courseType || details.courseType}
                      onChange={(e) => setCourseType(e.target.value)}
                    >
                      {currencies.map((option) => (
                        <MenuItem
                          key={option.defaultValue}
                          value={option.defaultValue}
                        >
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
                      defaultValue={details.courseName}
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
                      defaultValue={details.courseIcon}
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
                      defaultValue={details.courseBio}
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
                      defaultValue={details.hiringCompany}
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
                      defaultValue={details.jobCount}
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
                      defaultValue={details.remoteJobCount}
                      onChange={(e) => setRemoteJobCount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="Inspiring Bio"
                      fullWidth
                      label="Inspiring Bio"
                      type="text"
                      defaultValue={details.inspiringBio}
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
      ) : (
        <>
          <p>Loading....</p>
        </>
      )}
    </>
  );
};

export default UploadCourseType;
