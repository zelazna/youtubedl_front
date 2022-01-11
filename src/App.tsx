import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DownloadInput from "./components/DownloadInput";
import LoadingSpinner from "./components/LoadingSpinner";
import Requests from "./components/Requests";
import RequireAuth from "./components/RequireAuth";
import SignIn from "./components/Signin";
import { useAuthContext } from "./contexts/AuthContext";
import RequestContext from "./contexts/RequestsContext";

const Wrapper = () => {
  let auth = useAuthContext();
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Youtube DL
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              auth.signout(() => navigate("/login"));
            }}
          >
            Sign out
          </Button>
        </Toolbar>
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
};

function App() {
  const auth = useAuthContext();
  return (
    <React.Fragment>
      {auth.isLoading ? (
        <LoadingSpinner />
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Wrapper />
              </RequireAuth>
            }
          />
        </Routes>
      )}
    </React.Fragment>
  );
}

export default App;
