import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlogCard from "../common/BlogCard";

import classes from "./css/Home.module.css";
import { redirect, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import Filter from "../filter/filter";
import { checkAuthLoader, getAuthToken } from "../../utils/auth";

const base = process.env.REACT_APP_BASE_URL;
const getAllBlogsURL = base + process.env.REACT_APP_ADD_GET_BLOGS_URL;
const getMyBlogsURL = base + process.env.REACT_APP_MY_BLOGS;

const defaultTheme = createTheme();

export default function Home() {
  const blogs = useRouteLoaderData("all-blogs");
  const myBlogs = useRouteLoaderData("my-blogs");
  // const {data} = blogs
  // const getBlogs=()=>{
  //   if(blogs){
  //     return blogs;
  //   }
  //   return myBlogs;
  // }
  const getBlogs = blogs ? blogs : myBlogs;
  const uniqueCategory = [
    "All",
    ...new Set(getBlogs.data.map((blog) => blog.category)),
  ];
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main className={classes.home}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          {/* {JSON.stringify(myBlogs.count)} */}
          {/* {JSON.stringify(blogs.count)} */}
          {/* {myBlogs.data.length}
          {blogs.data.length} */}
          {/* {getBlogs.data[0].blogName} */}
          {/* {JSON.stringify(uniqueCategory)} */}
          <div>
            <Filter category={uniqueCategory} />
          </div>

          <Grid container spacing={3}>
            {getBlogs.data.map((blog) => (
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
      console.log("djnjsfnljsldfjl")
      return redirect("/login");
    }
    const Authorization = "Bearer " + getAuthToken();
    const response = await axios.get(getMyBlogsURL, {
      headers: { Authorization },
    });
    console.log(response.data);
    return response.data;
  } else {
    const searchParams = new URL(request.url).searchParams;

    const params = paramConstructor(request, searchParams);

    const response = await axios.get(getAllBlogsURL, { params });
    console.log(response.data);
    return response.data;
  }
}
