import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, variant) => {
    setCartItems((prevItems) => [...prevItems, { ...product, variant }]);
  };

  const removeFromCart = (productId, variantIndex) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item, index) => item.id !== productId || index !== variantIndex
      )
    );
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
