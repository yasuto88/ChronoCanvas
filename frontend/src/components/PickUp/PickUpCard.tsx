import React from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

interface DiaryCardProps {
  title: string;
  entryDate: string;
  content: string;
  tags: string[];
}

const PickUpCard = ({ title, entryDate, content, tags }: DiaryCardProps) => {
  const handleClick = () => {};
  return (
    <Card
      sx={{
        margin: "16px 8px",
        boxShadow: "0px 8px 20px rgba(0,0,0, 0.2)",
		borderRadius: "16px",
		"&:hover": {
			boxShadow: '0px 16px 40px rgba(0,0,0, 0.4)',
		  },
      }}
    >
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              color="primary"
              variant="outlined"
              onClick={handleClick}
			  size="small"
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PickUpCard;
