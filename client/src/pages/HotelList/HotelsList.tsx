import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Services from "../../services/Services";
import { Box, Container, Typography } from "@mui/material";
import { Hotel } from "../../models/Hotel";
import { ResponseEntity } from "../../models/Response";
import HotelCard from "../../components/HotelCard/HotelCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Filters } from "../../models/Filters";

const HotelsList = () => {
  const [filters, setFilters] = useState<Filters>({});
  const { data, isLoading, isError, refetch } = useQuery<
    ResponseEntity<Hotel[]>
  >({
    queryKey: ["hotels-list"],
    queryFn: async () => {
      return await Services.getHotelsWithFilter(filters);
    },
  });

  useEffect(() => {
    {
      refetch();
    }
  }, [filters]);

  return (
    <Box>
      <SearchBar setFilters={setFilters} />
      <Container maxWidth="lg">
        <Typography variant="h5" fontWeight={600} my="2rem">
          Hotels in {filters.address || "your area"}
        </Typography>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}

        <Box display="flex" flexDirection="column" gap="2rem" pb="4rem">
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
