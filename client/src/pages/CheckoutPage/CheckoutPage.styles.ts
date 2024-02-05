import { SxProps, Theme } from "@mui/material";

const checkoutPageStyles = {
  topBanner: {
    backgroundImage: "linear-gradient(to bottom right, #6a6898, #8798f1)",
    height: "300px",
    width: "100%",
    top: 70,
    position: "absolute",
  },
  backButton: {
    padding: "0.5rem 0",
    margin: "1rem 0",
    display: "flex",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
    gap: "1rem",
    width: "fit-content",
  },
  imageBox: {
    width: "20%",
    height: "150px",
  },
  priceList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "1rem",
  },
  priceItems: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
};

export default checkoutPageStyles;
