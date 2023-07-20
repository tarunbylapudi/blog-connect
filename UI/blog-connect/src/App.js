import { Outlet } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/home/Home";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import { useState } from "react";
import Blog from "./components/blog/Blog";

function App() {
  const [showSignIn, setShowSignIn] = useState(true);

  const signInSignUpHandler = () => {
    setShowSignIn((prev) => !prev);
  };
  return (
    <>
      <Header />

      <Outlet />
      {/* {showSignIn && <SignIn onSignSignUpHandler={signInSignUpHandler} />}
      {!showSignIn && <SignUp onSignSignUpHandler={signInSignUpHandler} />} */}
      {/* <Home /> */}
      <Footer />
    </>
  );
}

export default App;
