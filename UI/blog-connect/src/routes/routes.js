import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import Home from "../components/home/Home";
import Blog from "../components/blog/Blog";
import App from "../App";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "/register", element: <SignUp /> },
      { path: "/login", element: <SignIn /> },
      { path: "/home", element: <Home /> },
      { path: "/blogs/:id", element: <Blog /> },
    ],
  },
]);

export default router;
