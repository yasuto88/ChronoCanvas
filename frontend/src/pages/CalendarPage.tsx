/// <reference types="uuid" />

import React, { useState, useCallback, useEffect, ChangeEvent } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// import { DateClickArg } from '@fullcalendar/common';
import allLocales from "@fullcalendar/core/locales-all.js";
import styles from "./CalendarPage.module.css";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import eventData from "../../data.json";
import { Event } from "../types/interfaces";
import EventsSection from "@/components/Calendar/EventsSection";

interface DateClickArg {
  date: Date;
  dateStr: string;
  allDay: boolean;
}

const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<Event>({
    id: "",
    title: "",
    start: "",
    end: "",
    color: "",
  });

  useEffect(() => {
    const loadedEvents: Event[] = eventData.Events.map((event) => ({
      id: event.eventId,
      title: event.title,
      start: event.startDate,
      end: event.endDate,
      color: event.eventColor,
    }));
    setEvents(loadedEvents);
  }, []);

  const addDays = (date: Date | string, days: number): string => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0] + "T01:00";
  };

  const handleDateClick = useCallback(
    (arg: DateClickArg) => {
      //uuidを生成
      const setId = uuidv4();
      const sentTitle = "イベント";
      const startDate = arg.dateStr + "T00:00"; // 開始日時の初期値
      const endDate = addDays(new Date(startDate), 2);
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setEventDetails({
        ...eventDetails,
        id: setId,
        title: sentTitle,
        start: startDate,
        end: endDate,
        color: color,
      });
      setDialogOpen(true); // ダイアログを開く
    },
    [eventDetails]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
      console.log(e.target.value);
    },
    [eventDetails]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setEvents([...events, eventDetails]);
      setDialogOpen(false); // ダイアログを閉じる
      setEventDetails({
        id: "",
        title: "",
        start: "",
        end: "",
        color: "#2196f3",
      }); // フォームをリセット
    },
    [events, eventDetails]
  );

  const StyleWrapper = styled.div`
    .fc-button-primary {
      background-color: #fff;
      border-color: var(--main-color);
      color: var(--main-color);
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
  `;

  return (
    <div className={styles.body}>
      <div className={styles.calender}>
        <StyleWrapper>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            locales={allLocales}
            locale="ja"
            contentHeight="auto"
            buttonText={{
              today: "today",
              month: "month",
              week: "week",
              day: "day",
              list: "予定リスト",
            }}
          />
        </StyleWrapper>
      </div>

      {/* ダイアログ */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>イベントの追加</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="イベント名"
              type="text"
              fullWidth
              variant="standard"
              value={eventDetails.title}
              onChange={handleInputChange}
              required
            />
            {!eventDetails.title && (
              <Typography variant="caption" color="error">
                イベント名を入力してください
              </Typography>
            )}
            <TextField
              margin="dense"
              name="start"
              label="開始日時"
              type="datetime-local"
              value={eventDetails.start}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              name="end"
              label="終了日時"
              type="datetime-local"
              value={eventDetails.end}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid>
              <TextField
                type="color"
                name="color"
                value={eventDetails.color}
                onChange={handleInputChange}
                style={{ width: "60%", marginTop: "8px" }}
              />
              <IconButton
                aria-label="delete"
                style={{ marginTop: "8px", marginLeft: "8px" }}
                size="large"
                onClick={() => {
                  const color =
                    "#" + Math.floor(Math.random() * 16777215).toString(16);
                  setEventDetails({ ...eventDetails, color: color });
                }}
              >
                <RestartAltIcon fontSize="large" />
              </IconButton>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>キャンセル</Button>
            <Button type="submit">追加</Button>
          </DialogActions>
        </form>
      </Dialog>

      <EventsSection events={events} />
    </div>
  );
};

export default CalendarPage;
