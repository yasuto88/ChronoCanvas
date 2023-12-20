import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

interface DiaryCardProps {
  id: string;
  title: string;
  entryDate: string;
  content: string;
  tags: string[];
}

const DiaryCard = ({ id, title, entryDate, content, tags }: DiaryCardProps) => {
  const router = useRouter();
  const handleClick = () => {};
  return (
    <Card
      sx={{
        marginBottom: 2,
        boxShadow: "0px 8px 20px rgba(33, 150, 243, 0.2)",
        overflow: "hidden",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0px 16px 40px rgba(33, 150, 243, 0.4)",
        },
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(`/DiaryPage/${id}`);
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        {/* <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {new Date(entryDate).toLocaleDateString()}
        </Typography> */}
        {/* <Typography
          variant="body2"
          paragraph
          sx={{
            whiteSpace: 'pre-line',
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {content}
        </Typography> */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tags &&
            tags.map((tag) => (
              <Chip
                key={tag}
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
