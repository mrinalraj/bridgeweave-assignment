import React, { useEffect } from "react";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeviceIdUtil from "./utils/DeviceIdUtil";

function App() {
  useEffect(() => {
    const hasDeviceId = DeviceIdUtil.hasDeviceId();
    if (!hasDeviceId) {
      DeviceIdUtil.setDeviceId(DeviceIdUtil.generateDeviceId());
    }
  }, []);

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router />
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
