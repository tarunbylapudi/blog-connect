import { Outlet } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/home/Home";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import { useState } from "react";
import Blog from "./components/blog/Blog";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
