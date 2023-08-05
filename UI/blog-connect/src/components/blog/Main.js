import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

function Main(props) {
  const { article, blogName } = props.blog;

  return (
    <>
    <Grid
      item
      xs={12}
      md={8}
    >
      <Typography variant="h4" gutterBottom>
        {blogName}
      </Typography>
      <Divider />
      <Typography variant="body1" gutterBottom>
        {article}
      </Typography>
    </Grid>
    </>
    
  );
}

export default Main;
