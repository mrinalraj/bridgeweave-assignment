import React from "react";

import { AppBar, Box, Container, IconButton, Typography } from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Header = () => {
  return (
    <Box
      padding={"1rem"}
      position={"sticky"}
      top={0}
      right={0}
      boxShadow={"rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;"}
      zIndex={1000}
      sx={{ background: "white" }}
    >
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center">
            <img src="/logo.png" height="40px" />
            <Typography
              color="#6a6898"
              variant="h5"
              fontWeight={600}
              marginLeft="2rem"
              letterSpacing="0.5rem"
            >
              HOTELBEA
            </Typography>
          </Box>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
