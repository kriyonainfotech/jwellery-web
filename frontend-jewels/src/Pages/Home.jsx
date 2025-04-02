import React from 'react'
import Header from '../Components/Header'
import '../styles/home.css'
import CategorySection from '../Components/categorySection'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <div>
      <div className="home-container">
        <Header isHomepage={true} />
        {/* Add content below if needed */}
        <div className="col-12 flex justify-center  pt-[15rem] md:pt-[16rem]">
          <div className="col-8 text-center text-white">
            <h1 className="crimson font-semibold tracking-wide text-4xl md:text-5xl">Welcome to Material Goods</h1>
            <p className="montserrat ">Discover classy, minimal, and aesthetic jewelry.</p>
          </div>
        </div>
      </div>
      <CategorySection />
      <Footer />
    </div>
  )
}

export default Home
