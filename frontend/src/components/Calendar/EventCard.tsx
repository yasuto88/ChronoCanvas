import React from "react";
import {
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Event } from "../../types/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface EventCardProps {
  event: Event; // Event は以前定義したインターフェース
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <Card variant="outlined">
    <CardContent>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Chip
            size="small"
            label=" "
            style={{
              backgroundColor: event.color,
              width: 16,
              height: 16,
              borderRadius: "50%",
              marginBottom: "8px",
            }}
          />
        </Grid>
        <Grid item xs>
          <Typography color="textSecondary" gutterBottom>
            {event.title}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            onClick={() => {
              /* 編集処理 */
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            onClick={() => {
              /* 削除処理 */
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body2">
        開始: {new Date(event.start).toLocaleString()}
      </Typography>
      <Typography variant="body2">
        終了: {new Date(event.end).toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
);

export default EventCard;
