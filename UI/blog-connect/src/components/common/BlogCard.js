import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";

const BlogCard = (props) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image="https://source.unsplash.com/random?wallpapers"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography>
          This is a media card. You can use this section to describe the
          content.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
