import React from "react";
import StudyProgressCard from "@/components/Report/Card/StudyProgressCard";
import StressLevelCard from "@/components/Report/Card/StressLevelCard";
import WordCountCard from "@/components/Report/Card/WordCountCard";
import DiaryContinueCountCard from "@/components/Report/Card/DiaryContinueCountCard";
import StudyTimeBarChart from "@/components/Report/Chart/StudyTimeBarChart";
import StudyTimeRanking from "@/components/Report/StudyTimeRanking";
import { Box, Grid } from "@mui/material";

const ReportPage = () => {
  return (
    <Box
      sx={{
        padding: "80px 0 0 240px",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background:
          "linear-gradient(to right, rgba(224, 64, 251, 0.1), rgba(33, 150, 243, 0.1))",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ width: "100%", justifyContent: "space-evenly" ,marginTop:"16px"}}
      >
        <StudyProgressCard />
        <StressLevelCard />
        <WordCountCard />
        <DiaryContinueCountCard />
      </Grid>
      <Box
        sx={{
          width: "100%",
          margin: "32px 0",
          padding: "0 32px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ width: "70%" }}>
          <StudyTimeBarChart />
        </Box>
        <Box sx={{ width: "30%" }}>
          <StudyTimeRanking />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportPage;
