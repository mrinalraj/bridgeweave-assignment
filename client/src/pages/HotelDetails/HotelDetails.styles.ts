import { Theme } from "@mui/material/styles";

const hotelDetailsStyles = {
  pictureGridArea: {
    marginTop: "2rem",
    display: "grid",
    gridGap: "1rem",
    gridAutoRows: "minmax(200px, auto)",
    gridTemplateColumns: "repeat(6, 1fr)",
  },
  imageBig: {
    borderRadius: "0.5rem",
    gridColumn: "1 / 4",
    gridRow: "1 / 3",
  },
  imageSmallTop: {
    borderRadius: "0.5rem",
    gridColumn: "4 / 5",
    gridRow: "1",
  },
  imageSmallBottom: {
    borderRadius: "0.5rem",
    gridColumn: "4 / 5",
    gridRow: "2",
  },
  detailsGridAreaTop: {
    borderRadius: "0.5rem",
    background: "#fdf6e9",
    gridColumn: "5 / 7",
    gridRow: "1",
    padding: "1rem",
    flexGrow: 0,
  },
  detailsGridAreaBottom: {
    borderRadius: "0.5rem",
    gridColumn: "5 / 7",
    gridRow: "2",
    padding: "1rem",
    border: "1px solid #e0e0e0",
  },
  mapLink: {
    display: "flex",
    alignItems: "center",
    gridGap: "0.5rem",
  },
  cancellationInfo: {
    display: "flex",
    alignItems: "center",
    gridGap: "0.5rem",
    color: "rgb(119, 202, 126)",
  },
  checkInOutInfo: {
    display: "flex",
    margin: "2rem 0",
    flexDirection: "row",
    gridGap: "2rem",
  },
  roomOptions: {
    marginTop: "2rem",
  },
};

export default hotelDetailsStyles;
