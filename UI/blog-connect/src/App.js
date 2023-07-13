import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/home/Home";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import { useState } from "react";

function App() {
  const [showSignIn, setShowSignIn] = useState(true);
  return (
    <>
      <Header />
      <SignIn />
      <SignUp />
      <Home />
      <Footer />
    </>
  );
}

export default App;
