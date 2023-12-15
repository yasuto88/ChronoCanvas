import React from "react";
import styles from "./PickUp.module.css";
import { DiaryEntry } from "../../types/interfaces";
import { Box, Typography, useTheme } from "@mui/material";
import PickUpCard from "./PickUpCard";

interface DiaryListProps {
  entries: DiaryEntry[];
}

const PickUp: React.FC<DiaryListProps> = ({ entries }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        m: 2,
        width: "320px",
        height: "85vh",

        [theme.breakpoints.down("md")]: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 0,
          width: "100%",
          height: "100%",
        },
        [theme.breakpoints.up("md")]: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "32px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          overflowY: "scroll",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ margin: 3, textAlign: "center" }}
      >
        Pick Up
      </Typography>
      <Box
        sx={{
          padding: 2,
          [theme.breakpoints.down("md")]: {
            padding:3,
          },
        }}
      >
        {entries.map((entry) => (
          <PickUpCard
            key={entry.entryId}
            title={entry.title}
            entryDate={entry.entryDate}
            content={entry.content}
            tags={entry.tags}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PickUp;
