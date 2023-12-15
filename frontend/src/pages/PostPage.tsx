import React from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Divider,
  useTheme,
  ButtonGroup,
} from "@mui/material";
import PostTags from "@/components/Post/PostTags";
import RatingsComponent from "@/components/Post/RatingsComponent";
import MarkdownTabs from "@/components/Post/MarkdownEditor";
import PostButton from "@/components/Post/PostButton";

const PostPage = () => {
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;
  return (
    <Box
      sx={{
        marginLeft: `${drawerWidth}px`,
        paddingTop: "80px",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background:
          "linear-gradient(to right, rgba(224, 64, 251, 0.1), rgba(33, 150, 243, 0.1))",
        [theme.breakpoints.down("lg")]: {
          marginLeft: `${drawerMobileWidth}px`,
        },
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "0px",
        },
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

          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <PostButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PostPage;
