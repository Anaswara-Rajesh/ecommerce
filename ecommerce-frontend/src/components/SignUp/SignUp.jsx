import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "../Layout/Typography";
import AppForm from "../Form/AppForm";
import { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import NavBar from "../Layout/NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { registerUser } from "../../services/api";

function SignUp() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(name, "name", email, "email", password, "pas");
      const data = await registerUser({ username:name, email, password });
      console.log(data, "data>>>>>>...");
      dispatch(login(data));
      alert("Registration successful!");
      navigate("/sign-in");
    } catch (error) {
      console.log(error, "error>>>>>>>>>>>.");
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="sign-in" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Container maxWidth="xs">
          <Typography gutterBottom></Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <Typography gutterBottom></Typography>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              SIGN UP
            </Button>
          </form>
        </Container>
      </AppForm>
    </React.Fragment>
  );
}

export default SignUp;
