import React from 'react'
import { Route, Routes } from "react-router-dom";
import { About } from "./About";
import Account from "./MyAccount";
import Register from "./Register";
import { HomePage } from "./HomePage";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/account/login" element={<Account />} />
        <Route path="/account/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Home;