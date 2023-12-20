import React, { useState, useEffect } from "react";
// import PickUp from "@/components/PickUp/PickUp";
import DiaryList from "@/components/Diary/DiaryList";
import { DiaryEntry } from "../../types/interfaces";
import {
  Box,
  CssBaseline,
  Fab,
  SwipeableDrawer,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Global } from "@emotion/react";
import PickUp from "@/components/PickUp/PickUp";
import { Client as NotionClient } from "@notionhq/client";
import { GetStaticProps, GetStaticPropsContext } from "next";

const drawerBleeding = 24;

interface Props {
  entries: DiaryEntry[];
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

const MonthDiaryPage = ({ entries, window }: Props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;

  // const fetchData = async () => {
  //   try {
  //     // APIルートへのリクエスト
  //     const response = await fetch("/api/database");
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }
  //     const data = await response.json();
  //     // データの設定
  //     setEntries(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
            keepMounted: true,
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
            {/* <PickUp entries={entries} /> */}
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN,
  });
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    return { props: { entries: null } };
  }

  let entries: {}[] = [];

  if (databaseId) {
    try {
      const monthParam = context.params?.month;
      if (typeof monthParam !== "string") {
        return {
          notFound: true,
        };
      }
      const [year, month] = monthParam.split("-").map(Number); // 文字列を数値に変換

      // 指定された月の初日
      const firstDayOfMonth = new Date(year, month - 1, 1)
        .toISOString()
        .split("T")[0];

      // 指定された月の最終日
      const lastDayOfMonth = new Date(year, month, 1)
        .toISOString()
        .split("T")[0]; // 月は0から始まるので month をそのまま使用

      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: "entryDate",
              date: {
                after: firstDayOfMonth,
              },
            },
            {
              property: "entryDate",
              date: {
                on_or_before: lastDayOfMonth,
              },
            },
          ],
        },
        sorts: [{ property: "entryDate", direction: "ascending" }],
      });

      entries = response.results.map((page: any) => {
        const properties = page.properties;

        // ここでは仮のコンテンツを返します
        const content = "ページの内容はここに追加される";

        return {
          entryId: page.id,
          title: properties.title?.title?.[0]?.plain_text ?? "",
          content, // 追加
          entryDate: properties.entryDate?.date?.start ?? "",
          studyTime: properties.studyTime?.number ?? 0,
          tags:
            properties.tags?.multi_select?.map((tag: any) => tag.name) ?? [],
          ratings: {
            focusLevel: properties.focusLevel?.number ?? 0,
            progressMeter: properties.progressMeter?.number ?? 0,
            growthIndex: properties.growthIndex?.number ?? 0,
            stressScale: properties.stressScale?.number ?? 0,
          },
        };
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      entries = [];
    }
  }

  return {
    props: { entries: entries.length > 0 ? entries : null },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default MonthDiaryPage;
