import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import { fetchProductById } from "../../services/api";
import ProductInnerNavbar from "../Layout/ProductInnerNavnar";

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
  console.log(id, "id>>>>>>>>>>>>>.");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    loadProduct();
  }, [id]);

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
      <ProductInnerNavbar />
      <Container style={{ paddingTop: "10rem" }}>
        <Card>
          <CardMedia
            component="img"
            height="350"
            image={getRandomImage()}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              {product.variants?.length > 0 && "Variants"}
            </Typography>
            <Grid container spacing={2}>
              {product?.variants.map((variant, index) => (
                <Grid item key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body2">
                        Color: {variant.color}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {variant.quantity}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default ProductDetail;
