import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#2f3d89' }, 
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      </ThemeProvider>
  </React.StrictMode>

);
