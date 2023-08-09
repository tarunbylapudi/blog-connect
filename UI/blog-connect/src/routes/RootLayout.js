import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import SnackBar from "../components/common/SnackBar";
const RootLayout = () => {
  const isLoggedIn = useRouteLoaderData("token-loader");

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
      
    </>
  );
};

export default RootLayout;
