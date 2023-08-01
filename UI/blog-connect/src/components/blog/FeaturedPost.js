import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function FeaturedPost(props) {
  const { blogName, article, _id } = props.blog;
  const shortArticle = article.substring(0, 170) + "...";
  const url = "https://source.unsplash.com/random?wallpapers";

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {blogName}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {shortArticle}
            </Typography>
            <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
              Continue reading...
            </Link>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={url}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;
