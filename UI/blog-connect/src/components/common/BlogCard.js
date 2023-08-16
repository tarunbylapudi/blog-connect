import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link, useSubmit } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { blue, green, red } from "@mui/material/colors";
import { useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

const BlogCard = (props) => {
  const [modelOpen, setModalOpen] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);
  const submit = useSubmit();
  const isLoggedIn = useRouteLoaderData("token-loader");
  const { blogName, article, _id } = props.blog;
  const content = article.substring(0, 150) + "...";

  const backBtnHandler = () => {
    setModalOpen(false);
  };
  const okBtnHandler = () => {
    setDeleteBlog(true);
    setModalOpen(false);
    submit(null, { method: "delete", action: `/blogs/${_id}` });
  };

  const blogDeleteHandler = () => {
    setModalOpen(true);
  };
  return (
    <>
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
          {!isLoggedIn && (
            <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
              <Button sx={{ color: "#50bfa0" }}>View</Button>
            </Link>
          )}
          {isLoggedIn && (
            <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
              <IconButton aria-label="delete">
                <VisibilityIcon sx={{ color: "#50bfa0" }} />
              </IconButton>
            </Link>
          )}
          {isLoggedIn && (
            <Link to={`/blogs/${_id}/edit`} style={{ textDecoration: "none" }}>
              {/* <Button size="small">Edit</Button> */}
              <IconButton aria-label="delete">
                <ModeEditIcon sx={{ color: "#50bfa0" }} />
              </IconButton>
            </Link>
          )}
          {isLoggedIn && (
            <IconButton aria-label="delete" onClick={blogDeleteHandler}>
              <DeleteIcon sx={{ color: "#50bfa0" }} />
            </IconButton>
          )}
        </CardActions>
      </Card>
      <Modal
        open={modelOpen}
        header="Delete Blog?"
        text="Blog will be perminently deleted and it cannot be restored back!"
        okBtn="delete"
        backBtn="back"
        useOkBtnHandler={okBtnHandler}
        useBackBtnHandler={backBtnHandler}
      />
    </>
  );
};

export default BlogCard;
