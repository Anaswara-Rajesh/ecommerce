import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../services/api";
import ProductInnerNavbar from "../Layout/ProductInnerNavnar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { updateVariant, deleteVariant } from "../../store/variantSlice";
import { addToCart } from "../../store/cartSlice";

const images = [
  "/shirt1.jpeg",
  "/shirt2.jpeg",
  "/shirt3.jpeg",
  "/shirt4.jpeg",
  "/shirt5.jpeg",
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [editVariant, setEditVariant] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const cartStatus = useSelector((state) => state?.cart?.status);
  const cartError = useSelector((state) => state?.cart?.error);

  const loadProduct = async () => {
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleOpenEditDialog = (variant) => {
    setEditVariant(variant);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditVariant(null);
  };

  const handleUpdateVariant = async () => {
    if (editVariant) {
      await dispatch(updateVariant(editVariant?._id, editVariant));
      handleCloseEditDialog();
      loadProduct();
    }
  };

  const handleDeleteVariant = async (variantId) => {
    await dispatch(deleteVariant(variantId));
    loadProduct();
  };

  const handleBackClick = () => {
    navigate("/product-list"); 
  };

  const handleAddToCart = async (variantId) => {
    try {
      console.log(variantId, "variantId");
      await dispatch(
        addToCart({ productId: id, variantId, quantity: 1 })
      ).unwrap();
      setSnackbarMessage("Item added to cart successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    setEditVariant({ ...editVariant, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!product) {
    return (
      <Container style={{ paddingTop: "10rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <ProductInnerNavbar productId={id} onVariantChange={loadProduct} />
      <Container style={{ paddingTop: "10rem" }}>
      <Button
          variant="contained"
          color="inherit"
          onClick={handleBackClick}
          style={{ marginBottom: "1rem" }}
        >
          Back to Products
        </Button>
        <Card>
          <CardMedia
            component="img"
            height="350"
            image={getRandomImage()}
            alt={product?.name}
          />
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              {product.variants?.length > 0 && "Variants"}
            </Typography>
            <Grid container spacing={2}>
              {product?.variants?.map((variant) => (
                <Grid item key={variant.id} xs={12} sm={6} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body2">
                        Color: {variant.color}
                      </Typography>
                      <Typography variant="body2">
                        Size: {variant.size}
                      </Typography>
                      <Typography variant="body2">
                        Stock: {variant.stock}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginTop: "1rem" }}
                          onClick={() => handleAddToCart(variant._id)}
                          startIcon={<AddShoppingCartIcon />}
                          disabled={cartStatus === "loading"}
                        >
                          {cartStatus === "loading"
                            ? "Adding..."
                            : "Add to Cart"}
                        </Button>
                        <div style={{ display: "flex", marginTop: "1rem" }}>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEditDialog(variant)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDeleteVariant(variant?._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Variant</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="color"
              label="Color"
              type="text"
              fullWidth
              value={editVariant?.color || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="size"
              label="Size"
              type="text"
              fullWidth
              value={editVariant?.size || ""}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="stock"
              label="Stock"
              type="number"
              fullWidth
              value={editVariant?.stock || ""}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateVariant} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </React.Fragment>
  );
};

export default ProductDetail;
