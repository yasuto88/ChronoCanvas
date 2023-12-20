/// <reference types="uuid" />

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import allLocales from "@fullcalendar/core/locales-all.js";
import styled from "@emotion/styled";
import { Box, Typography, useTheme } from "@mui/material";
import { DiaryEntry } from "../types/interfaces";
import { Client as NotionClient } from "@notionhq/client";
import Tooltip from "@mui/material/Tooltip";
import EventIcon from "@mui/icons-material/Event";
import useMediaQuery from "@mui/material/useMediaQuery";
import router from "next/router";
import { EventContentArg } from "@fullcalendar/core/index.js";

interface Props {
  entries: DiaryEntry[];
}

interface MyCustomComponentProps {
  eventInfo: EventContentArg;
}

const CalendarPage = ({ entries }: Props) => {
  const theme = useTheme();
  const { drawerWidth, drawerMobileWidth } = theme.layout;

  const events = entries.map((entry) => {
    const startDate = new Date(entry.entryDate);
    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + entry.studyTime);

    return {
      title: entry.title,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      entryId: entry.entryId,
    };
  });

  const MyCustomComponent = ({ eventInfo }: MyCustomComponentProps) => {
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const entryId = eventInfo.event.extendedProps.entryId;
    console.log(entryId);
    return (
      <Tooltip title={eventInfo.event.title}>
        <Box
          sx={{
            padding: "8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "0.85rem",
            maxWidth: "100%",
            borderRadius: "4px",
            backgroundColor: "primary.main",
          }}
          onClick={() => {
            router.push(`/DiaryPage/${entryId}`);
          }}
        >
          {isXs ? (
            <EventIcon sx={{ color: "white" }} />
          ) : (
            <Typography variant="body2" sx={{ color: "white" }}>
              {eventInfo.event.title}
            </Typography>
          )}
        </Box>
      </Tooltip>
    );
  };

  const renderEventContent = ({ eventInfo }: MyCustomComponentProps) => {
    return <MyCustomComponent eventInfo={eventInfo} />;
  };

  const StyleWrapper =
    theme.palette.mode === "light"
      ? styled.div`
          .fc-button-primary {
            background-color: #fff;
            border-color: var(--main-color);
            color: var(--main-color);
          }

          .fc-toolbar-title {
            color: #616161;
          }

          .fc-button:hover {
            background-color: var(--main-color);
            color: #fff;
            border-color: var(--main-color);
          }

          .fc-button-primary:not(:disabled).fc-button-active {
            background-color: var(--main-color);
            color: #fff;
            border-color: var(--main-color);
          }

          .fc-button-primary:not(:disabled):active {
            background-color: var(--main-color);
            color: #fff;
            border-color: var(--main-color);
          }

          .fc-event-time {
            display: none;
          }

          .fc-h-event {
            background-color: transparent;
            border: none;
          }
        `
      : styled.div`
          .fc-button-primary {
            background-color: "#1976d2";
            border-color: #1976d2;
            color: #1976d2;
          }

          // .fc-toolbar-title {
          //   color: #212121;
          // }

          .fc-button:hover {
            background-color: #1976d2;
            color: #fff;
            border-color: #1976d2;
          }

          .fc-button-primary:not(:disabled).fc-button-active {
            background-color: #1976d2;
            color: #fff;
            border-color: #1976d2;
          }

          .fc-button-primary:not(:disabled):active {
            background-color: #1976d2;
            color: #fff;
            border-color: #1976d2;
          }

          .fc-event-time {
            display: none;
          }

          .fc-h-event {
            background-color: transparent;
            border: none;
          }
        `;

  return (
    <Box
      sx={{
        marginLeft: `${drawerWidth}px`,
        paddingTop: "72px",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: (theme) => theme.palette.gradient.primary,
        [theme.breakpoints.down("lg")]: {
          marginLeft: `${drawerMobileWidth}px`,
          flexDirection: "column",
          paddingRight: "0px",
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "0px",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "16px",
          height: "100%",
        }}
      >
        <StyleWrapper>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: "title",
              center: "",
              end: "prev,next today",
            }}
            footerToolbar={{
              start: "dayGridMonth,timeGridWeek,timeGridDay",
              center: "",
              end: "",
            }}
            locales={allLocales}
            locale="ja"
            // contentHeight="auto"
            height={560}
            buttonText={{
              today: "today",
              month: "month",
              week: "week",
              day: "day",
            }}
            events={events}
            eventContent={renderEventContent}
          />
        </StyleWrapper>
      </Box>
    </Box>
  );
};

export const getStaticProps = async () => {
  const notion = new NotionClient({
    auth: process.env.NEXT_PUBLIC_NOTION_TOKEN,
  });
  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID;
  let entries: {}[] = [];

  if (databaseId) {
    try {
      // 現在の月の初日と最終日を計算
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth(); // 月は0から始まるので注意
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
        .toISOString()
        .split("T")[0];
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
        .toISOString()
        .split("T")[0];

      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: "entryDate",
              date: {
                on_or_after: firstDayOfMonth,
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

        const content = "";

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
    props: { entries },
    revalidate: 10, // 再生成間隔を10秒に設定
  };
};

export default CalendarPage;
