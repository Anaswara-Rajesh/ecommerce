import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { updateProduct } from "../../services/api"; 

const EditProductModal = ({ open, onClose, product, onProductUpdated }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateProduct(editedProduct._id, editedProduct);
      onProductUpdated();
      onClose();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Product Name"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
          value={editedProduct.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Product Description"
          type="text"
          fullWidth
          variant="outlined"
          name="description"
          value={editedProduct.description}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Product Price"
          type="number"
          fullWidth
          variant="outlined"
          name="price"
          value={editedProduct.price}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
