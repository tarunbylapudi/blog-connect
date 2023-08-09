import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Form, Link, NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import SnackBar from "./SnackBar";

const pages = [
  { name: "Blogs", path: "/blogs", isAuthReq: false },
  { name: "My Blogs", path: "/myBlogs", isAuthReq: true },
  { name: "Create Blog", path: "/blogs/create", isAuthReq: true },
];

const Header = ({ isLoggedIn }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [showSnack, setShowSnack] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const createBlogHandler = () => {
    console.log("intoSnack");
    if (!isLoggedIn) {
      setSnackMsg("Please login first!");
      setShowSnack(true);
    }
  };

  const myBlogsHandler = () => {
    console.log("intoSnack");
    if (!isLoggedIn) {
      setSnackMsg("Please login first!");
      setShowSnack(true);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

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
              {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name}>
                  <NavLink
                    to={page.path}
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                      };
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu> */}

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
              <Link to={`/blogs`} style={{ textDecoration: "none" }}>
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
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Create Blog
                </Button>
              </Link>
              <Link to={`/myBlogs`} style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
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
      <SnackBar showSnack={showSnack} message={snackMsg} />
    </>
  );
};
export default Header;
