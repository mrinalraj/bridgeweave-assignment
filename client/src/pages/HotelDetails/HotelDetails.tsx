import {
  Box,
  Container,
  Typography,
  Link,
  Rating,
  Button,
} from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MapIcon from "@mui/icons-material/Map";
import { useQuery } from "@tanstack/react-query";
import Services from "../../services/Services";
import { useNavigate, useParams } from "react-router-dom";
import { ResponseEntity } from "../../models/Response";
import { Hotel } from "../../models/Hotel";
import hotelDetailsStyles from "./HotelDetails.styles";
import ShieldIcon from "@mui/icons-material/Shield";
import RoomCard from "../../components/RoomCard/RoomCard";
import ImageBox from "../../components/ImageBox/ImageBox";

const HotelDetails = () => {
  const param = useParams();

  const { data, isLoading, isError } = useQuery<ResponseEntity<Hotel>>({
    queryKey: ["hotels-details"],
    queryFn: async () => await Services.getHotelById(param.id!),
  });

  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box mt="2rem">
      <Container maxWidth="lg">
        <Link
          underline="none"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <Box display="flex" alignItems="center" gap="1rem">
            <ArrowBackIcon />
            <Typography variant="body1" fontWeight={600}>
              Hotels in your area
            </Typography>
          </Box>
        </Link>
        <Box mt="2rem">
          <Rating value={4.5} precision={0.5} readOnly />
          <Typography mt="1rem" variant="h4" fontWeight={500}>
            {data?.data?.name}
          </Typography>

          <Link
            underline="none"
            sx={hotelDetailsStyles.mapLink}
            href={`https://maps.google.com/?q=${data?.data?.location}`}
            target="_blank"
          >
            <MapIcon />
            <Typography variant="body1" fontWeight={500}>
              {data?.data?.address}
            </Typography>
          </Link>
        </Box>
        <Box sx={hotelDetailsStyles.pictureGridArea}>
          <ImageBox
            image={data?.data?.photos.at(0)!}
            sx={hotelDetailsStyles.imageBig}
          />
          <ImageBox
            sx={hotelDetailsStyles.imageSmallTop}
            image={data?.data?.photos.at(1)!}
          />
          <ImageBox
            image={data?.data?.photos.at(2)!}
            sx={hotelDetailsStyles.imageSmallBottom}
          />
          <Box sx={hotelDetailsStyles.detailsGridAreaTop}>
            <Typography variant="subtitle2" color="GrayText">
              price starts at
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              ₹ {Math.min(...data?.data?.rooms.map((room) => room.rent)!)}
            </Typography>
            <Typography color="GrayText">
              + taxes and charges, per room per night
            </Typography>
            <Typography color="GrayText">
              <b>1 Room</b> per night
            </Typography>
            <Button sx={{ marginTop: "2rem" }} variant="contained">
              View {data?.data?.rooms.length} room options
            </Button>
          </Box>
          <Box sx={hotelDetailsStyles.detailsGridAreaBottom}>
            <Box sx={hotelDetailsStyles.cancellationInfo}>
              <ShieldIcon fontSize="small" />
              <Typography variant="body2">
                Free cancellation till 24 hours before check-in
              </Typography>
            </Box>
            <Box sx={hotelDetailsStyles.checkInOutInfo}>
              <Box>
                <Typography variant="h6" color="GrayText">
                  Check-in
                </Typography>
                <Typography variant="h4" fontWeight={600}>
                  1 PM
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" color="GrayText">
                  Check-out
                </Typography>
                <Typography variant="h4" fontWeight={600}>
                  12 PM
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box my="2rem">
          <Typography variant="h6" fontWeight={600}>
            About this hotel
          </Typography>
          <Typography mt="1rem" variant="body2">
            {data?.data?.description}
          </Typography>
        </Box>
      </Container>

      <Box
        id="room-options"
        sx={{
          backgroundColor: "white",
          paddingTop: "1rem",
          margin: "2rem 0 4rem 0",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px -2px 4px 0px;",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" fontWeight={600}>
            Room Options
          </Typography>
          <Box display="flex" flexDirection="column" gap="1rem" mt="2rem">
            {data?.data?.rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HotelDetails;
