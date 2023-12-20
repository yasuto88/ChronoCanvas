import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, IconButton, Typography, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export default function StressLevelCard() {
  const targetProgress = 1;
  const animationDuration = 1000; // アニメーションの総時間（ミリ秒）
  const stepTime = 10; // 各ステップの時間（ミリ秒）
  const theme = useTheme();
  const [animatedProgress, setAnimatedProgress] = useState(0); // アニメーション用の進捗値

  useEffect(() => {
    let stepValue = (targetProgress / animationDuration) * stepTime;

    const animateProgress = () => {
      setAnimatedProgress((prevProgress) => {
        if (prevProgress < targetProgress) {
          return Math.min(prevProgress + stepValue, targetProgress); // 目標値を超えないように調整
        } else {
          clearInterval(timer); // 目標値に達したらタイマーを停止
          return targetProgress;
        }
      });
    };

    const timer = setInterval(animateProgress, stepTime);

    return () => clearInterval(timer);
  }, [targetProgress]);

  return (
    <div>
      <Card
        sx={{
          minWidth: 200,
          height: 200,
          borderRadius: 2,
          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
          position: "relative",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.3)"
              : "rgba(255, 255, 255, 0.7)",
          border: theme.palette.mode === "dark"
          ?"1px solid rgba(0, 0, 0, 0.2)"
          :"1px solid rgba(255, 255, 255, 0.4)",
          borderRightColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.2)"
              : "rgba(255, 255, 255, 0.2)",
          borderBottomColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.2)"
              : "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(20px)", // ブラウザ対応用
          WebkitBackdropFilter: "blur(20px)", // Safari向けのぼかし効果
        }}
        style={{ position: "relative" }}
      >
        <IconButton
          aria-label="settings"
          disabled
          style={{
            backgroundColor: "#EC407A",
            position: "absolute",
            top: 0,
            right: 0,
            margin: "16px",
            padding: "12px",
            boxShadow: "0 0 16px #EC407A",
          }}
          size="large"
        >
          <FavoriteIcon sx={{ fontSize: 32 }} style={{ color: "white" }} />
        </IconButton>

        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "space-between",
              height: "160px",
              marginBottom: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                maxWidth: "50%",
                wordWrap: "break-word",
              }}
              color="text.secondary"
              gutterBottom
            >
              STRESS LEVEL
            </Typography>

            <Typography
            color="text.secondary"
              sx={{
                fontSize: 32,
                fontWeight: "normal",
                position: "relative",
                paddingRight: "40px",
              }}
            >
              {`Lv${animatedProgress.toFixed(1)}`}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <SentimentVerySatisfiedIcon
                sx={{ fontSize: 36 }}
                style={{ color: "#9E9E9E" }}
              />
              <SentimentSatisfiedAltIcon
                sx={{ fontSize: 36 }}
                style={{ color: "#EC407A" }}
              />
              <SentimentSatisfiedIcon
                sx={{ fontSize: 36 }}
                style={{ color: "#9E9E9E" }}
              />
              <SentimentDissatisfiedIcon
                sx={{ fontSize: 36 }}
                style={{ color: "#9E9E9E" }}
              />
              <SentimentVeryDissatisfiedIcon
                sx={{ fontSize: 36 }}
                style={{ color: "#9E9E9E" }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
