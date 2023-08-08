import React from "react";
import { Form, redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { getAuthToken } from "../../../utils/auth";

const base = process.env.REACT_APP_BASE_URL;
const createBlogUrl = base + process.env.REACT_APP_CREATE_BLOG;
const updateBlogUrl = base + process.env.REACT_APP_UPDATE_BLOG;

const defaultTheme = createTheme();
const BlogForm = (props) => {
  let article = "";
  let blogName = "";
  let authorName = "";
  let category = "";

  if (props.blog) {
    article = props.blog.article;
    blogName = props.blog.blogName;
    authorName = props.blog.authorName;
    category = props.blog.category;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {props.method === "post" ? "Create" : "Update"} Blog
          </Typography>
          <Box Validate sx={{ mt: 3 }}>
            <Form method={props.method}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="author-name"
                    name="authorName"
                    required
                    fullWidth
                    id="Name"
                    label="Author Name"
                    defaultValue={authorName}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="blogName"
                    label="Blog Name"
                    name="blogName"
                    defaultValue={blogName}
                    autoComplete="blog-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="category"
                    label="category"
                    id="category"
                    defaultValue={category}
                    autoComplete="category"
                  />
                </Grid>
                <Grid item xs={12}>
                  <textarea
                    rows={20}
                    cols={100}
                    name="article"
                    label="article"
                    id="article"
                    defaultValue={article}
                    placeholder="Enter your blog article.."
                    required
                  ></textarea>
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                {props.method === "post" ? "Create" : "Update"}
              </Button>
            </Form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BlogForm;

export async function action({ request, params }) {
  const Authorization = "Bearer " + getAuthToken();
  const data = await request.formData();
  console.log(request.method);

  const reqData = {
    authorName: data.get("authorName"),
    blogName: data.get("blogName"),
    category: data.get("category"),
    article: data.get("article"),
  };

  try {
    if (request.method === "POST") {
      const res = await axios.post(createBlogUrl, reqData, {
        headers: {
          Authorization,
        },
      });
    } else if (request.method === "PUT") {
      const blogId = params.id;
      const updateUrl = updateBlogUrl + `/${blogId}`;
      const res = await axios.put(updateUrl, reqData, {
        headers: {
          Authorization,
        },
      });
    }
  } catch (error) {
    console.log("catch");
    throw error;
  }

  return redirect("/blogs");
}
