import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Services from "../../services/Services";
import { Box, Container, Typography } from "@mui/material";
import { Hotel } from "../../models/Hotel";
import { ResponseEntity } from "../../models/Response";
import HotelCard from "../../components/HotelCard/HotelCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const HotelsList = () => {
  const { data, isLoading, isError } = useQuery<ResponseEntity<Hotel[]>>({
    queryKey: ["hotels-list"],
    queryFn: async () => await Services.getAllHotels(),
  });

  const [searchArea, setSeasrchArea] = useState<string>("");

  return (
    <Box>
      <SearchBar searchArea={searchArea} setSearchArea={setSeasrchArea} />
      <Container maxWidth="lg">
        <Typography variant="h5" fontWeight={600} my="2rem">
          Hotels in {searchArea || "your area"}
        </Typography>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}

        <Box display="flex" flexDirection="column" gap="2rem">
          {data &&
            data.data!.map((hotel: any) => (
              <HotelCard hotel={hotel} key={hotel.id} />
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HotelsList;
