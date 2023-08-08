import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./css/SignIn.module.css";
import { Form, Link, redirect } from "react-router-dom";

import { login } from "../../api/auth";
import { Card } from "@mui/material";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.

const base = process.env.REACT_APP_BASE_URL;
const loginURL = base + process.env.REACT_APP_LOGIN_URL;

const defaultTheme = createTheme();

const SignIn = (props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Card>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <Form method="post">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Form>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to={"/register"} style={{ textDecoration: "none" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Card>
    </ThemeProvider>
  );
};

export default SignIn;

export async function action({ request, params }) {
  const data = await request.formData();
  const loginData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(loginData);
  try {
    const res = await axios.post(loginURL, loginData);
    console.log(res.data);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return redirect("/blogs");
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
}
