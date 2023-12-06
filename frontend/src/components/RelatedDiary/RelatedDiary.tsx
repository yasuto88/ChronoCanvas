import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import React from "react";

interface DiaryCardProps {
  title: string;
  entryDate: string;
  content: string;
  tags: string[];
}

const RelatedDiary = ({ title, entryDate, content, tags }: DiaryCardProps) => {
  const handleClick = () => {};
  return (
    <Card sx={{ margin: "16px 8px" }}>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {new Date(entryDate).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body2"
          paragraph
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
          }}
        >
          {content}
        </Typography>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 1}}
        >
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              color="primary"
              variant="outlined"
              onClick={handleClick}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RelatedDiary;
