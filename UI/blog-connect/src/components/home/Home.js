import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlogCard from "../common/BlogCard";

import classes from "./css/Home.module.css";
import {
  json,
  redirect,
  useRouteLoaderData,
  useNavigation,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Filter from "../filter/filter";
import { getAuthToken } from "../../utils/auth";
import { grey } from "@mui/material/colors";
import EmptyResults from "../common/EmptyResults";

const base = process.env.REACT_APP_BASE_URL;
const getAllBlogsURL = base + process.env.REACT_APP_ADD_GET_BLOGS_URL;
const getMyBlogsURL = base + process.env.REACT_APP_MY_BLOGS;

const defaultTheme = createTheme();
const primary = grey[800];

export default function Home() {
  const apiStatus = useNavigation();
  const location = useLocation();
  const blogs = useRouteLoaderData("all-blogs");
  const myBlogs = useRouteLoaderData("my-blogs");

  const getBlogs = blogs ? blogs : myBlogs;

  const displayBlogs = getBlogs.data.map((blog) => {
    return { ...blog, image: `https://source.unsplash.com/random?wallpapers&${Math.random()}` };
  });
  const uniqueCategory = [
    "All",
    ...new Set(getBlogs.data.map((blog) => blog.category)),
  ];
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main className={classes.home}>
        <Container sx={{ py: 8, my: "auto" }} maxWidth="lg">
         
          <div>
            {location.pathname === "/blogs" && (
              <Filter category={uniqueCategory} />
            )}
          </div>

          <Grid container spacing={3}>
            {getBlogs.data.length > 0 &&
              displayBlogs.map((blog) => (
                <Grid item key={blog._id} xs={12} sm={6} md={4}>
                  <BlogCard blog={blog} />
                </Grid>
              ))}
            {getBlogs.data.length === 0 && (
              <EmptyResults
                text={
                  location.pathname === "/myBlogs"
                    ? "No Blogs to display"
                    : "No results found for selected criteria."
                }
              />
            )}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

const paramConstructor = (request, searchParams) => {
  let params = null;
  if (
    request.url.includes("category") &&
    request.url.includes("fromDate") &&
    request.url.includes("toDate")
  ) {
    params = {
      category: searchParams.get("category"),
      fromDate: searchParams.get("fromDate"),
      toDate: searchParams.get("toDate"),
    };
  } else if (
    request.url.includes("fromDate") &&
    request.url.includes("toDate")
  ) {
    params = {
      fromDate: searchParams.get("fromDate"),
      toDate: searchParams.get("toDate"),
    };
  } else if (request.url.includes("category")) {
    params = {
      category: searchParams.get("category"),
    };
  }

  return params;
};

export async function loader({ request, params }) {
  if (request.url.includes("/myBlogs")) {
    const token = getAuthToken();
    if (!token) {
      return redirect("/login");
    }
    const Authorization = "Bearer " + getAuthToken();
    try {
      const response = await axios.get(getMyBlogsURL, {
        headers: { Authorization },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw json(
        { errorMsg: error.response.data.error },
        { status: error.response.status }
      );
    }
  } else {
    const searchParams = new URL(request.url).searchParams;

    const params = paramConstructor(request, searchParams);
    try {
      const response = await axios.get(getAllBlogsURL, { params });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.status);
      throw json(
        { errorMsg: error.response.data.error },
        { status: error.response.status }
      );
    }
  }
}
