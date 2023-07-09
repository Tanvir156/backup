import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function EditCategoriesCard({ title, courseBio, icon }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteId(null);
    setOpen(false);
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/course/type");
      setDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      // Retry after a delay of 1 second
      setTimeout(fetchCourses, 1000);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(
        `http://localhost:5000/api/course/coursetype/delete/${deleteId}`,
        config
      );
      handleClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error response if needed
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {details.map((detail, index) => (
        <div className="carddd" key={index} style={{ marginBottom: "15px" }}>
          <h2 className="titleee" style={{ textAlign: "center" }}>
            {detail.courseName}
          </h2>
          <div className="button-container">
            <div style={{ display: "flex", justifyContent: "center" }}>
              {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                <Link to={`/editcoursetype/${detail._id}`}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: "5px" }}
                  >
                    Edit
                  </Button>
                </Link>
              ) : null}
              {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                <Link>
                  <Button
                    style={{ margin: "5px" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen(detail._id)}
                  >
                    Delete
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCategoriesCard;
