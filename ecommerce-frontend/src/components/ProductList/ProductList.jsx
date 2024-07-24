import React from "react";
import { Link } from "react-router-dom";
import ProductNavbar from "../Layout/ProductNavbar";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

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

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Shirt1",
      description: "tfhg",
    },
    {
      id: 2,
      name: "Shirt2",
      description: "tfhg",
    },
    {
      id: 3,
      name: "Shirt3",
      description: "tfhg",
    },
    {
      id: 4,
      name: "Shirt4",
      description: "tfhg",
    },
    {
      id: 5,
      name: "Shirt5",
      description: "tfhg",
    },
    {
      id: 6,
      name: "Shirt6",
      description: "tfhg",
    },
  ];

  return (
    <React.Fragment>
      <ProductNavbar />
      <Container style={{ paddingTop: "10rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product List
        </Typography>
        <Grid container spacing={3}>
          {products?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={getRandomImage()}
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
