import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import PickUp from "@/components/PickUp/PickUp";
import DiaryList from "@/components/Diary/DiaryList";
import { DiaryEntry } from "../types/interfaces";

const HomePage = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await import("../../data.json");
      setEntries(response.DiaryEntries);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.body}>
      <DiaryList entries={entries} />
      <PickUp entries={entries} />
    </div>
  );
};

export default HomePage;
