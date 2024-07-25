import React, { useState, useEffect } from "react";
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
  TextField,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { fetchProducts, deleteProduct, fetchUser } from "../../services/api";
import EditProductModal from "../modal/EditProductModal";

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
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const checkAdminStatus = async () => {
      try {
        const user = await fetchUser();
        setIsAdmin(user.email === "admin@gmail.com");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    loadProducts();
    checkAdminStatus();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleProductUpdated = async () => {
    try {
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <React.Fragment>
      <ProductNavbar setProducts={setProducts} />
      <Container style={{ paddingTop: "10rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product List
        </Typography>

        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid
          container
          spacing={3}
          justifyContent={filteredProducts.length < 3 ? "center" : "flex-start"}
        >
          {filteredProducts.map((product) => (
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      component={Link}
                      to={`/product-list/${product._id}`}
                      variant="contained"
                    >
                      View Details
                    </Button>

                    {isAdmin && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 2,
                        }}
                      >
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(product?._id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedProduct && (
        <EditProductModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={selectedProduct}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </React.Fragment>
  );
};

export default ProductList;
