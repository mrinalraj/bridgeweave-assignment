import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Services from "../../services/Services";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import ImageBox from "../../components/ImageBox/ImageBox";
import { ResponseEntity } from "../../models/Response";
import { Room } from "../../models/Room";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { UserRequest } from "../../models/UserRequest";
import DeviceIdUtil from "../../utils/DeviceIdUtil";
import checkoutPageStyles from "./CheckoutPage.styles";
import { BookingRequest } from "../../models/BookingRequest";
import { User } from "../../models/User";
import { ArrowBack } from "@mui/icons-material";

const CheckoutPage = () => {
  const param = useParams();

  const [checkin, setCheckin] = React.useState<Dayjs | null>(dayjs());
  const [checkout, setCheckout] = React.useState<Dayjs | null>(dayjs());

  const [state, dispatch] = useReducer(
    (state: UserRequest, action: Partial<UserRequest>) => ({
      ...state,
      ...action,
    }),
    { name: "", email: "", phone: "", deviceId: DeviceIdUtil.getDeviceId()! }
  );

  const handleChange =
    (name: keyof UserRequest) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ [name]: event.target.value });
    };

  const navigate = useNavigate();

  const room = useQuery<ResponseEntity<Room>>({
    queryKey: ["room", param.id],
    queryFn: async () => {
      return await Services.getRoom(parseInt(param.id!));
    },
  });

  const createBooking = useMutation<ResponseEntity<any>, any, BookingRequest>({
    mutationKey: ["createBooking"],
    mutationFn: async (user) => {
      return await Services.createBooking(user);
    },
    onSuccess: () => {
      navigate("/bookings");
    },
  });

  const createUser = useMutation<ResponseEntity<User>, any, UserRequest>({
    mutationKey: ["createUser"],
    mutationFn: async (user) => {
      return await Services.createUser(user);
    },
    onSuccess: () => {
      createBooking.mutate({
        checkIn: checkin!.format("YYYY-MM-DD"),
        checkOut: checkout!.format("YYYY-MM-DD"),
        roomId: parseInt(param.id!),
        deviceId: state.deviceId,
      });
    },
  });

  if (room.isLoading) return <div>Loading...</div>;

  return (
    <>
      <Box sx={checkoutPageStyles.topBanner} />

      <Box position="relative">
        <Container maxWidth="lg">
          <Box sx={checkoutPageStyles.backButton} onClick={() => navigate("/")}>
            <ArrowBack />
            <Typography variant="subtitle2">Back to Hotels</Typography>
          </Box>
          <Paper sx={{ padding: "2rem", marginTop: "1rem" }} elevation={0}>
            <Typography variant="h6">Hotel info</Typography>

            <Box mt="2rem" sx={{ display: "flex", gap: "1rem" }}>
              <ImageBox
                image={room.data?.data?.photos.at(0)!}
                sx={checkoutPageStyles.imageBox}
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

            <Box mt="2rem" gap="4rem" display="flex">
              <DatePicker
                label="CheckIn"
                defaultValue={checkin}
                onChange={setCheckin}
              />
              <DatePicker
                label="CheckOut"
                value={checkout}
                onChange={setCheckout}
              />
            </Box>
          </Paper>

          <Paper sx={{ padding: "2rem", marginTop: "1rem" }} elevation={0}>
            <Typography variant="h6">Guest details</Typography>
            <Box display="flex" gap="1rem" mt="2rem">
              <TextField
                label="Name"
                value={state.name}
                onChange={handleChange("name")}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={state.email}
                onChange={handleChange("email")}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Phone"
                type="tel"
                value={state.phone}
                onChange={handleChange("phone")}
                variant="outlined"
                fullWidth
              />
            </Box>
          </Paper>

          <Paper sx={{ padding: "2rem", marginTop: "1rem" }} elevation={0}>
            <Typography variant="h6">Price Summary</Typography>
            <Box sx={checkoutPageStyles.priceList}>
              <Box sx={checkoutPageStyles.priceItems}>
                <Typography variant="subtitle2">
                  Base Price (1 room x 1 night)
                </Typography>
                <Typography variant="subtitle2" color="GrayText">
                  ₹ {room.data?.data?.rent}
                </Typography>
              </Box>
              <Box sx={checkoutPageStyles.priceItems}>
                <Typography variant="subtitle2">Taxes and Charges</Typography>
                <Typography variant="subtitle2" color="GrayText">
                  ₹ {(room.data?.data?.rent! * 0.18).toFixed(2)}
                </Typography>
              </Box>
              <Divider />
              <Box sx={checkoutPageStyles.priceItems}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="subtitle2" color="GrayText">
                  ₹ {room.data?.data?.rent! + room.data?.data?.rent! * 0.18}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Button
            fullWidth
            variant="contained"
            sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
            onClick={() => createUser.mutate(state)}
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
