import { Grid, Paper, Toolbar, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import {
  RequestInterface,
  useRequestContext,
} from "../contexts/RequestsContext";
import { TablePaginationContainer } from "./TablePagination/TablePaginationContainer";

export default function Requests() {
  const { requests, setRequests } = useRequestContext();
  const socket = useRef(new WebSocket("ws://localhost:8000/ws"));

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch("/requests/?skip=0&orderby=id%20desc");
        const data = await result.json();
        setRequests(data);
      } catch (error) {
        // TODO: Handle backend Exceptions
        console.log(error);
      }
    })();

    let socketRefValue: any = null;
    socketRefValue = socket.current;

    socket.current.onopen = () => {
      console.info("WebSocket connection opened");
    };
    return function cleanup() {
      socketRefValue.close();
    };
  }, [setRequests]);

  useEffect(() => {
    const updateState = (data: RequestInterface) => {
      const newState = requests.concat([]).filter((req) => req.id !== data.id);
      setRequests([data, ...newState]);
    };
    socket.current.onmessage = (msg) => updateState(JSON.parse(msg.data));
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
        <TablePaginationContainer requests={requests} />
      </Paper>
    </Grid>
  );
}
