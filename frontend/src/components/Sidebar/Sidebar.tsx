import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BarChartIcon from "@mui/icons-material/BarChart";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { CssBaseline, Toolbar } from "@mui/material";

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;
  const menuItems = [
    { text: "Diary", icon: <AutoStoriesIcon />, path: "/" },
    { text: "Calender", icon: <CalendarMonthIcon />, path: "/CalendarPage" },
    { text: "Report", icon: <BarChartIcon />, path: "/ReportPage" },
  ];

  const editItems = [
    { text: "Post", icon: <EditIcon />, path: "/PostPage" },
    { text: "Setting", icon: <SettingsIcon />, path: "/" },
  ];

  const getButtonStyle = (path: string) => {
    return router.pathname === path
      ? {
          backgroundColor: "rgba(33, 150, 243,0.1)",
          borderRadius: "8px",
          margin: "4px",
        }
      : {
          borderRadius: "8px",
          margin: "4px",
        };
  };

  const drawer = (
    <div>
      <Toolbar />
      
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton href={item.path} style={getButtonStyle(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {editItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton href={item.path} style={getButtonStyle(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const drawerMobile = (
    <div>
      <Toolbar />
      
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton href={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {editItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton href={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      }}  
    >
      <Drawer
      
        variant="permanent"
        sx={{
          [theme.breakpoints.down("lg")]: {
            display: "none",
          },
          [theme.breakpoints.up("lg")]: {
            display: "block",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          [theme.breakpoints.down("lg")]: {
            display: "block",
          },
          [theme.breakpoints.up("lg")]: {
            display: "none",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerMobileWidth,
          },
        }}
      >
        {drawerMobile}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
