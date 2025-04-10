import React, { useEffect, useState } from "react";
import "./header.css"; // External CSS for styling
import { IoSearchSharp } from "react-icons/io5";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { TiMediaEject } from "react-icons/ti";
import { FiSearch, FiX } from "react-icons/fi";

const Header = ({ isHomepage }) => {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.role === "admin" || user?.isAdmin;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const isHome = isHomepage || location.pathname === "/";

  return (
    <header
      className={`container-fluid fixed top-0 w-full z-[30] transition-all duration-300 ${
        isScrolled ? "header-blur" : ""
      }`}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Left-side options (Menu, Search) */}
          <div className="col-3 d-flex justify-content-start align-items-center">
            <div className="flex items-center gap-4">
              {/* Menu Button */}
              <button
                onClick={() => setShowMenuModal(true)}
                className={`d-none d-md-flex align-items-center pe-4 ${
                  isHome ? "header-home" : "header-other"
                } `}
                // className="flex items-center gap-2 hover:text-gray-600 transition-colors"
              >
                <FiMenu className="w-6 h-6" />
                <span className="hidden sm:inline">Menu</span>
              </button>

              {/* Search Button */}
              <button
                onClick={() => setShowSearchModal(true)}
                // className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                className={`d-none d-md-flex align-items-center pe-4 ${
                  isHome ? "header-home" : "header-other"
                } `}
              >
                <FiSearch className="w-6 h-6" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Logo at center */}
          <div className="col-6 flex justify-center">
            <a
              href="/"
              className={`no-underline ${
                isHome ? "header-home" : "header-other"
              }  crimson font-semibold`}
            >
              <img
                src={
                  isHome
                    ? "https://res.cloudinary.com/dckm6ymoh/image/upload/v1744116642/Group_1597877808_ehkxos.png"
                    : "https://res.cloudinary.com/dckm6ymoh/image/upload/v1744116641/Group_1597877807_1_ednxm0.png"
                }
                className="w-20 h-20"
                alt="Logo"
              />
            </a>
          </div>

          {/* Right-side options (User, Heart, Cart) */}
          <div className="col-3 d-flex align-items-center justify-content-end">
            <Link
              to="/account/login"
              className={`d-none d-md-flex align-items-center pe-4 ${
                isHome ? "header-home" : "header-other"
              } `}
            >
              <FaRegUser />{" "}
              <span className="montserrat uppercase fs-12 tracking-wider ps-1">
                Account
              </span>
            </Link>
            <Link
              to="/about"
              className={`d-none d-md-flex align-items-center pe-4 ${
                isHome ? "header-home" : "header-other"
              } `}
            >
              <TiMediaEject size={20} />{" "}
              <span className="montserrat uppercase fs-12 tracking-wider ps-1">
                About
              </span>
            </Link>
            {/* <Link
              // to="/pages/whislist"
              className={`d-none d-md-flex align-items-center pe-4 ${
                isHome ? "header-home" : "header-other"
              }`}
            >
              <FaRegHeart />{" "}
              <span className="montserrat uppercase fs-12 tracking-wider ps-1">
                Wishlist
              </span>
            </Link> */}
            <Link
              // to="/cart"
              className={`d-none d-md-flex align-items-center ${
                isHome ? "header-home" : "header-other"
              }`}
            >
              <FiShoppingCart />{" "}
              <span className="montserrat uppercase fs-12 tracking-wider ps-1">
                Cart
              </span>
            </Link>
            <label
              htmlFor="search-toggle"
              className={`d-flex d-md-none align-items-center ps-4 border-0 cursor-pointer ${
                isHome ? "header-home" : "header-other"
              }`}
            >
              <IoSearchSharp />
              <span className="montserrat uppercase fs-12 tracking-wider ps-1">
                Search
              </span>
            </label>
          </div>
        </div>
      </nav>

      {/* Off-Canvas Menu */}
      {/* <input type="checkbox" id="menu-toggle" className="menu-toggle" />
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
              <Link
                // to="/orders"
                className="menu-item"
              >
                My Orders
              </Link>
            </li>
            <li>
              <Link
                // to="/cart"
                className="menu-item"
              >
                My Cart
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admin/dashboard" className="menu-item">
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <input type="checkbox" id="search-toggle" className="search-toggle" />
      <div className="search-overlay">
        <div className="off-canvas-content">
          <div className="search-close-button">
            <label
              htmlFor="search-toggle"
              className="text-gray-700 opacity-60 cursor-pointer"
            >
              X
            </label>
          </div>
          <div className="px-2 mt-2">
            <input
              type="text"
              placeholder="Search ... "
              className="border w-full py-2 ps-3"
              name=""
              id=""
            />
          </div>
        </div>
      </div> */}

      {/* Menu Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-start">
          <div className="bg-white w-[20%] h-full p-6 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={() => setShowMenuModal(false)}
                className="p-2 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <ul className="menu-items">
                <li>
                  <Link to="/account/login" className="menu-item">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    // to="/orders"
                    className="menu-item"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    // to="/cart"
                    className="menu-item"
                  >
                    My Cart
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/admin/dashboard" className="menu-item">
                      Admin Panel
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-start">
          <div className="bg-white w-[40%] h-full p-6 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Search</h2>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-2 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 ps-4 border-2 border-gray-200 rounded-lg text-xl focus:outline-none focus:border-gray-500"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
