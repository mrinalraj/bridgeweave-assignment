import React from "react";
import Router from "./Router";
import { Header } from "./components/Header/Header";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6a6898",
      },
      secondary: {
        main: "#8798f1",
      },
    },
  });

  return (
    <div className="App" style={{ background: "#eef4fd", minHeight: "100vh" }}>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
