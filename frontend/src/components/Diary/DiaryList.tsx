import React, { useState } from "react";
import styles from "./DiaryList.module.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DiaryCard from "./DiaryCard";
import { DiaryEntry } from "../../types/interfaces";
import { useTheme } from "@mui/material";

interface DiaryListProps {
  entries: DiaryEntry[];
}

const DiaryList: React.FC<DiaryListProps> = ({ entries }) => {
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };
  return (
    <Box
      sx={{
        marginRight: "320px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.down("md")]:{
          marginRight: "0px",
        }
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
            width: "320px",
          }}
        >
          <IconButton onClick={handlePrevMonth}>
            <ArrowBackIosNewIcon sx={{ color: "var(--main-color)" }} />
          </IconButton>
          <Typography variant="h6">
            {currentMonth.getFullYear()}年{" "}
            {currentMonth.toLocaleString("default", { month: "long" })}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIosIcon sx={{ color: "var(--main-color)" }} />
          </IconButton>
        </Box>
        <Box sx={{ padding: 2 }}>
          {entries.map((entry) => (
            <DiaryCard
              key={entry.entryId}
              title={entry.title}
              entryDate={entry.entryDate}
              content={entry.content}
              tags={entry.tags}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DiaryList;
