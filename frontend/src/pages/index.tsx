import React, { useState, useEffect } from "react";
import PickUp from "@/components/PickUp/PickUp";
import DiaryList from "@/components/Diary/DiaryList";
import { DiaryEntry } from "../types/interfaces";
import { Box, useTheme } from "@mui/material";

const HomePage = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;

  useEffect(() => {
    const fetchData = async () => {
      const response = await import("../../data.json");
      setEntries(response.DiaryEntries);
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        paddingLeft: `${drawerWidth}px`,
        paddingTop: "64px",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background:
          "linear-gradient(to right, rgba(224, 64, 251, 0.1), rgba(33, 150, 243, 0.1))",
        [theme.breakpoints.down("lg")]: {
          paddingLeft: `${drawerMobileWidth}px`,
        },
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
        [theme.breakpoints.down("sm")]: {
          paddingLeft: "0px",
        },
      }}
    >
      <DiaryList entries={entries} />
      <PickUp entries={entries} />
    </Box>
  );
};

export default HomePage;
