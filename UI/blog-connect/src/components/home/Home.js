import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlogCard from "../common/BlogCard";

import classes from "./css/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogsT } from "../../store/blog-actions";
import { Link } from "react-router-dom";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

let isInitial = true;
export default function Home() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    console.log("useEffect");
    dispatch(getAllBlogsT());
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main className={classes.home}>
        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {blogs.map((blog) => (
              <Grid item key={blog._id} xs={12} sm={6} md={4}>
                <Link to={`/blogs/${blog._id}`}>
                  <BlogCard title={blog.blogName} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
