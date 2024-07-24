import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";

function AppBar(props) {
  return (
    <MuiAppBar
      elevation={0}
      position="fixed"
      {...props}
      style={{
        backgroundColor: "#28282a",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding:'2vh',
      }}
    />
  );
}

export default AppBar;
