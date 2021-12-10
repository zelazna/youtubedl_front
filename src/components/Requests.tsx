import { Grid, Paper, Toolbar, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { api } from "../api";
import { useAuthContext } from "../contexts/AuthContext";
import {
  RequestInterface,
  useRequestContext,
} from "../contexts/RequestsContext";
import { TablePaginationContainer } from "./TablePagination/TablePaginationContainer";

export default function Requests() {
  const { enqueueSnackbar } = useSnackbar();
  const { requests, setRequests } = useRequestContext();
  const socket = useRef<WebSocket | null>(null);
  const auth = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getRequests(auth.user!.access_token);
        setRequests(data);
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: "error" });
        }
      }
    })();

    socket.current = new WebSocket("ws://localhost:8000/ws");
    let socketRefValue: any = null;
    socketRefValue = socket.current;

    socket.current.onopen = () => {
      console.info("WebSocket connection opened");
    };

    return function cleanup() {
      socketRefValue.close();
    };
  }, [enqueueSnackbar, setRequests, auth]);

  useEffect(() => {
    const updateState = (data: RequestInterface) =>
      setRequests([data, ...requests.filter((r) => r.id !== data.id)]);

    if (socket.current) {
      socket.current.onmessage = (msg) => updateState(JSON.parse(msg.data));
    }
  }, [requests, setRequests]);

  return (
    <Grid item xs={12}>
      <Paper sx={{ width: "100%", mb: 2, mt: 3 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
            color="primary"
          >
            Recent Downloads
          </Typography>
        </Toolbar>
        <TablePaginationContainer />
      </Paper>
    </Grid>
  );
}
