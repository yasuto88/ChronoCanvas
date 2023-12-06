import React from "react";
import styles from "./ReportPage.module.css";
import StudyProgressCard from "@/components/Report/Card/StudyProgressCard";
import StressLevelCard from "@/components/Report/Card/StressLevelCard";
import WordCountCard from "@/components/Report/Card/WordCountCard";
import DiaryContinueCountCard from "@/components/Report/Card/DiaryContinueCountCard";
import StudyTimeBarChart from "@/components/Report/Chart/StudyTimeBarChart";
import StudyTimeRanking from "@/components/Report/StudyTimeRanking";

const ReportPage = () => {
  return (
    <div className={styles.ReportPage}>
      <div className={styles.card}>
        <StudyProgressCard />
        <StressLevelCard />
        <WordCountCard />
        <DiaryContinueCountCard />
      </div>
      <div className={styles.chart}>
        <div className={styles.studyChart}>
          <StudyTimeBarChart />
        </div>
        <div className={styles.ranking}>
          <StudyTimeRanking />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
