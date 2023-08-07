import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlogCard from "../common/BlogCard";

import classes from "./css/Home.module.css";
import { Link, redirect, useLoaderData, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import Filter from "../filter/filter";

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
  const uniqueCategory = [...new Set(getBlogs.data.map(blog => blog.category))];
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
            <Filter
              category={uniqueCategory}
            />
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

export async function loader({ request, params }) {
  const Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzZhMmUzMTYxMWIxMWZhYWU5ZDQ2OCIsImlhdCI6MTY5MTA4ODA2NCwiZXhwIjoxNjkzNjgwMDY0fQ.KIWQTXEAl7wsT2PoFTIwpR5BXmPWgxEroKKXT2VEpDA";
  if (request.url.includes("/myBlogs")) {
    console.log("inside");
    const response = await axios.get(getMyBlogsURL, { headers: { Authorization } });
    console.log(response.data);
    return response.data;
  }
  else {
    console.log(request);
    console.log(params);
    const searchParams = new URL(request.url).searchParams;
    console.log(searchParams.get("category"));
    const response = await axios.get(getAllBlogsURL);
    console.log(response.data);
    return response.data;
  }
}

// export async function action({ request, params}){
//   console.log(request.formData.get("category"));
//   // const response = await axios.get(getAllBlogsURL, {params: {category, toDate, fromDate}});
//   // console.log(response.data);
//   return null; 
// }

