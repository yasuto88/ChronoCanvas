import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Rating,
} from "@mui/material";
import { useRouter } from "next/router";
import { DiaryEntry } from "../types/interfaces";

// 日記ページコンポーネント
function DiaryPage() {
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const router = useRouter();
  const { entryId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const response = await import("../../data.json");
      const matchedEntry = response.DiaryEntries.find(
        (e) => e.entryId === entryId
      );
      setEntry(matchedEntry || null);
    };

    if (entryId) {
      fetchData();
    }
  }, [entryId]);

  if (!entry) {
    return <p>データを読み込んでいます...</p>;
  }

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">{entry.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(entry.entryDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {entry.content}
        </Typography>

        <Box sx={{ marginTop: 2, display: "flex", gap: 1 }}>
          {entry.tags.map((tag) => (
            <Chip label={tag} key={tag} />
          ))}
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">勉強時間: {entry.studyTime}分</Typography>
          <Typography variant="body2">
            集中度: <Rating value={entry.ratings.focusLevel} readOnly />
          </Typography>
          <Typography variant="body2">
            進捗度: <Rating value={entry.ratings.progressMeter} readOnly />
          </Typography>
          <Typography variant="body2">
            成長指数: <Rating value={entry.ratings.growthIndex} readOnly />
          </Typography>
          <Typography variant="body2">
            ストレスレベル:{" "}
            <Rating value={entry.ratings.stressScale} readOnly />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DiaryPage;
