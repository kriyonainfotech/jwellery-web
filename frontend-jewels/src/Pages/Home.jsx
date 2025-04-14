import React from 'react'
import { Route, Routes } from "react-router-dom";
import { About } from "./About";
import Account from "./MyAccount";
import Register from "./Register";
import { HomePage } from "./HomePage";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProductPage from "./productPage";
import ProductDetails from './ProductDetails';
import ProductDetailsPage from './ProductDetailsPage';
import CartPage from './CartPage';
import Checkout from './Checkout';

const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/account/login" element={<Account />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/shop/category/:categoryId" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/checkout' element={<Checkout />} />
        {/* <Route path="/product/:productId" element={<ProductDetails />} /> */}
        <Route
          path="/shop/subcategory/:subcategoryId"
          element={<ProductPage />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Home;