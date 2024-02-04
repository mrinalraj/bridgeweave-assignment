import { Box, Container, Link, List, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ResponseEntity } from "../../models/Response";
import Services from "../../services/Services";
import DeviceIdUtil from "../../utils/DeviceIdUtil";
import { Booking } from "../../models/Booking";
import BookingCard from "../../components/BookingCard/BookingCard";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { data, isLoading, isError, refetch } = useQuery<
    ResponseEntity<Booking[]>
  >({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (DeviceIdUtil.hasDeviceId())
        return await Services.getBookingList(DeviceIdUtil.getDeviceId()!);
    },
  });

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "2rem" }}>
        <Link
          underline="none"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <Box display="flex" alignItems="center" gap="1rem">
            <ArrowBackIcon />
            <Typography variant="h5">Your Bookings</Typography>
          </Box>
        </Link>

        {data?.data?.length! < 1 && (
          <Typography variant="body1" marginTop="2rem">
            You have no bookings yet.
          </Typography>
        )}

        <List sx={{ width: "100%" }}>
          {data?.data?.map((booking) => (
            <BookingCard booking={booking} key={booking.id} />
          ))}
        </List>
      </Container>
    </>
  );
};

export default Bookings;
