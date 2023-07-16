import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Home from "./components/home/Home";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import { useState } from "react";

function App() {
  const [showSignIn, setShowSignIn] = useState(true);

  const signInSignUpHandler = () => {
    setShowSignIn((prev) => !prev);
  };
  return (
    <>
      <Header />
      {showSignIn} {"hjggkkkkkkk"}
      {showSignIn && <SignIn onSignSignUpHandler={signInSignUpHandler} />}
      {!showSignIn && <SignUp onSignSignUpHandler={signInSignUpHandler} />}
      <Home />
      <Footer />
    </>
  );
}

export default App;
