import styled from "@emotion/styled";
import { Box } from "@mui/material";

const ImageBox = styled(Box)<{ image: string }>`
  background-image: ${(props) => `url("${props.image}")`};
  background-size: cover;
  border-radius: 0.5rem;
`;

export default ImageBox;
