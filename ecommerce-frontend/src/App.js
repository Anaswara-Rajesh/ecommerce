import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import "./styles/App.scss";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import HomeView from "./components/Layout/HomeView";
import ProductList from "./components/ProductList/ProductList";
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/product-list" element={<ProductList />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
