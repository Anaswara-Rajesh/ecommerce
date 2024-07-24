import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "../Layout/Typography";
import AppForm from "../Form/AppForm";
import withRoot from "../Layout/WithRoot";
import { TextField, Button, Container } from "@mui/material";
import { useState } from "react";
import NavBar from "../Layout/NavBar";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Login successful!");
      navigate("/product-list");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="sign-up" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>

        <Container maxWidth="xs">
          <Typography gutterBottom></Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ backgroundColor: "#ff3366", padding: "1vh" }}
            >
              Login
            </Button>
          </form>
        </Container>
        <br />
        <Typography align="center">
          <Link underline="always">Forgot password?</Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
