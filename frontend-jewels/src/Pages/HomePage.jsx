import React from "react";
import Header from "../Components/Header";
import "../styles/home.css";
import CategorySection from "../Components/categorySection";
import Footer from "../Components/Footer";

export const HomePage = () => {
  return (
    <div>
      <div className="home-container">
        {/* <Header isHomepage={true} /> */}
        {/* Add content below if needed */}
        <div
          style={{ position: "relative", zIndex: 2 }}
          className="col-12 flex justify-center  pt-[15rem] md:pt-[23rem]"
        >
          <div className="col-8 text-center text-white">
            <h1 className="crimson font-semibold tracking-wide text-4xl md:text-7xl">
              Welcome to Saaraa jewels
            </h1>
            <p className="montserrat text-xl">
              Our Vision of Beauty, Worn by You
            </p>
          </div>
        </div>
      </div>
      <CategorySection />
    </div>
  );
};
