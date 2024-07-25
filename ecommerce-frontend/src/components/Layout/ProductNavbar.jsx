import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "../Layout/AppBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { jwtDecode } from "jwt-decode";
import { createProduct, fetchProducts } from "../../services/api";

const rightButton = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function ProductNavbar({ setProducts }) {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const email = localStorage.getItem("email");
          if (email === "admin@gmail.com") {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    };

    checkAdminStatus();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createProduct(productData);
      alert("Product added successfully");
      setProductData({ name: "", description: "", price: "" });
      handleClose();
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error adding product:", error);
      // alert("Failed to add product");
    }
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
          {isAdmin && (
            <Button
              variant="contained"
              color="success"
              sx={rightButton}
              onClick={handleClickOpen}
            >
              {"ADD PRODUCT"}
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
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Product Description"
            type="text"
            fullWidth
            variant="outlined"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="price"
            label="Product Price"
            type="number"
            fullWidth
            variant="outlined"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductNavbar;
