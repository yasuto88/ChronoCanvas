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

const drawerWidth = 240;
const drawerMobileWidth = 56;

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  

  function renderIcon(index: number) {
    switch (index) {
      case 0:
        return <AutoStoriesIcon />;
      case 1:
        return <CalendarMonthIcon />;
      case 2:
        return <BarChartIcon />;
      case 3:
        return <EditIcon />;
      case 4:
        return <EditCalendarIcon />;
      default:
        return null;
    }
  }

  const menuItems = [
    { text: "Diary", icon: <AutoStoriesIcon />, path: "/" },
    { text: "Calender", icon: <CalendarMonthIcon />, path: "/CalendarPage" },
    { text: "Report", icon: <BarChartIcon />, path: "/ReportPage" },
  ];

  const editItems = [
    { text: "Post", icon: <EditIcon />, path: "/" },
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
      <List>
        <ListItem disablePadding>
          <ListItemButton
            style={{
              backgroundColor: "rgba(60,60,60,0.1)",
              borderRadius: "32px",
              height: "48px",
              margin: "16px",
            }}
          >
            <ListItemIcon>
              <SearchIcon style={{ paddingRight: "8px" }} />
              {"Search"}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
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
      <List>
        <ListItem disablePadding>
          <ListItemButton
            style={{
              borderRadius: "56px",
              height: "56px",
            }}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
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
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
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
          display: { xs: "block", md: "none" },
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
