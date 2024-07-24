import React from "react";
import { Link } from "react-router-dom";
import ProductNavbar from "../Layout/NavBar";
import {
  CircularProgress,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "nbhdbcsd",
      description: "tfhg",
    },
    {
      id: 1,
      name: "nbhdbcsd",
      description: "tfhg",
    },
    {
      id: 1,
      name: "nbhdbcsd",
      description: "tfhg",
    },
    {
      id: 1,
      name: "nbhdbcsd",
      description: "tfhg",
    },
    {
      id: 1,
      name: "nbhdbcsd",
      description: "tfhg",
    },
    {
      id: 1,
      name: "nbhdbcsd",
      description: "tfhg",
    },
  ];

  return (
    <React.Fragment>
      <ProductNavbar />
      <Container style={{ paddingTop: "10rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={3}>
          {products?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/products/${product.id}`}
                    variant="contained"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default ProductList;
