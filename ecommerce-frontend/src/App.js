import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import "./styles/App.scss";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import HomeView from "./components/Layout/HomeView";
import ProductPage from "./components/ProductList/ProductPage";
import ProductDetail from './components/ProductList/ProductDetail'
import store from './store';
import { CartProvider } from "./components/context/CartContex";
import ShoppingCart from "./components/Cart/ShoppingCart";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/product-list" element={<ProductPage />} />
        <Route path="/product-list/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ShoppingCart/>} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
