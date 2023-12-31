import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import EditIcon from "@mui/icons-material/Edit";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import Searchbar from "./Searchbar";
import { useRouter } from "next/router";
import { usePaletteMode } from "../../states/paletteModeState";

interface Props {
  window?: () => Window;
}

export default function Header(props: Props) {
  const { window } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;
  const mobileMenuId = "primary-search-account-menu-mobile";
  const [paletteMode, setPaletteMode] = usePaletteMode();

  const handleThemeChange = () => {
    setPaletteMode(paletteMode === "light" ? "dark" : "light");
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="primary">
          <GitHubIcon />
        </IconButton>
        <p>GitHub</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="primary"
          onClick={handleThemeChange}
        >
          <Brightness4Icon />
        </IconButton>
        <p>ダークモード</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <p>投稿する</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        // position="static"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? "var(--header-background-dark)"
              : "var(--header-background)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          [theme.breakpoints.up("lg")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          },
          [theme.breakpoints.down("lg")]: {
            width: `calc(100% - ${drawerMobileWidth}px)`,
            ml: `${drawerMobileWidth}px`,
          },
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            ml: 0,
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "2rem",
              fontWeight: "normal",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "-webkit-linear-gradient( 45deg,rgb(224, 64, 251), rgb(33, 150, 243))",
              [theme.breakpoints.down("md")]: {
                fontSize: "1.5rem",
                marginRight: "1rem",
              },
              xs: {
                fontSize: "1.5rem",
                marginRight: "0.5rem",
              },
            }}
          >
            <Link href="/" underline="none">
              ChronoCanvas
            </Link>
          </Typography>
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            <Searchbar />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="GitHub" arrow>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="primary"
                href="https://github.com/yasuto88/ChronoCanvas"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="ダークモード" arrow>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="primary"
                onClick={handleThemeChange}
              >
                <Brightness4Icon />
              </IconButton>
            </Tooltip>
            <Tooltip title="投稿する" arrow>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="primary"
                href="/PostPage"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
