import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../../action/userAction";
import Image from "./../../../image/logo.png";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    if (event.target.textContent === "Logout") {
      logoutHandeler();
    }
    if (event.target.textContent === "Login") {
      his("/login");
    }
    setAnchorElUser(null);
  };
  const his = useNavigate();
  const logoutHandeler = () => {
    dispatch(logout());
    his("/");
  };

  return (
    <AppBar
      position="static"
      style={{
        background: "rgb(18, 115, 235)",
        position: "sticky",
        top: "0",
        zIndex: "1111",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              alt=""
              width="150px"
              className="Logo_logo__2Rtha"
              src={Image}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                component={Link}
                to={userInfo ? "/dashboard" : "/login"}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">
                  {" "}
                  {userInfo ? "DashBoard" : "Login"}
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to={"/admin"}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">
                  {userInfo && userInfo.email === "rana525203@gmail.com"
                    ? "Admin"
                    : ""}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Link to="/">
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                alt=""
                width="150px"
                className="Logo_logo__2Rtha"
                src={Image}
              />
            </Typography>{" "}
          </Link>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            style={{ justifyContent: "right" }}
          >
            <MenuItem
              component={Link}
              to={userInfo ? "/dashboard" : "/login"}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">
                {userInfo ? "DashBoard" : "Login"}
              </Typography>
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/admin"}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">
                {userInfo && userInfo.email === "rana525203@gmail.com"
                  ? "Admin"
                  : ""}
              </Typography>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userInfo ? (
                  <Avatar alt="Remy Sharp" src={userInfo.pic} />
                ) : (
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
