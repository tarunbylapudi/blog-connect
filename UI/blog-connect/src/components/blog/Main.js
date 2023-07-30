import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function Main(props) {
  const { blogName, article } = props.blog;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        {blogName}
      </Typography>
      <Divider />
      <Divider />
      <Divider />

      <Typography variant="body1" gutterBottom>
       <p>{article}</p> 
      </Typography>

      <Divider />
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
