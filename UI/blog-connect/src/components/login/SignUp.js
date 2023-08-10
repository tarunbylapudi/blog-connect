import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Form, Link, json, redirect, useActionData } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import axios from "axios";

const base = process.env.REACT_APP_BASE_URL;
const registerURL = base + process.env.REACT_APP_REGISTER_URL;

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignUp = (props) => {
  const signUpResponse = useActionData();
  const [errors, setErrors] = React.useState([]);

  const ValidationErrors = (signUpResponse) => {
    if (signUpResponse) {
      if (signUpResponse.error.error.includes("email")) {
        setErrors(["Please add a valid email"]);
      }
      if (signUpResponse.error.error.includes("password")) {
        setErrors([
          "password must has atleast 8 characters that include atleast 1 lower case, 1 upper case, 1 number and 1 special character",
        ]);
      }
      if (
        signUpResponse.error.error.includes("email") &&
        signUpResponse.error.error.includes("password")
      ) {
        setErrors([
          "Please add a valid email",
          "password must has atleast 8 characters that include atleast 1 lower case, 1 upper case, 1 number and 1 special character",
        ]);
      }
      console.log(errors);
    }
  };
  React.useEffect(() => {
    ValidationErrors(signUpResponse);
  }, [signUpResponse]);
  return (
    <ThemeProvider theme={defaultTheme}>
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
          {errors}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Form method="post">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              {errors[0]}
              {errors.length > 0 &&
                errors.map((error) => (
                  <Alert severity="error" variant="outlined">
                    {error}
                  </Alert>
                ))}
              {/* {signUpResponse && (
                <Alert severity="error" variant="outlined">
                  This email is already registered!
                </Alert>
              )} */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

export async function action({ request, params }) {
  const data = await request.formData();

  const signUpData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    const res = await axios.post(registerURL, signUpData);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    console.log(res.data.token);
    return redirect("/blogs");
  } catch (error) {
    return json({ error: error.response.data });
  }
}
