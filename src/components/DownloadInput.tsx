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
import React from "react";
import { api } from "../api";
import { useAuthContext } from "../contexts/AuthContext";

export default function DownloadInput() {
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuthContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    (async () => {
      try {
        await api.createRequest(
          auth.user!.access_token,
          data.get("url") as string,
          data.get("extension") as string
        );
        enqueueSnackbar("Your download has been registered!", {
          variant: "success",
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          enqueueSnackbar(error.response.data.detail, { variant: "error" });
        }
      }
      (event.target as HTMLFormElement).reset();
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
                  name="url"
                  id="url"
                  autoFocus
                  required
                />
              </Grid>
            </Grid>
            <Grid item>
              <Select
                variant="standard"
                name="extension"
                id="extension"
                defaultValue="mp3"
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
