import {
  Avatar,
  Card,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Booking } from "../../models/Booking";
import ImageBox from "../ImageBox/ImageBox";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";

interface BookingCardProps {
  booking: Booking;
  key: any;
}

const BookingCard: FC<BookingCardProps> = ({ booking, key }) => {
  return (
    <ListItem alignItems="flex-start">
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

            {booking.cancelled ? (
              <Typography fontWeight={500} variant="body2" color="red">
                Cancelled
              </Typography>
            ) : (
              <Typography
                fontWeight={500}
                variant="body2"
                color="green
              "
              >
                Booked
              </Typography>
            )}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default BookingCard;
