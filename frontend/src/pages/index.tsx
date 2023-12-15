import React, { useState, useEffect } from "react";
import PickUp from "@/components/PickUp/PickUp";
import DiaryList from "@/components/Diary/DiaryList";
import { DiaryEntry } from "../types/interfaces";
import {
  Box,
  Button,
  CssBaseline,
  Fab,
  Skeleton,
  SwipeableDrawer,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Global } from "@emotion/react";

const drawerBleeding = 24;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const HomePage = (props: Props) => {
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;

  useEffect(() => {
    const fetchData = async () => {
      const response = await import("../../data.json");
      setEntries(response.DiaryEntries);
    };
    fetchData();
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        marginLeft: `${drawerWidth}px`,
        paddingTop: "64px",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: (theme) => theme.palette.gradient.primary,
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
      <DiaryList entries={entries} />
      <Box
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      >
        <PickUp entries={entries} />
      </Box>

      <Fab
        variant="extended"
        color="primary"
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          bottom: theme.spacing(4),
          left: theme.spacing(8),
          mr: 1,
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
          [theme.breakpoints.down("sm")]: {
            left: theme.spacing(2),
          },
        }}
      >
        Pick Up
      </Fab>
      <Root>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: open ? `calc(50% - ${drawerBleeding}px)` : 0,
              // height:`calc(50% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          }}
        />
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={0}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}></Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <PickUp entries={entries} />
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </Box>
  );
};

export default HomePage;
