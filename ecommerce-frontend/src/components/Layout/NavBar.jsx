import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "../Layout/AppBar";
import AppBar from "../Layout/AppBar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function NavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }} />
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          href="/"
          sx={{ fontSize: 24 }}
        >
          {"Ecommerce App"}
        </Link>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            paddingLeft: "1rem",
          }}
        >
          <Link
            color="white"
            variant="h6"
            underline="none"
            href="/sign-in"
            sx={rightLink}
          >
            {"Sign In"}
          </Link>
          <Link
            variant="h6"
            color={"#ff3366"}
            underline="none"
            href="sign-up"
            sx={{ ...rightLink, color: "secondary.main" }}
          >
            {"Sign Up"}
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
