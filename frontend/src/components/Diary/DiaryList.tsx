import React, { use, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DiaryCard from "./DiaryCard";
import { DiaryEntry } from "../../types/interfaces";
import {
  Grid,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";

interface DiaryListProps {
  entries: DiaryEntry[];
}

const DiaryList: React.FC<DiaryListProps> = ({ entries }) => {
  const theme = useTheme();
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (router.isReady) {
      const pathMonth = router.query.month as string; // 'YYYY-MM' 形式
      if (pathMonth) {
        const [year, month] = pathMonth.split("-").map(Number);
        setCurrentMonth(new Date(year, month - 1)); // 月は0から始まるので-1
      }
    }
  }, [router.isReady, router.query.month]);

  const navigateToMonth = (newMonth: Date) => {
    const year = newMonth.getFullYear();
    const month = newMonth.getMonth() + 1; // JavaScriptの月は0から始まるので+1
    const monthStr = `${year}-${month.toString().padStart(2, "0")}`; // 'YYYY-MM' 形式に変換
    router.push(`/Diaries/${monthStr}`); // URLを変更
  };

  // const formatDate = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   const options: Intl.DateTimeFormatOptions = {
  //     month: "long",
  //     day: "numeric",
  //   };
  //   const formattedDate = date.toLocaleDateString("en-US", options);
  //   return formattedDate.replace(/\s/g, "."); // スペースをピリオドに置換して "July.11" の形式に変換
  // };

  const handlePrevMonth = () => {
    const newMonth = new Date(
      currentMonth.setMonth(currentMonth.getMonth() - 1)
    );
    setCurrentMonth(newMonth);
    navigateToMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(
      currentMonth.setMonth(currentMonth.getMonth() + 1)
    );
    setCurrentMonth(newMonth);
    navigateToMonth(newMonth);
  };

  const connectorStyles = {
    "& .MuiStepConnector-line": {
      minHeight: 48,
      borderLeftStyle: "solid",
    },
  };

  // 指定された日付文字列をフォーマットする関数
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).replace(/\s/g, ".");
  };

  // 現在の月の日数を取得する関数
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 現在の月の日付ごとにステップを生成する
  const daysInMonth = getDaysInMonth(currentMonth);
  const currentDate = new Date();
  let monthSteps;
  
  
  if (entries) {
    monthSteps = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const dateStr = `${currentMonth.getFullYear()}-${(
        currentMonth.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const entry = entries.find((e) => e.entryDate.startsWith(dateStr));
  
      const stepDate = new Date(dateStr);
  
      // 現在の日付よりも後の日付は表示しない
      if (stepDate > currentDate) {
        return null;
      }
  
      return (
        <Step key={dateStr}>
          <StepLabel
            icon={
              entry ? (
                <CheckCircleIcon color="primary" />
              ) : (
                <ReportProblemIcon color="error" />
              )
            }
          >
            <Typography variant="caption" sx={{ display: "block" }}>
              {formatDate(new Date(dateStr))}
            </Typography>
            {entry ? (
              <DiaryCard
                id={entry.entryId}
                title={entry.title}
                entryDate={entry.entryDate}
                content={entry.content}
                tags={entry.tags}
              />
            ) : (
              <Typography variant="body2" color="textSecondary"></Typography>
            )}
          </StepLabel>
        </Step>
      );
    }).filter(Boolean); // null をフィルタリングする
  }

  return (
    <Box
      sx={{
        marginRight: "320px",
        marginBottom: "64px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
          marginRight: "0px",
        },
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
        <Box sx={{ padding: 2, width: "100%" }}>
          <Stepper
            orientation="vertical"
            connector={<StepConnector sx={connectorStyles} />}
          >
            {monthSteps}
          </Stepper>
        </Box>
      </Box>
    </Box>
  );
};

export default DiaryList;
