import {
  Box,
  Button,
  Container,
  Input,
  InputBase,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import React, { FC, useMemo, useReducer, useState } from "react";
import LuggageIcon from "@mui/icons-material/Luggage";
import searchbarStyles from "./SearchBar.styles";
import { Filters, FiltersState } from "../../models/Filters";

interface SearchBarProps {
  setFilters: (filters: Filters) => void;
}

const SearchBar: FC<SearchBarProps> = ({ setFilters }) => {
  const [state, setState] = useReducer(
    (state: FiltersState, action: Partial<FiltersState>) => ({
      ...state,
      ...action,
    }),
    {
      rentRange: [2500, 8000],
      ratingRange: [4, 5],
      address: "",
    }
  );

  const handleChange = (name: keyof FiltersState) => (value: any) => {
    setState({ [name]: value });
  };

  const currentFilters: Filters = useMemo(() => {
    return {
      address: state.address,
      maxRent: state.rentRange[1],
      minRent: state.rentRange[0],
      maxRating: state.ratingRange[1],
      minRating: state.ratingRange[0],
    };
  }, [state]);

  return (
    <Box sx={searchbarStyles.background}>
      <Container maxWidth="lg">
        <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
          <Box sx={{ p: "1rem" }}>
            <LuggageIcon />
          </Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={state.address}
            onChange={(e) => handleChange("address")(e.target.value)}
            placeholder="Where do you wanna go?"
            inputProps={{ "aria-label": "search for hotels" }}
          />
          <Button onClick={() => setFilters(currentFilters)}>Search</Button>
        </Paper>

        <Box sx={searchbarStyles.slidersArea}>
          <Box sx={{ width: "100%" }}>
            <Typography variant="body2" fontWeight={600}>
              Price range: <span>0 - 10000</span>
            </Typography>
            <Slider
              getAriaLabel={() => "Rent Range"}
              value={state.rentRange}
              max={10000}
              min={0}
              step={500}
              onChange={(_, value) =>
                handleChange("rentRange")(value as number[])
              }
              valueLabelDisplay="on"
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="body2" fontWeight={600}>
              Rating: <span>0 - 5</span>
            </Typography>
            <Slider
              getAriaLabel={() => "Rating Range"}
              value={state.ratingRange}
              max={5}
              min={0}
              step={0.5}
              onChange={(_, value) =>
                handleChange("ratingRange")(value as number[])
              }
              valueLabelDisplay="on"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchBar;
