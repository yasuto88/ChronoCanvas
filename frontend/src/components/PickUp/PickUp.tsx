import React from "react";
import styles from "./PickUp.module.css";
import { DiaryEntry } from "../../types/interfaces";
import { Box, Typography } from "@mui/material";
import PickUpCard from "./PickUpCard";

interface DiaryListProps {
  entries: DiaryEntry[];
}

const PickUp: React.FC<DiaryListProps> = ({ entries }) => {
  return (
    <div className={styles.pickup}>
      <Typography
        variant="h5"
        component="div"
        sx={{ margin: 3, textAlign: "center" }}
      >
        Pick Up
      </Typography>
      <Box sx={{ padding: 2 }}>
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
    </div>
  );
};

export default PickUp;
