import React from "react";
import { Box, Container, TextField, Button, Divider } from "@mui/material";
import PostTags from "@/components/Post/PostTags";
import RatingsComponent from "@/components/Post/RatingsComponent";
import MarkdownTabs from "@/components/Post/MarkdownEditor";

const PostPage = () => {
  return (
    <Box
      sx={{
        padding: "80px 0 0 240px",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background:
          "linear-gradient(to right, rgba(224, 64, 251, 0.1), rgba(33, 150, 243, 0.1))",
      }}
    >
      <Container maxWidth="md">
        <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="タイトル"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
            <PostTags />
            <Divider sx={{ mb: 2 }} />
            <RatingsComponent />
          </Box>
          <Divider sx={{ mb: 2 }} />

          <MarkdownTabs />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary">
              キャンセル
            </Button>
            <Button variant="contained" color="secondary">
              「投稿して保存」
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PostPage;
