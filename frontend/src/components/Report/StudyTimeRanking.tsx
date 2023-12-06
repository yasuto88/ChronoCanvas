import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Avatar,
  Badge,
} from "@mui/material";

const StudyTimeRanking = () => {
  const studyData = [
    { name: "React", studyHours: 120, image: "/react.png" },
    { name: "TypeScript", studyHours: 100, image: "/typescript.png" },
    { name: "Next.js", studyHours: 80, image: "/Nextjs.png" },
    { name: "Python", studyHours: 60, image: "/python.png" },
    { name: "Java", studyHours: 50, image: "/java.png" },
  ];

  // データを勉強時間で降順にソート
  studyData.sort((a, b) => b.studyHours - a.studyHours);

  return (
    <TableContainer
      component={Paper}
      style={{
        padding: "16px",
        maxHeight: "400px",
        marginTop: "16px",
        borderRadius: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRightColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(20px)", // ブラウザ対応用
        WebkitBackdropFilter: "blur(20px)", // Safari向けのぼかし効果
      }}
    >
      <Typography fontSize={24}>Ranking</Typography>
      <Podium studyData={studyData} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>name</TableCell>
            <TableCell>total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studyData.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.studyHours} h</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Podium = ({ studyData }) => {
  // 順位のスタイルを定義
  const rankStyles = {
    1: { backgroundColor: "#FBC02D", color: "#fff" }, // 金
    2: { backgroundColor: "#c0c0c0", color: "#fff" }, // 銀
    3: { backgroundColor: "#cd7f32", color: "#fff" }, // 銅
  };

  return (
    <Paper
      elevation={4}
      style={{
        padding: "8px",
        borderRadius: "16px",
        marginBottom: "16px",
        position: "relative",
        height: "160px",
        background:
          "linear-gradient(to right, rgba(33, 150, 243,0.4), rgba(33, 150, 243,0.8))",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ position: "absolute", top: "16px", width: "100%" }}
      >
        <div style={{ position: "relative", textAlign: "center" }}>
          <Avatar
            src={studyData[0].image}
            style={{ width: "70px", height: "70px", margin: "0 auto" }}
          />
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: "8px",
              transform: "translateX(-50%)",
              ...rankStyles[1],
              width: "24px",
              height: "24px",
              borderRadius: "12px",
            }}
          >
            1
          </div>
          <Typography
            variant="caption"
            display="block"
            style={{ fontSize: "0.8rem", color: "white" }}
          >
            {studyData[0].name}
          </Typography>
          <Typography
            variant="body2"
            style={{ fontSize: "0.9rem", color: "white" }}
          >
            {studyData[0].studyHours}h
          </Typography>
        </div>
      </Grid>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{
          position: "absolute",
          bottom: "8px",
          left: 0,
          right: 0,
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
      >
        <div style={{ position: "relative", textAlign: "center" }}>
          <Avatar
            src={studyData[1].image}
            style={{ width: "50px", height: "50px", margin: "0 auto" }}
          />
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: "8px",
              transform: "translateX(-50%)",
              ...rankStyles[2],
              width: "24px",
              height: "24px",
              borderRadius: "12px",
            }}
          >
            2
          </div>
          <Typography
            variant="caption"
            display="block"
            style={{ fontSize: "0.7rem", color: "white" }}
          >
            {studyData[1].name}
          </Typography>
          <Typography
            variant="body2"
            style={{ fontSize: "0.8rem", color: "white" }}
          >
            {studyData[1].studyHours}h
          </Typography>
        </div>

        <div style={{ position: "relative", textAlign: "center" }}>
          <Avatar
            src={studyData[2].image}
            style={{ width: "50px", height: "50px", margin: "0 auto" }}
          />
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: "8px",
              transform: "translateX(-50%)",
              ...rankStyles[3],
              width: "24px",
              height: "24px",
              borderRadius: "12px",
            }}
          >
            3
          </div>
          <Typography
            variant="caption"
            display="block"
            style={{ fontSize: "0.7rem", color: "white" }}
          >
            {studyData[2].name}
          </Typography>
          <Typography
            variant="body2"
            style={{ fontSize: "0.8rem", color: "white" }}
          >
            {studyData[2].studyHours}h
          </Typography>
        </div>
      </Grid>
    </Paper>
  );
};

export default StudyTimeRanking;
