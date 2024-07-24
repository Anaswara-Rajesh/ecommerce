import React from 'react'
import Toolbar from "../Layout/AppBar";

function ProductNavbar() {
  return (
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
            {"ADD PRODUCT"}
          </Link>
          <Link
            variant="h6"
            color={"#ff3366"}
            underline="none"
            href="sign-up"
            sx={{ ...rightLink, color: "secondary.main" }}
          >
            {"LOGOUT"}
          </Link>
        </Box>
      </Toolbar>
  )
}

export default ProductNavbar