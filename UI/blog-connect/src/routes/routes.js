import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import Home from "../components/home/Home";
import RouteLayout from "../routes/RouteLayout";
import Blog from "../components/blog/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/home", element: <Home /> },
      { path: "/blog", element: <Blog /> },
    ],
  },
]);

export default router;
