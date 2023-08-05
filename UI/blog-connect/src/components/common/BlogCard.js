import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import { Link, useSubmit } from "react-router-dom";

const BlogCard = (props) => {
  const submit = useSubmit();
  const { blogName, article, _id } = props.blog;
  const content = article.substring(0, 150) + "...";

  const blogDeleteHandler = () => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      submit(null, { method: "delete", action: `/blogs/${_id}` });
    }
  };
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
        <Typography gutterBottom variant="h5">
          {blogName}
        </Typography>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
      <CardActions>
        <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
          <Button size="small">View</Button>
        </Link>

        <Link to={`/blogs/${_id}/edit`} style={{ textDecoration: "none" }}>
          <Button size="small">Edit</Button>
        </Link>

        <Button size="small" onClick={blogDeleteHandler}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
