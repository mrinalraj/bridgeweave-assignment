import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Services from "../../services/Services";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import ImageBox from "../../components/ImageBox/ImageBox";
import { ResponseEntity } from "../../models/Response";
import { Room } from "../../models/Room";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

const CheckoutPage = () => {
  const param = useParams();

  const [checkin, setCheckin] = React.useState<Date | null>(new Date());
  const [checkout, setCheckout] = React.useState<Date | null>(new Date());

  const room = useQuery<ResponseEntity<Room>>({
    queryKey: ["room", param.id],
    queryFn: async () => {
      return await Services.getRoom(parseInt(param.id!));
    },
  });

  if (room.isLoading) return <div>Loading...</div>;

  return (
    <>
      <Box
        sx={{
          backgroundImage: "linear-gradient(to bottom right, #6a6898, #8798f1)",
          height: "300px",
          width: "100%",
          top: 70,
          position: "absolute",
        }}
      />

      <Box mt="4rem" position="relative">
        <Container maxWidth="lg">
          <Paper sx={{ padding: "2rem" }} elevation={0}>
            <Typography variant="h6">Hotel info</Typography>

            <Box mt="2rem" sx={{ display: "flex", gap: "1rem" }}>
              <ImageBox
                image={room.data?.data?.photos.at(0)!}
                sx={{
                  width: "20%",
                  height: "150px",
                }}
              />
              <Box>
                <Typography variant="h6" color="text.primary">
                  {room.data?.data?.hotel?.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {room.data?.data?.hotel?.address}
                </Typography>
                <Rating value={room.data?.data?.hotel!.rating} readOnly />
                <Typography variant="subtitle2" color="text.secondary">
                  {room.data?.data?.hotel?.rating} / {5}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ padding: "2rem", marginTop: "1rem" }} elevation={0}>
            <Typography variant="h6">Checkin details</Typography>

            <DatePicker label="CheckIn" />
            {/* <DatePicker
              label="CheckIn"
              defaultValue={new Date()}
              value={moment(checkout).toDate()}
              onChange={setCheckout}
            /> */}
          </Paper>

          <Paper sx={{ padding: "2rem", marginTop: "1rem" }} elevation={0}>
            <Typography variant="h6">Guest details</Typography>
          </Paper>

          <Paper sx={{ padding: "2rem", marginTop: "1rem" }} elevation={0}>
            <Typography variant="h6">Price Summary</Typography>
          </Paper>

          <Button
            fullWidth
            variant="contained"
            sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            Book
          </Button>

          <Typography variant="caption" color="GrayText">
            By proceeding, I agree to Goibibo's Privacy Policy, User Agreement &
            Terms of Service
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default CheckoutPage;
