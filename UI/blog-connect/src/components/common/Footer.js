import { Box, Typography } from "@mui/material";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#121138", p: 3 }} component="footer">
      <Copyright />
    </Box>
  );
};

export default Footer;
