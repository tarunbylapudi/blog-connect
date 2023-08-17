import { Typography, Link } from "@mui/material";

const Copyright = (props) => {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ fontWeight: "500", color: "#fff" }}
        {...props}
      >
        <Link color="inherit" href="https://github.com/tarunbylapudi">
          Designed by Tarun
        </Link>{" "}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ fontWeight: "500", color: "#fff" }}
        {...props}
      >
        {"Copyright © "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
};

export default Copyright;
