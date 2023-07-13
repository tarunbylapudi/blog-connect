import Home from "./components/home/Home";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import { useState } from "react";

function App() {
  const [showSignIn, setShowSignIn] = useState(true);
  return (
    <>
      <SignIn />
      <SignUp />
      <Home />
    </>
  );
}

export default App;
