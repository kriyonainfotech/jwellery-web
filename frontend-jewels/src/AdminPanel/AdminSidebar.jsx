import React, { useState } from "react";
import "../styles/adminsidebar.css"; // Import the CSS styles
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage sidebar toggle state

  return (
    <div className="">
      <label
        htmlFor="menu-toggle"
        className={`d-flex align-items-center  border-0 cursor-pointer absolute top-5`}
      >
        <FiMenu />
        <span className="montserrat uppercase fs-12 tracking-wider ps-1">
          Menu
        </span>
      </label>
      <div className="sidebar-container">
        <nav className="sidebar">
          <ul>
            <li className="py-2 hover:bg-gray-800 px-3">
              <Link to={"/admin/"}>Dashboard</Link>
            </li>
            <li className="py-2 hover:bg-gray-800 px-3">
              <Link className="" to={"/admin/categories"}>
                Manage Categories
              </Link>
            </li>
            <li className="py-2 hover:bg-gray-800 px-3">
              <Link className="" to={"/admin/subcategories"}>
                Manage SubCategories
              </Link>
            </li>
            <li className="py-2 hover:bg-gray-800 px-3">
              <Link className="" to={"/admin/products"}>
                Manage Products
              </Link>
            </li>
            <li className="py-2 hover:bg-gray-800 px-3">
              <Link className="" to={"/admin/orders"}>
                Manage Orders
              </Link>
            </li>
            <li className="py-2 hover:bg-gray-800 px-3">
              <Link className="" to={"/admin/users"}>
                View Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* offcanvas */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <div className="menu-overlay">
        <div className="off-canvas-content">
          <div className="menu-close-button">
            <label
              htmlFor="menu-toggle"
              className="text-gray-700 opacity-60 cursor-pointer"
            >
              X
            </label>
          </div>

          <ul className="menu-items">
            <li>
              <Link to="/account/login" className="menu-item">
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/orders" className="menu-item">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/cart" className="menu-item">
                My Cart
              </Link>
            </li>
            <li>
              <Link to="/seller/register" className="menu-item">
                Become a Seller
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
