import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";

export default function StudyProgressCard() {
  const targetProgress = 75.5;
  const animationDuration = 1000; // アニメーションの総時間（ミリ秒）
  const stepTime = 10; // 各ステップの時間（ミリ秒）

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
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderRightColor: "rgba(255, 255, 255, 0.2)",
          borderBottomColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(20px)", // ブラウザ対応用
          WebkitBackdropFilter: "blur(20px)", // Safari向けのぼかし効果
        }}
        style={{ position: "relative" }}
      >
        <IconButton
          aria-label="settings"
          disabled
          style={{
            backgroundColor: "var(--main-color)",
            position: "absolute",
            top: 0,
            right: 0,
            margin: "16px",
            padding: "12px",
            boxShadow: "0 0 16px var(--main-color)",
          }}
          size="large"
        >
          <FlagIcon sx={{ fontSize: 32 }} style={{ color: "white" }} />
        </IconButton>

        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "space-between",
              height: "140px",
              marginBottom: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                maxWidth: "55%",
                wordWrap: "break-word",
              }}
              color="text.secondary"
              gutterBottom
            >
              STUDY PROGRESS
            </Typography>
            <Typography
              sx={{
                fontSize: 32,
                fontWeight: "normal",
                position: "relative",
                paddingRight: "40px",
                color: "#212121",
              }}
            >
              {`${animatedProgress.toFixed(1)}%`}
            </Typography>
            <Box position="relative" width="100%">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  position: "absolute",
                  left: `${animatedProgress}%`,
                  top: "32px", // Adjust this value as needed to position the label above the bar
                  transform: "translateX(-50%)",
                  px: 1, // Add some horizontal padding
                  borderRadius: 1, // Optional: adds rounded corners
                }}
              >
                {animatedProgress.toFixed(1)}h
              </Typography>

              <LinearProgress
                variant="determinate"
                value={animatedProgress}
                sx={{ mt: "24px" }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "absolute",
                  width: "100%",
                  top: 0,
                  marginTop: "8px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ visibility: "hidden" }} // Hide this to not overlap with the progress bar
                >
                  0
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ position: "absolute", right: 0,top:-8 }} // Position to the right
                >
                  100h
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
