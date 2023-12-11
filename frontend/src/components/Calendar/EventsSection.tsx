import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Event } from "../../types/interfaces";
import styles from "./EventsSection.module.css";
import EventCard from "./EventCard";

interface EventsSectionProps {
  events: Event[]; // Event は以前定義したインターフェース
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [expiredEvents, setExpiredEvents] = useState<Event[]>([]);
  const [ongoingEvents, setOngoingEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const now = new Date();
    const expired = events.filter((event) => new Date(event.end) < now);
    const ongoing = events.filter(
      (event) => new Date(event.start) <= now && new Date(event.end) >= now
    );
    const upcoming = events.filter((event) => new Date(event.start) > now);

    setExpiredEvents(expired);
    setOngoingEvents(ongoing);
    setUpcomingEvents(upcoming);
  }, [events]);

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        m: 2,
        p: 2,
        width: "400px",
        height: "85vh",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: "16px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        overflowY: "scroll",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box sx={{ margin: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6" color="red" gutterBottom>
                期限切れ
              </Typography>
              {expiredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                進行中
              </Typography>
              {ongoingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                開始前
              </Typography>
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EventsSection;
