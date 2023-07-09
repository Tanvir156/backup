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
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SubjectIcon from "@mui/icons-material/Subject";
import AllStudent from "./../../components/Admin/AllStudent";
import AllCourse from "./../../components/Admin/AllCourse";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import InstructorUpload from "./../../Pages/InstructorUpload/InstructorUpload";
import CategoryIcon from "@mui/icons-material/Category";
import EditCatagoiesCard from "./../../components/Frontpage/Courses/EditCatagoriesCard";
import HiredPeople from "./../../components/Admin/HiredPeople";
import InstructorControll from "./../../components/Admin/InstructorControll";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GotHiredController from "./../../components/Admin/GotHiredController";
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
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Admin() {
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
      case "Student":
        return <AllStudent />;
      case "Courses":
        return <AllCourse />;
      case "Add Instructor":
        return <InstructorUpload />;
      case "Catagories":
        return <EditCatagoiesCard />;
      case "Add Hired People":
        return <HiredPeople />;
      case "Instructor":
        return <InstructorControll />;
      case "Got Hired":
        return <GotHiredController />;
      default:
        return <AllStudent />;
    }
  };

  const getListItemIcon = (text) => {
    switch (text) {
      case "Student":
        return <HowToRegIcon />;
      case "Courses":
        return <SubjectIcon />;
      case "Add Instructor":
        return <AddCircleOutlineIcon />;
      case "Catagories":
        return <CategoryIcon />;
      case "Got Hired":
        return <CastForEducationIcon />;
      case "Add Hired People":
        return <AddCircleOutlineIcon />;
      case "Instructor":
        return <CastForEducationIcon />;
      default:
        return <SubjectIcon />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
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
          <Typography variant="h6" noWrap component="div">
            Courseelo
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
          {["Student"].map((text, index) => (
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
          {[
            "Catagories",
            "Courses",
            "Instructor",
            "Add Instructor",
            "Got Hired",
            "Add Hired People",
          ].map((text, index) => (
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
