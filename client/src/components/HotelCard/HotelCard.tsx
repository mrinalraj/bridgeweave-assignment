import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import React, { FC } from "react";
import { Hotel } from "../../models/Hotel";
import { useNavigate } from "react-router-dom";

interface HotelCardProps {
  hotel: Hotel;
  key: string;
}

const HotelCard: FC<HotelCardProps> = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/hotel/${hotel.id}`)}
    >
      <Box display="flex">
        <Box
          sx={{
            width: "100%",
            maxWidth: "350px",
            backgroundSize: "cover",
            backgroundImage: `url("${hotel.photos.at(0)}")`,
          }}
        ></Box>
        <CardContent>
          <Box mb="1rem">
            <Rating value={hotel.rating} precision={0.5} readOnly />
            <Typography variant="h5">{hotel.name}</Typography>
            <Typography variant="subtitle2">{hotel.address}</Typography>
          </Box>

          <Typography mt="4rem" variant="body1">
            {hotel.description}
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography mt="2rem" variant="h6">{`₹ ${Math.min(
                ...hotel.rooms.map((room) => room.rent)
              )} - ₹ ${Math.max(
                ...hotel.rooms.map((room) => room.rent)
              )}`}</Typography>
              <Typography variant="subtitle2">
                {`${hotel.rooms.length} rooms available`}
              </Typography>
            </Box>
            <Button></Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default HotelCard;
