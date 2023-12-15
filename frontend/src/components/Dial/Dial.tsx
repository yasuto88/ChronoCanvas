import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BarChartIcon from "@mui/icons-material/BarChart";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const actions = [
  { text: "Diary", icon: <AutoStoriesIcon />, path: "/" },
  { text: "Calender", icon: <CalendarMonthIcon />, path: "/CalendarPage" },
  { text: "Report", icon: <BarChartIcon />, path: "/ReportPage" },
  { text: "Post", icon: <EditIcon />, path: "/PostPage" },
  { text: "Setting", icon: <SettingsIcon />, path: "/" },
];

export default function Dial() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  return (
    <Box
      sx={{
        [theme.breakpoints.up("sm")]: {
          display: "none",
        },
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        color="primary"
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: 32, right: 16 }}
        icon={<MenuOutlinedIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {[...actions].reverse().map((action) => (
          <SpeedDialAction
            key={action.text}
            icon={action.icon}
            tooltipTitle={action.text}
            tooltipOpen
            onClick={() => {
              handleClose();
              router.push(action.path);
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
