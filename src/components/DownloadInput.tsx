import SendIcon from "@mui/icons-material/Send";
import {
  AppBar,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

export default function DownloadInput() {
  const [url, setRequestUrl] = useState("");
  const [extension, setDownloadExtension] = useState("mp4");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    (async () => {
      try {
        await axios({
          url: "/requests/",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ url, type: "video", extension }),
        });
        setRequestUrl("");
        enqueueSnackbar("Your download has been registered!", {
          variant: "success",
        });
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: "error" });
        }
        setRequestUrl("");
      }
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
        <AppBar position="static" color="inherit">
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
                  onChange={(evt) => setRequestUrl(evt.target.value.trim())}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Select
                variant="standard"
                value={extension}
                onChange={(evt) => setDownloadExtension(evt.target.value)}
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
