import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import EditIcon from "@mui/icons-material/Edit";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import Searchbar from "./Searchbar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";

interface Props {
  window?: () => Window;
}

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
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

  const menuItems = [
    { text: "Diary", icon: <AutoStoriesIcon />, path: "/" },
    { text: "Calender", icon: <CalendarMonthIcon />, path: "/CalendarPage" },
    { text: "Report", icon: <BarChartIcon />, path: "/ReportPage" },
  ];

  const editItems = [
    { text: "Post", icon: <EditIcon />, path: "/PostPage" },
    { text: "Setting", icon: <SettingsIcon />, path: "/" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const getButtonStyle = (path: string) => {
    return router.pathname === path
      ? {
          backgroundColor: "rgba(33, 150, 243,0.1)",
          borderRadius: "8px",
          margin: "4px",
        }
      : {
          borderRadius: "8px",
          margin: "4px",
        };
  };

  const drawer = (
    <div>
      <Toolbar />
      <Box
        sx={{
          padding: "0 0.5rem",
          marginTop: "1rem",
        }}
      >
        <Searchbar />
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton href={item.path} style={getButtonStyle(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {editItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton href={item.path} style={getButtonStyle(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

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
          backgroundColor: "var(--header-background)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          [theme.breakpoints.up("lg")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            // mr: `-${drawerWidth}px`,
          },
          [theme.breakpoints.down("lg")]: {
            width: `calc(100% - ${drawerMobileWidth}px)`,
            ml: `${drawerMobileWidth}px`,
            // mr: `-${drawerWidth}px`,
          },
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            ml: 0,
          },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="open drawer"
            sx={{
              mr: 2,
              [theme.breakpoints.up("sm")]: {
                display: "none",
              },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

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
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="primary"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="primary"
            >
              <Brightness4Icon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="primary"
            >
              <EditIcon />
            </IconButton>
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
      {/* {renderMenu} */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
