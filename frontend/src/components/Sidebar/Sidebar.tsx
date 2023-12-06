import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BarChartIcon from "@mui/icons-material/BarChart";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import path from "path";

const drawerWidth = 240;
const drawerMobileWidth = 56;

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    { text: "日記", icon: <AutoStoriesIcon />, path: "/" },
    { text: "カレンダー", icon: <CalendarMonthIcon />, path: "/CalendarPage" },
    { text: "レポート", icon: <BarChartIcon />, path: "/ReportPage" },
  ];

  const editItems = [
    { text: "投稿する", icon: <EditIcon />, path: "/" },
    { text: "タスクの追加・編集", icon: <EditCalendarIcon />, path: "/" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton href={item.path}>
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
            <ListItemButton href={item.path}>
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
    <Box sx={{ display: "flex" }}>
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
