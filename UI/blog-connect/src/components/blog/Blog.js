import React from "react";
import { useLoaderData, useRouteLoaderData, redirect } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import FeaturedPost from "./FeaturedPost";
import axios from "axios";

const base = process.env.REACT_APP_BASE_URL;
const blogURL = base + process.env.REACT_APP_BLOG_URL;
const deleteBlogURL = base + process.env.REACT_APP_DELETE_BLOG;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const allBlogsData = useRouteLoaderData("all-blogs");
  const blogData = useRouteLoaderData("single-blog");

  const featuredPosts = [allBlogsData.data[0], allBlogsData.data[2]];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost blog={blogData.data} />
          <Grid container spacing={4}>
            {featuredPosts.map((blog) => (
              <FeaturedPost key={blog._id} blog={blog} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main blog={blogData.data} />
            <Sidebar
              title={blogData.data.authorName}
              description={blogData.data.createdAt}
            />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export async function loader({ request, params }) {
  const url = `${blogURL}/${params.id}`;
  console.log(url);
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
}
export async function action({ request, params }) {
  const Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzZhMmUzMTYxMWIxMWZhYWU5ZDQ2OCIsImlhdCI6MTY5MTA4ODA2NCwiZXhwIjoxNjkzNjgwMDY0fQ.KIWQTXEAl7wsT2PoFTIwpR5BXmPWgxEroKKXT2VEpDA";
  const blogId = params.id;
  const deleteUrl = deleteBlogURL + `/${blogId}`;
  try {
    const res = await axios.delete(deleteUrl, { headers: { Authorization } });
  } catch (error) {
    throw error;
  }

  return redirect("/blogs");
}
