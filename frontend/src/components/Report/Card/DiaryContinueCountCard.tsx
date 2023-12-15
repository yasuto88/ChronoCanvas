import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import NorthIcon from "@mui/icons-material/North";
import AddIcon from "@mui/icons-material/Add";

export default function DiaryContinueCountCard() {
  const continueCount = 17;
  const animationDuration = 1000; // アニメーションの総時間（ミリ秒）
  const stepTime = 10; // 各ステップの時間（ミリ秒）

  const [animatedProgress, setAnimatedProgress] = useState(0); // アニメーション用の進捗値

  useEffect(() => {
    let stepValue = (continueCount / animationDuration) * stepTime;

    const animateProgress = () => {
      setAnimatedProgress((prevProgress) => {
        if (prevProgress < continueCount) {
          return Math.min(prevProgress + stepValue, continueCount); // 目標値を超えないように調整
        } else {
          clearInterval(timer); // 目標値に達したらタイマーを停止
          return continueCount;
        }
      });
    };

    const timer = setInterval(animateProgress, stepTime);

    return () => clearInterval(timer);
  }, [continueCount]);

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
            backgroundColor: "#FBC02D",
            position: "absolute",
            top: 0,
            right: 0,
            margin: "16px",
            padding: "12px",
            boxShadow: "0 0 16px #FBC02D",
          }}
          size="large"
        >
          <EmojiEventsIcon sx={{ fontSize: 32 }} style={{ color: "white" }} />
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
                maxWidth: "55%",
                wordWrap: "break-word",
              }}
              color="text.secondary"
              gutterBottom
            >
              CONTINUE COUNT
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
              {`${animatedProgress.toFixed(1)} times`}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                flexDirection: "row",
              }}
            >
              <AddIcon sx={{ fontSize: 24 }} style={{ color: "#FFA000" }} />
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: "normal",
                  position: "relative",
                  paddingRight: "16px",
                  color: "#FFA000",
                }}
              >
                7
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: "normal",
                  position: "relative",
                }}
                color="text.secondary"
              >
                previous record
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
