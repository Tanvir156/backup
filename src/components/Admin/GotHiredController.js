import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
function GotHiredController() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/coursefetch/hiredpeople/all"
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };

    fetchData();
  }, []);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteId(null);
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(
        `http://localhost:5000/api/coursefetch/hiredpeople/delete/${deleteId}`,
        config
      );
      handleClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error response if needed
    }
  };
  return (
    <div className="grid">
      {details.length === 0 ? (
        <div className="loading-text">Loading...</div>
      ) : (
        details.map((detail, index) => (
          <li className="GotHiredSection_slide_card__I_MKK" key={index}>
            <div className="TalentCard3_talent_card__2qZaO">
              <div className="TalentCard3_avatar_container__z9U9J">
                <img src={detail.profile} alt="" />
              </div>
              <div className="TalentCard3_talent_card_header__kVIG8">
                <p className="subtitle_s2">{detail.instructorName}</p>
                <p className="body_paragraph">{detail.about}</p>
              </div>
              <div>
                {userInfo && userInfo.email === "rana525203@gmail.com" ? (
                  <Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItem: "center",
                        margin: "auto",
                      }}
                      onClick={() => handleOpen(detail._id)}
                    >
                      Delete
                    </Button>
                  </Link>
                ) : null}
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
              </div>
              <div className="TalentCard3_talent_card_footer__30uNH">
                <img alt="" src={detail.logo} style={{ maWidth: "44px" }} />
                <p className="caption">{detail.companyName}</p>
              </div>
            </div>
          </li>
        ))
      )}
    </div>
  );
}

export default GotHiredController;
