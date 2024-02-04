import React, { FC } from "react";
import { Room } from "../../models/Room";
import { Box, Button, Typography } from "@mui/material";
import ImageBox from "../ImageBox/ImageBox";
import styled from "@emotion/styled";
import GroupIcon from "@mui/icons-material/Group";
import BedIcon from "@mui/icons-material/Bed";

import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import { useNavigate } from "react-router-dom";

interface RoomCardProps {
  key: string | number;
  room: Room;
}

const IconDescriptor = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        padding: "2rem",
        borderRadius: "0.5rem",
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {room.name}
      </Typography>
      <Box sx={{ display: "flex", gap: "3rem" }}>
        <ImageBox
          image={room.photos.at(0)!}
          sx={{
            width: "35%",
            height: "200px",
            margin: "1rem 0",
            borderRadius: "0.5rem",
          }}
        />
        <Box>
          <IconDescriptor>
            <BedIcon />
            <Typography variant="h6">{room.beds} Bedrooms</Typography>
          </IconDescriptor>

          <IconDescriptor>
            <GroupIcon />
            <Typography variant="h6">{room.guests} Guests</Typography>
          </IconDescriptor>

          <IconDescriptor>
            {room.inclusions.map((inclusion, index) => {
              if (inclusion === "BREAKFAST") {
                return <BakeryDiningIcon key={index} />;
              } else if (inclusion === "WIFI") {
                return <NetworkWifiIcon key={index} />;
              } else if (inclusion === "LUNCH") {
                return <RestaurantIcon key={index} />;
              }
            })}
          </IconDescriptor>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            ₹ {room.rent}
          </Typography>
          <Typography variant="body1" color="GrayText">
            + ₹ {(room.rent * 0.18).toFixed(2)} taxes and charges, per room per
            night
          </Typography>
          <Typography color="GrayText">
            <b>1 Room</b> per night
          </Typography>

          <Button
            sx={{ marginTop: "3rem" }}
            variant="contained"
            onClick={() => {
              navigate(`/checkout/${room.id}`);
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomCard;
