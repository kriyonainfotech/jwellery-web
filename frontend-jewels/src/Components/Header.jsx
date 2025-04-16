import React, { useEffect, useState } from "react";
import "./header.css"; // External CSS for styling
import { IoSearchSharp } from "react-icons/io5";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { TiMediaEject } from "react-icons/ti";
import { FiSearch, FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { FaAngleDown } from "react-icons/fa";
import { getCartItemCount } from "./utilis/cartUtils";
import { HiLightBulb } from "react-icons/hi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const apiurl = import.meta.env.VITE_API_URL;

const Header = ({ isHomepage }) => {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.role === "admin" || user?.isAdmin;
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const dropdownStyles = {
    dropdown: {
      position: "absolute",
      top: "100%",
      left: "10%",
      width: "80vw",
      height: "500px", // Fixed height
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "0 0 8px 8px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      zIndex: 1000,
      padding: "2rem",
      display: "flex",
      gap: "2rem",
      transition: "all 0.3s ease",
      opacity: activeCategory ? 1 : 0,
      visibility: activeCategory ? "visible" : "hidden",
      overflow: "hidden",
    },
    subcategories: {
      flex: 1.5,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      overflowY: "auto",
    },
    imageContainer: {
      flex: 1,
      borderRadius: "8px",
      overflow: "hidden",
      width: "100%",
      height: "100%",
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCartCount(getCartItemCount());
  }, []);

  useEffect(() => {
    const update = () => setCartCount(getCartItemCount());
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  const location = useLocation();
  const isHome = isHomepage || location.pathname === "/";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const local = localStorage.getItem("categories");
        if (local) {
          // console.log("Local categories found:", local);
          setCategories(JSON.parse(local));
        } else {
          const res = await axios.get(`${apiurl}/category/getallcategories`);

          console.log(res.data, "categories");

          if (res.data?.categories) {
            setCategories(res.data.categories);
            localStorage.setItem(
              "categories",
              JSON.stringify(res.data.categories)
            );
          }
        }
      } catch (err) {
        console.log("❌ Failed to load categories:", err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header
      className={`container-fluid fixed top-0 w-full z-[30] transition-all duration-300 ${
        isScrolled ? "header-blur" : ""
      }  ${isHome ? "" : "header-other"}`}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Left-side options (Menu, Search) */}
          <div className="col-3 d-flex justify-content-start align-items-center">
            <div className="flex items-center gap-1 md:gap-4">
              {/* Menu Button */}
              <button
                onClick={() => setShowMenuModal(true)}
                className={`flex align-items-center pe-4 header-home
                  } `}
                // className="flex items-center gap-2 hover:text-gray-600 transition-colors"
              >
                <FiMenu className="w-6 h-6" />
                <span className="hidden sm:inline montserrat uppercase fs-12 tracking-wider ps-1">
                  Menu
                </span>
              </button>

              {/* Search Button */}
              <button
                onClick={() => setShowSearchModal(true)}
                // className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                className={`flex align-items-center pe-4 header-home
                  } `}
              >
                <FiSearch className="w-6 h-6" />
                <span className="hidden sm:inline montserrat uppercase fs-12 tracking-wider ps-1">
                  Search
                </span>
              </button>
            </div>
          </div>

          {/* Logo at center */}
          <div className="col-6 flex justify-center">
            <a
              href="/"
              className={`no-underline header-home
                }  crimson font-semibold`}
            >
              <img
                src={isHome ? "/Vector.svg" : "/Vector.svg"}
                className="w-20 h-20"
                alt="Logo"
              />
            </a>
          </div>

          {/* Right-side options (User, Heart, Cart) */}
          <div className="col-3 d-flex align-items-center justify-content-end">
            <Link
              to="/account/login"
              className={`flex align-items-center pe-4 header-home
                } `}
            >
              <FaRegUser className="w-6 h-6" />{" "}
              <span className="hidden sm:inline montserrat uppercase fs-12 tracking-wider ps-1">
                Account
              </span>
            </Link>
            <Link
              to="/about"
              className={`d-none d-lg-flex align-items-center pe-4 header-home
                } `}
            >
              <HiLightBulb className="w-6 h-6" />{" "}
              <span className="hidden lg:inline montserrat uppercase fs-12 tracking-wider ps-1">
                About
              </span>
            </Link>
            <Link
              to={"/cart"}
              className="relative d-none d-md-flex items-center gap-1 text-gray-900 header-home"
            >
              <FiShoppingCart className="w-8 h-8" />
              <span className="hidden sm:inline montserrat uppercase fs-12 tracking-wider ps-1">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-maroon text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* // Modify the categories map in the return statement */}
      {categories?.length > 0 && (
        <div className="relative d-none d-lg-flex flex-col">
          {/* Category Header */}
          <div className="container mx-auto flex flex-wrap justify-center items-center gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="relative pb-2"
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  to={`/shop/category/${cat._id}`}
                  className="flex items-center montserrat text-[#EFDFBB] gap-1 text-md hover:text-white transition no-underline"
                >
                  {cat.name} <FaAngleDown className="text-xs mt-[1px]" />
                </Link>
              </div>
            ))}
          </div>

          {/* ✅ Dropdown outside map, full width */}
          {activeCategory?.subcategories?.length > 0 && (
            <div
              className="absolute top-full left-0 w-full bg-white z-50 shadow-lg px-10 py-8 flex gap-8 h-[500px]"
              onMouseEnter={() => setActiveCategory(activeCategory)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {/* Subcategories list */}
              <div className="flex-[1.5] flex flex-col gap-4 overflow-y-auto">
                {activeCategory.subcategories.map((sub) => (
                  <Link
                    key={sub._id}
                    to={`/shop/subcategory/${sub._id}`}
                    className="text-gray-900 text-lg montserrat py-2 px-4 rounded-lg no-underline hover:bg-gray-200 transition"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>

              {/* Image Section */}
              <div className="flex-1 rounded-lg overflow-hidden h-full">
                <img
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Menu Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 z-50 h-screen bg-black bg-opacity-50 flex items-start justify-start">
          <div className="bg-white w-full h-full lg:w-[20%] p-6 shadow-lg overflow-y-auto">
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
                <li className="bg-gray-50 my-2">
                  <button
                    className="menu-item w-full flex"
                    onClick={() => setShowMobileCategories((prev) => !prev)}
                  >
                    <div className="flex flex-wrap justify-start items-center gap-2">
                      <span className="text-base font-medium montserrat">
                        Categories
                      </span>
                      <span className="text-xl mt-1">
                        {showMobileCategories ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </span>
                    </div>
                  </button>

                  {/* Subcategories dropdown */}
                  {showMobileCategories && categories?.length > 0 && (
                    <ul className="mx-4 mt-2 space-y-2 ps-0">
                      {categories.map((cat) => (
                        <li
                          key={cat._id}
                          className="border-1 border-gray-200 py-2 my-1"
                        >
                          <Link
                            to={`/shop/category/${cat._id}`}
                            className="block px-2 py-1 text-sm font-medium text-gray-700 hover:text-red-800 montserrat"
                            onClick={() => {
                              setShowMenuModal(false); // close modal
                              setShowMobileCategories(false); // optional: collapse dropdown too
                            }}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className="bg-gray-50 my-2">
                  <Link to="/account/login" className="menu-item">
                    My Profile
                  </Link>
                </li>
                <li className="bg-gray-50 my-2">
                  <Link
                    // to="/orders"
                    className="menu-item"
                  >
                    My Orders
                  </Link>
                </li>
                <li className="bg-gray-50 my-2">
                  <Link
                    // to="/cart"
                    className="menu-item"
                  >
                    My Cart
                  </Link>
                </li>
                {isAdmin && (
                  <li className="bg-gray-50 my-2">
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
        <div className="fixed inset-0 z-50 h-screen bg-black bg-opacity-50 flex items-start justify-start">
          <div className="bg-white w-full h-full lg:w-[20%] p-6 shadow-lg overflow-y-auto">
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
