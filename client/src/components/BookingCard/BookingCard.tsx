import {
  Avatar,
  Button,
  Card,
  Chip,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Booking } from "../../models/Booking";
import ImageBox from "../ImageBox/ImageBox";
import DateUtils from "../../utils/DateUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Services from "../../services/Services";

interface BookingCardProps {
  booking: Booking;
  key: any;
}

const BookingCard: FC<BookingCardProps> = ({ booking, key }) => {
  const queryClient = useQueryClient();
  const cancelBooking = useMutation({
    mutationKey: ["cancelBooking", booking.id],
    mutationFn: async () => {
      return await Services.cancelBooking(booking.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  return (
    <ListItem
      alignItems="flex-start"
      key={key}
      secondaryAction={
        <Chip
          label={booking.cancelled ? "Cancelled" : "Booked"}
          color={booking.cancelled ? "error" : "success"}
        />
      }
    >
      <ListItemAvatar>
        <ImageBox
          sx={{ width: "100px", height: "100px", marginRight: "1rem" }}
          image={booking.room.photos.at(0)!}
        />
      </ListItemAvatar>
      <ListItemText
        primary={booking.room.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="text.primary"
              fontWeight={500}
            >
              {booking.hotel.name}
            </Typography>
            {` — ${booking.hotel.address}`}

            <Typography fontWeight={500} variant="body2" mt="1rem">
              {`${DateUtils.stringToDisplayDate(
                booking.checkIn
              )} - ${DateUtils.stringToDisplayDate(booking.checkOut)}`}
            </Typography>

            {!booking.cancelled && (
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => cancelBooking.mutate()}
              >
                Cancel
              </Link>
            )}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default BookingCard;
