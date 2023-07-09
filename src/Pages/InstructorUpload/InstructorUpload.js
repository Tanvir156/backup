import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Loading from "./../../components/LoginRegister/Loading";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";
const InstructorUpload = () => {
  const theme = createTheme();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [loading, setLoading] = useState(false);

  const [picMessage, setPicMessage] = useState(null);
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [about, setAbout] = useState("");
  const [severity, setSeverity] = useState(null);
  const [instructorName, setInstructorName] = useState(null);
  const [profile, setProfile] = useState("");

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
          setProfile(data.url.toString());
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
      instructorName,
      linkedin,
      facebook,
      about,
      profile,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/api/course/instructor/upload", data, config)
      .then((response) => {
        // Handle the response from the server
        console.log("Data inserted successfully");
        setLoading(false);
        setSeverity("success");
        setMessage("Instructor Details Uploaded");
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
            Instructor Form
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
                  name="Instructor Name"
                  required
                  fullWidth
                  label="Instructor Name"
                  autoFocus
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
                  autoFocus
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="Instructor Facebook Link"
                  required
                  fullWidth
                  label="Instructor Facebook Link"
                  autoFocus
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="Working Place and position"
                  required
                  fullWidth
                  label="Working Place and position"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
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

export default InstructorUpload;
