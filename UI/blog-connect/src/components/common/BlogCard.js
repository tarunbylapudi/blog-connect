import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material";
import { Link, useSubmit } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { blue, green, red } from "@mui/material/colors";
import { useRouteLoaderData } from "react-router-dom";

const BlogCard = (props) => {
  const submit = useSubmit();
  const isLoggedIn = useRouteLoaderData("token-loader");
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
      {isLoggedIn}
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
          <IconButton aria-label="delete">
            <VisibilityIcon sx={{ color: blue[900] }} />
          </IconButton>
        </Link>

        <Link to={`/blogs/${_id}/edit`} style={{ textDecoration: "none" }}>
          {/* <Button size="small">Edit</Button> */}
          <IconButton aria-label="delete">
            <ModeEditIcon sx={{ color: green[700] }} />
          </IconButton>
        </Link>
        <IconButton aria-label="delete" onClick={blogDeleteHandler}>
          <DeleteIcon sx={{ color: red[900] }} />
        </IconButton>

        {/* <Button size="small" onClick={blogDeleteHandler}>
          Delete
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default BlogCard;
