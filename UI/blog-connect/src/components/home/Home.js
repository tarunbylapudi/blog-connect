import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlogCard from "../common/BlogCard";

import classes from "./css/Home.module.css";
import { Link, redirect, useRouteLoaderData } from "react-router-dom";
import axios from "axios";

const base = process.env.REACT_APP_BASE_URL;
const getAllBlogsURL = base + process.env.REACT_APP_ADD_GET_BLOGS_URL;


const defaultTheme = createTheme();

export default function Home() {
  const blogs = useRouteLoaderData("all-blogs");
  const { data } = blogs;
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main className={classes.home}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={3}>
            {data.map((blog) => (
              <Grid item key={blog._id} xs={12} sm={6} md={4}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export async function loader({ request, params }) {
  const response = await axios.get(getAllBlogsURL);
  console.log(response.data);
  return response.data;
}

