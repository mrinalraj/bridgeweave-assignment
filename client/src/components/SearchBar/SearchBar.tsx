import {
  Box,
  Button,
  Container,
  Input,
  InputBase,
  Paper,
  Slider,
} from "@mui/material";
import React, { Component, FC, useState } from "react";
import LuggageIcon from "@mui/icons-material/Luggage";

interface SearchBarProps {
  searchArea: string;
  setSearchArea: (searchArea: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchArea, setSearchArea }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue);
  };

  const [area, setArea] = useState(searchArea);
  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to bottom right, #6a6898, #8798f1)",
      }}
      py="2rem"
      position={"sticky"}
      top={0}
      right={0}
      boxShadow={"rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;"}
      zIndex={1001}
    >
      <Container maxWidth="lg">
        <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
          <Box sx={{ p: "1rem" }}>
            <LuggageIcon />
          </Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Where do you wanna go?"
            inputProps={{ "aria-label": "search for hotels" }}
          />
          <Button onClick={() => setSearchArea(area)}>Search</Button>
        </Paper>

        {/* <Box mt="1rem">
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={[20, 37]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}

          />
        </Box> */}
      </Container>
    </Box>
  );
};

export default SearchBar;
