import React from "react";
import { Typography, Container, Grid, Button, TextField } from "@mui/material";
import ProductInnerNavbar from "../Layout/ProductInnerNavnar";

const ShoppingCart = () => {
  const handleRemove = (id, variant) => {};

  const handleClearCheckout = () => {};

  const cart = [];

  return (
    <React.Fragment>
      <ProductInnerNavbar />
      <Container style={{padding:"10rem"}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        {cart?.items?.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {cart?.items?.map((item) => (
                <Grid item xs={12} key={`${item.id}-${item.variant}`}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">Color: {item?.color}</Typography>
                  <Typography variant="body2">Size: {item?.size}</Typography>
                  <Typography variant="body2">
                    Quantity: ${item?.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemove(item.id, item.variant)}
                  >
                    Remove
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6" component="h2" gutterBottom>
              Total Items: ${0}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Checkout not implemented")}
            >
              Checkout
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleClearCheckout()}
            >
              Clear Cart
            </Button>
          </>
        )}
      </Container>
    </React.Fragment>
  );
};

export default ShoppingCart;
