import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

interface DiaryCardProps {
  title: string;
  entryDate: string;
  content: string;
  tags: string[];
}

const DiaryCard = ({ title, entryDate, content, tags }: DiaryCardProps) => {
  const handleClick = () => {};
  return (
    <Card
      sx={{
        marginBottom: 2,
        maxWidth: 600,
        boxShadow: "0px 8px 20px rgba(33, 150, 243, 0.2)",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#fff",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: '0px 16px 40px rgba(33, 150, 243, 0.4)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {new Date(entryDate).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body2"
          paragraph
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {content}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              color="primary"
              variant="outlined"
              size="small"
              onClick={handleClick}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
