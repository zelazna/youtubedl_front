import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import DownloadInput from "./components/DownloadInput";
import Requests from "./components/Requests";
import RequestContext from "./contexts/RequestsContext";

function App() {
  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar />
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <RequestContext>
            <DownloadInput />
            <Requests />
          </RequestContext>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
