import React from "react";
import StudyProgressCard from "@/components/Report/Card/StudyProgressCard";
import StressLevelCard from "@/components/Report/Card/StressLevelCard";
import WordCountCard from "@/components/Report/Card/WordCountCard";
import DiaryContinueCountCard from "@/components/Report/Card/DiaryContinueCountCard";
import StudyTimeBarChart from "@/components/Report/Chart/StudyTimeBarChart";
import StudyTimeRanking from "@/components/Report/StudyTimeRanking";
import { Box, Grid, useTheme } from "@mui/material";

const ReportPage = () => {
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;
  return (
    <Box
      sx={{
        marginLeft: `${drawerWidth}px`,
        paddingTop: "64px",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        background:
          "linear-gradient(to right, rgba(224, 64, 251, 0.1), rgba(33, 150, 243, 0.1))",
        [theme.breakpoints.down("lg")]: {
          marginLeft: `${drawerMobileWidth}px`,
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "0px",
        },
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          justifyContent: "space-evenly",
          padding: "16px",
        }}
      >
        <Grid
          item
          lg={3}
          md={6}
          sm={12}
          xs={12}
          sx={{ padding: { lg: 2, md: 1.5, sm: 1, xs: 1 } }}
        >
          <StudyProgressCard />
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          sm={12}
          xs={12}
          sx={{ padding: { lg: 2, md: 1.5, sm: 1, xs: 1 } }}
        >
          <StressLevelCard />
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          sm={12}
          xs={12}
          sx={{ padding: { lg: 2, md: 1.5, sm: 1, xs: 1 } }}
        >
          <WordCountCard />
        </Grid>
        <Grid
          item
          lg={3}
          md={6}
          sm={12}
          xs={12}
          sx={{ padding: { lg: 2, md: 1.5, sm: 1, xs: 1 } }}
        >
          <DiaryContinueCountCard />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          width: "100%",
          margin: "32px 0",
          padding: "0 32px",
          display: "flex",
          flexDirection: "row",
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
            alignItems: "center",
            margin: 0,
            padding: 0,
          },
        }}
      >
        <Box
          sx={{
            width: "60%",
            [theme.breakpoints.down("lg")]: {
              width: "100%",
            },
          }}
        >
          <StudyTimeBarChart />
        </Box>
        <Box
          sx={{
            width: "40%",
            [theme.breakpoints.down("lg")]: {
              width: "80%",
            },
          }}
        >
          <StudyTimeRanking />
        </Box>
      </Grid>
    </Box>
  );
};

export default ReportPage;
