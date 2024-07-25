import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "../Layout/AppBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { createVariant } from "../../services/api";

const rightButton = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function ProductInnerNavbar({ productId, onVariantChange }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();

  const userEmail = localStorage?.getItem("email");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddVariant = async () => {
    const variantData = {
      productId: productId,
      color,
      size,
      stock,
    };
    await dispatch(createVariant(variantData));
    setOpen(false);
    onVariantChange();
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: "space-between" }}>
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
          {userEmail === "admin@gmail.com" && (
            <Button
              variant="contained"
              color="success"
              sx={rightButton}
              onClick={handleClickOpen}
            >
              {"ADD VARIANT"}
            </Button>
          )}

          <Button
            variant="contained"
            color="warning"
            sx={rightButton}
            href="/cart"
          >
            {"VIEW CART"}
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
        <DialogTitle>{"Add New Variant"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="size"
            label="Size"
            type="text"
            fullWidth
            variant="outlined"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <TextField
            margin="dense"
            id="color"
            label="Color"
            type="text"
            fullWidth
            variant="outlined"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <TextField
            margin="dense"
            id="stock"
            label="Stock"
            type="number"
            fullWidth
            variant="outlined"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddVariant} color="primary">
            Add Variant
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductInnerNavbar;
