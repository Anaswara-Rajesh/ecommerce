import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "../Layout/AppBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const rightButton = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function ProductNavbar() {
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="h6"
          underline="none"
          color="inherit"
          href="/"
          sx={{ fontSize: 24 }}
        >
          {"Ecommerce App"}
        </Button>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            paddingLeft: "1rem",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={rightButton}
            onClick={handleClickOpen} 
          >
            {"ADD PRODUCT"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            href="/"
            sx={{ ...rightButton, color: "secondary.main" }}
          >
            {"LOGOUT"}
          </Button>
        </Box>
      </Toolbar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Add New Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details to add a new product.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="description"
            label="Product Description"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="price"
            label="Product Price"
            type="number"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductNavbar;
