import React from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
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
              marginLeft="1.5rem"
              letterSpacing="0.5rem"
            >
              HOTELBEA
            </Typography>
          </Box>
          <IconButton onClick={() => navigate("/bookings")}>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
