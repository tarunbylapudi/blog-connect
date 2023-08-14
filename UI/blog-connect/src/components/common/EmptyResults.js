import { Box, Button, Link, Typography } from "@mui/material";

const EmptyResults = ({ text }) => {
  return (
    <Box
      sx={{
        margin: "7% auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        !
      </Typography>
      <Typography variant="h5" style={{ color: "white" }}>
        {text}
      </Typography>
      <br />
    </Box>
  );
};

export default EmptyResults;
