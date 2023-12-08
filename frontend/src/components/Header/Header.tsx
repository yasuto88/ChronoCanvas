import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { Box, CssBaseline } from "@mui/material";

const drawerWidth = 240;

const Header = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "var(--header-background)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "2rem",
              fontWeight: "normal",
              background:
                "linear-gradient(to right, var(--pink), var(--main-color))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            <Link href="/">ChronoCanvas</Link>
          </Typography>
          {/* <InputBase
            placeholder="検索..."
            sx={{
              padding: "0.5rem",
              margin: "0 1rem",
              borderRadius: "8px",
              fontSize: "small",
              border: "1px solid var(--gray)",
            }}
          /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "1rem",
            }}
          >
            <IconButton
              color="inherit"
              sx={{
                padding: "8px 8px",
                borderRadius: "8px",
                marginRight: "1rem",
                border: "1px solid var(--gray)",
              }}
            >
              <Brightness4Icon sx={{ color: "var(--main-color)" }} />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://github.com/yourUsername/yourRepo"
              target="_blank"
              sx={{
                padding: "8px 8px",
                borderRadius: "8px",
                marginRight: "1rem",
                border: "1px solid var(--gray)",
              }}
            >
              <GitHubIcon sx={{ color: "var(--main-color)" }} />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px",
                borderRadius: "8px",
                marginRight: "1rem",
                border: "1px solid var(--gray)",
              }}
            >
              <EditIcon
                sx={{ color: "var(--main-color)", marginRight: "8px" }}
              />
              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontSize: "small",
                  fontWeight: "normal",
                  WebkitBackgroundClip: "text",
                  color: "var(--main-color)",
                }}
              >
                投稿する
              </Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
