import React, { useEffect, useState } from "react";
import ProductNavbar from "../Layout/ProductNavbar";
import { fetchProducts } from "../../services/api";
import ProductList from "../ProductList/ProductList";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <ProductNavbar setProducts={setProducts} />
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
