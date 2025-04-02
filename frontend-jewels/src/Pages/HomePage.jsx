import React from 'react'
import '../styles/home.css';
import Header from '../Components/Header';

const HomePage = () => {
  return (
    <div>
      <div className="home-container">
        <Header />
        {/* Add content below if needed */}
        <div className="content">
          <h1 className="welcome-text crimson">Welcome to Material Goods</h1>
          <p className="description-text montserrat">Discover classy, minimal, and aesthetic jewelry.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
