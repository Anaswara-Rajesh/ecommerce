import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Grid,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ProductInnerNavbar from "../Layout/ProductInnerNavnar";
import { getCartItems, removeCartItem, clearCart } from "../../services/api";
const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    setStatus("loading");
    try {
      const response = await getCartItems();
      console.log(response?.items, "response?.data?.items");
      setItems(response?.items || []);
      setStatus("succeeded");
    } catch (error) {
      setError(error.message);
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleBackClick = () => {
    navigate("/product-list");
  };

  const handleRemove = async (itemId, variantId) => {
    try {
      await removeCartItem(itemId, variantId);
      setItems(
        items.filter(
          (item) =>
            !(item.product.id === itemId && item.variant.id === variantId)
        )
      );
      fetchCartItems();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClearCheckout = async () => {
    try {
      await clearCart();
      setItems([]);
    } catch (error) {
      setError(error.message);
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <React.Fragment>
      <ProductInnerNavbar />
      <Container sx={{ padding: "10rem", maxWidth: "md" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        {status === "loading" ? (
          <CircularProgress />
        ) : items.length === 0 ? (
          <Typography>
            <Typography> Your cart is empty</Typography>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleBackClick}
              style={{ marginBottom: "1rem" }}
            >
              Back to Products
            </Button>
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {items.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={`${item?.product}-${item?.variant}`}
                >
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {item?.product?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Color: {item?.variant?.color}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {item?.variant?.size}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item?.quantity}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemove(item.product, item.variant)}
                        sx={{ mr: 1 }}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
              Total Items: {totalItems}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClearCheckout}
            >
              Clear Cart
            </Button>
            <Typography style={{ paddingTop: "6vh" }} gutterBottom>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleBackClick}
                style={{ marginBottom: "1rem" }}
              >
                Back to Products
              </Button>
            </Typography>
          </>
        )}
        {status === "failed" && <Typography color="error">{error}</Typography>}
      </Container>
    </React.Fragment>
  );
};

export default ShoppingCart;
