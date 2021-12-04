import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  MenuItem,
  Select,
  IconButton,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Tooltip,
  FormControl,
} from "@mui/material";
import {
  useRequestActionsContext,
  useRequestContext,
} from "../context/RequestsContext";

export default function DownloadInput() {
  const setRequestActionsContext = useRequestActionsContext();
  const requests = useRequestContext();

  const [url, setRequestUrl] = useState("");
  const [format, setDownloadFormat] = useState("mp4");

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    (async () => {
      const result = await fetch("/requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type: "video", format }),
      });
      const data = await result.json();
      setRequestActionsContext([data, ...requests]);
      setRequestUrl("");
    })();
  };

  return (
    <FormControl fullWidth required>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", boxShadow: 0 }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Enter the Url of the video to download"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default" },
                  }}
                  variant="standard"
                  value={url}
                  required
                  onChange={(evt) => setRequestUrl(evt.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Select
                variant="standard"
                value={format}
                onChange={(evt) => setDownloadFormat(evt.target.value)}
              >
                <MenuItem value={"mp4"}>mp4 ( video )</MenuItem>
                <MenuItem value={"mp3"}>mp3 ( music )</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Tooltip title="Download">
                <IconButton type="submit">
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>
    </FormControl>
  );
}
