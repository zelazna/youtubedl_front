import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import DownloadInput from "./components/DownloadInput";
import Requests from "./components/Requests";
import SignIn from "./components/Signin";
import AuthProvider, { useAuthContext } from "./contexts/AuthContext";
import RequestContext from "./contexts/RequestsContext";

const AuthWrapper = () => {
  let auth = useAuthContext();

  return (
    <React.Fragment>
      {auth.user ? (
        <React.Fragment>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Youtube DL
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  auth.signout();
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
      ) : (
        <SignIn />
      )}
    </React.Fragment>
  );
};

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <AuthWrapper />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
