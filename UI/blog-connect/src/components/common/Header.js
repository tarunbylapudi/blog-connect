import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { Form, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const Header = () => {
  const isLoggedIn = useRouteLoaderData("token-loader");
  const { enqueueSnackbar } = useSnackbar();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const showSnack = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 3000,
    });
  };

  const createBlogHandler = () => {
    if (!isLoggedIn) {
      showSnack("Please Login first!", "error");
    }
  };

  const myBlogsHandler = () => {
    if (!isLoggedIn) {
      showSnack("Please Login first!", "error");
    }
  };

  const logoHandler = () => {
    if (!isLoggedIn) {
      showSnack("Please Login first!", "error");
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link
              to={isLoggedIn ? "/blogs" : "/"}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
                onClick={logoHandler}
              >
                LOGO
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Link to={`/blogs`} style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Blogs
                </Button>
              </Link>
              <Link to={`/blogs/create`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={createBlogHandler}
                >
                  Create Blog
                </Button>
              </Link>
              <Link to={`/myBlogs`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={myBlogsHandler}
                >
                  My Blogs
                </Button>
              </Link>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to={`/blogs`} style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Blogs
                </Button>
              </Link>
              <Link to={`/blogs/create`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={createBlogHandler}
                >
                  Create Blog
                </Button>
              </Link>
              <Link to={`/myBlogs`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={myBlogsHandler}
                >
                  My Blogs
                </Button>
              </Link>
            </Box>

            {isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Form action="/logout" method="post">
                  <Button
                    textAlign="center"
                    type="submit"
                    color="error"
                    variant="contained"
                  >
                    Logout
                  </Button>
                </Form>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;
