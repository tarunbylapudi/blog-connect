import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import BlogForm, {
  action as blogHandlerAction,
} from "../components/blog/create/BlogForm";
import Home, { loader as allBlogsLoader } from "../components/home/Home";
import Blog, {
  loader as blogLoader,
  action as deleteAction,
} from "../components/blog/Blog";

import App from "../App";
import RootLayout from "./RootLayout";
import EditBlog from "../pages/EditBlog";
import CreateBlog from "../pages/CreateBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <SignIn /> },
      { path: "register", element: <SignUp /> },
      { path: "login", element: <SignIn /> },
      {
        path: "blogs",
        id: "all-blogs",
        loader: allBlogsLoader,
        children: [
          { index: true, element: <Home /> },
          {
            path: ":id",
            loader: blogLoader,
            action: deleteAction,
            id: "single-blog",
            children: [
              { index: true, element: <Blog /> },
              {
                path: "edit",
                element: <EditBlog />,
                action: blogHandlerAction,
              },
            ],
          },
          {
            path: "create",
            element: <CreateBlog />,
            action: blogHandlerAction,
          },
        ],
      },
      { path: "myBlogs", element: <Home/>, loader: allBlogsLoader, id: "my-blogs"},
    ],
  },
]);

export default router;
