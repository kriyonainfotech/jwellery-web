import React from 'react';
import './header.css'; // External CSS for styling
import { IoSearchSharp } from "react-icons/io5";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isHomepage }) => {

  const location = useLocation();
  const isHome = isHomepage || location.pathname === "/";

  return (
    <header className="container-fuild fixed top-0 w-full z-10 ">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Left-side options (Menu, Search) */}
          <div className="col-3 d-flex justify-content-start align-items-center">
            <label htmlFor="menu-toggle" className={`d-flex align-items-center  border-0 cursor-pointer ${isHome ? "header-home" : "header-other"}`}>
              <FiMenu />
              <span className='montserrat uppercase fs-12 tracking-wider ps-1'>Menu</span>
            </label>
            <label htmlFor="search-toggle" className={`d-none d-md-flex align-items-center ps-4 border-0 cursor-pointer ${isHome ? "header-home" : "header-other"}`}>
              <IoSearchSharp />
              <span className='montserrat uppercase fs-12 tracking-wider ps-1'>Search</span>
            </label>
          </div>

          {/* Logo at center */}
          <div className="col-6 flex justify-center">
            <a href="/" className={`no-underline ${isHome ? "header-home" : "header-other"} text-3xl crimson text-5xl font-semibold`}>MG</a>
          </div>

          {/* Right-side options (User, Heart, Cart) */}
          <div className="col-3 d-flex align-items-center justify-content-end">
            <Link to='/account/login' className={`d-none d-md-flex align-items-center pe-4 ${isHome ? "header-home" : "header-other"} `} >
              <FaRegUser /> <span className='montserrat uppercase fs-12 tracking-wider ps-1'>Account</span>
            </Link>
            <Link to='/pages/whislist' className={`d-none d-md-flex align-items-center pe-4 ${isHome ? "header-home" : "header-other"}`}>
              <FaRegHeart /> <span className='montserrat uppercase fs-12 tracking-wider ps-1'>Wishlist</span>
            </Link>
            <Link to='/cart' className={`d-none d-md-flex align-items-center ${isHome ? "header-home" : "header-other"}`}>
              <FiShoppingCart /> <span className='montserrat uppercase fs-12 tracking-wider ps-1'>Cart</span>
            </Link>
            <label htmlFor="search-toggle" className={`d-flex d-md-none align-items-center ps-4 border-0 cursor-pointer ${isHome ? "header-home" : "header-other"}`}>
              <IoSearchSharp />
              <span className='montserrat uppercase fs-12 tracking-wider ps-1'>Search</span>
            </label>
          </div>
        </div>
      </nav>

      {/* Off-Canvas Menu */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <div className="menu-overlay">
        <div className="off-canvas-content">
          <div className="menu-close-button">
            <label htmlFor="menu-toggle" className="text-gray-700 opacity-60 cursor-pointer">X</label>
          </div>

          <ul className="menu-items">
            <li><Link to="/account/login" className="menu-item">My Profile</Link></li>
            <li><Link to="/orders" className="menu-item">My Orders</Link></li>
            <li><Link to="/cart" className="menu-item">My Cart</Link></li>
            <li><Link to="/seller/register" className="menu-item">Become a Seller</Link></li>
          </ul>
        </div>
      </div>

      {/* search */}
      <input type="checkbox" id="search-toggle" className="search-toggle" />
      <div className="search-overlay">
        <div className="off-canvas-content">
          <div className="search-close-button">
            <label htmlFor="search-toggle" className="text-gray-700 opacity-60 cursor-pointer">X</label>
          </div>
          <div className="px-2 mt-2">
            <input type="text" placeholder='Search ... ' className='border w-full py-2 ps-3' name="" id="" />
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
