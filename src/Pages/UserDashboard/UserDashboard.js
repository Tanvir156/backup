import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Person4Icon from "@mui/icons-material/Person4";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import LogoutIcon from "@mui/icons-material/Logout";
import ClassJoining from "./../../components/UserDashBoard/ClassJoining";
import MyCourses from "./../../components/UserDashBoard/MyCourses";
import Recoarding from "./../../components/UserDashBoard/Recoarding";
import Resources from "./../../components/UserDashBoard/Resources";
import Skillable from "./../../components/UserDashBoard/Skillable";
import Telentpull from "./../../components/UserDashBoard/Telentpull";
import JoinFullIcon from "@mui/icons-material/JoinFull";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import VideocamIcon from "@mui/icons-material/Videocam";
import SourceIcon from "@mui/icons-material/Source";
import Imagew from "./../../image/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../action/userAction";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  position: "relative",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  position: "relative",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    zIndex: "-2",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "relative",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("Inbox");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (text) => {
    setSelectedItem(text);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Class Joining":
        return <ClassJoining />;
      case "My Courses":
        return <MyCourses />;
      case "Recoarding":
        return <Recoarding />;
      case "Resources":
        return <Resources />;
      case "Skillable":
        return <Skillable />;
      case "Telentpul":
        return <Telentpull />;
      default:
        return <MyCourses />;
    }
  };

  const getListItemIcon = (text) => {
    switch (text) {
      case "Class Joining":
        return <JoinFullIcon />;
      case "My Courses":
        return <LibraryBooksIcon />;
      case "Recoarding":
        return <VideocamIcon />;
      case "Resources":
        return <SourceIcon />;
      case "Skillable":
        return <ScatterPlotIcon />;
      case "Telentpull":
        return <Person4Icon />;
      default:
        return <InboxIcon />;
    }
  };
  const his = useNavigate();
  const dispatch = useDispatch();
  const logoutHandeler = () => {
    dispatch(logout());
    his("/");
  };
  return (
    <Box sx={{ display: "flex" }} style={{ position: "relative" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ minHeight: "69px" }}>
        <Toolbar>
          {!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
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
              src={Imagew}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Class Joining", "My Courses", "Recoarding"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleItemClick(text)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "left",
                  px: 2.5,
                }}
                style={{ padding: "25px" }}
              >
                <ListItemIcon>{getListItemIcon(text)}</ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Resources", "Skillable"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleItemClick(text)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "left",
                  px: 2.5,
                }}
                style={{ padding: "25px" }}
              >
                <ListItemIcon>{getListItemIcon(text)}</ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={logoutHandeler}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "left",
                px: 2.5,
              }}
              style={{ padding: "25px" }}
            >
              <LogoutIcon />
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        style={{ background: "#f9f9fa" }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
}
