// import React, { useEffect, useState } from "react";
// import "../styles/account.css";
// import Header from "../Components/Header";
// import axios from "axios";

// const Account = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/auth/login`,
//         {
//           email,
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       console.log("Login response:", res);

//       if (res.status === 200) {
//         setIsLoggedIn(true);
//         const { user, token } = res.data;

//         setUserData(user);
//         localStorage.setItem("token", token);
//         localStorage.setItem("userInfo", JSON.stringify(user));
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     if (token && user) {
//       setIsLoggedIn(true);
//       setUserData(JSON.parse(user));
//     }
//   }, []);

//   return (
//     <div className="pt-10">
//       <div className="container">
//         <h1 className="account-heading text-3xl text-gray-900 tracking-wider pb-2 montserrat uppercase font-medium ">
//           My Account
//         </h1>
//         <div className="account-nav">
//           <a className="montserrat text-md" href="/account/login">
//             My Account
//           </a>
//           <a className="montserrat text-md" href="/account/register">
//             Register
//           </a>
//           <a className="montserrat text-md" href="/pages/contact-us">
//             Contact Us
//           </a>
//         </div>

//         {!isLoggedIn ? (
//           <div className="login-section">
//             <h2 className="uppercase montserrat text-2xl tracking-wide">
//               Sign In
//             </h2>
//             <p className="montserrat text-md">
//               Don’t have an account?{" "}
//               <a href="/account/register">Create one here</a>.
//             </p>
//             <form onSubmit={handleLogin} className="login-form">
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter password"
//                   required
//                 />
//               </div>
//               <button type="submit" className="login-button">
//                 Login
//               </button>
//             </form>
//           </div>
//         ) : (
//           <>
//             {userData && (
//               <div className="profile-section mt-3 ">
//                 <h2>Welcome, {userData.name}!</h2>
//                 <p>Email: {userData.email}</p>
//                 <p>Phone: {userData.phone}</p>
//                 <button
//                   className="text-white px-3 py-2 bg-gray-800"
//                   onClick={() => {
//                     setIsLoggedIn(false);
//                     setUserData(null);
//                     localStorage.removeItem("token");
//                     localStorage.removeItem("user");
//                   }}
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account;
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import OrderHistory from "./OrderHistory";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
    const [loginform, setLoginform] = useState({
      email: "",
      phone: "",
    });

    const location = useLocation();
    useEffect(() => {
      if (location.state?.defaultTab) {
        setActiveTab(location.state.defaultTab);
      }
    }, [location.state]);

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log(loginform, "loginform data");
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            loginform,
          },
          { withCredentials: true }
        );

        if (res.status === 200) {
          const { user, token } = res.data;
          setIsLoggedIn(true);
          setUserData(user);
          localStorage.setItem("token", token);
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
      } catch (err) {
        alert(err.response?.data?.message || "Something went wrong!");
      }
    };

    useEffect(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userInfo");
      if (token && user) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(user));
      }
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLoginform((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/register`,
          formData
        );
        if (response.status === 200) {
          alert("Registration successful! Please log in.");
        }
        console.log("User registered:", response.data);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    };

    const renderTabContent = () => {
      if (activeTab === "account") {
        return isLoggedIn && userData ? (
          <div className="mt-4 space-y-2">
            <h2 className="text-xl font-semibold">Welcome, {userData.name}!</h2>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            <p>
              Address: {userData.address?.street}, {userData.address?.city},{" "}
              {userData.address?.state}, {userData.address?.postalCode},{" "}
              {userData.address?.country}
            </p>

            {/* Display createdAt field */}
            <p>
              Joined on: {new Date(userData.createdAt).toLocaleDateString()}
            </p>

            {/* Logout button */}
            <button
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setIsLoggedIn(false);
                setUserData(null);
                localStorage.removeItem("token");
                localStorage.removeItem("userInfo");
                localStorage.removeItem("orders");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <section className="flex items-center justify-center pt-4 md:pt-10 px-2 sm:px-4">
            <div className="bg-white p-4 md:p-8 rounded-xl shadow-md w-full max-w-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4 md:mb-6">
                Login to Your Account
              </h2>

              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                {/* Email or Phone Input */}
                <div>
                  <label className="block text-gray-700 mb-1">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    name="emailOrPhone"
                    required
                    onChange={handleLoginChange}
                    placeholder="Enter your email or phone"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    onChange={handleLoginChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
                  >
                    Login
                  </button>
                </div>

                {/* Forgot Password & Sign Up */}
                <div className="flex justify-between text-sm">
                  <a href="#" className="text-red-700 hover:underline">
                    Forgot Password?
                  </a>
                  <a href="/register" className="text-red-700 hover:underline">
                    Don't have an account? Register
                  </a>
                </div>
              </form>
            </div>
          </section>
        );
      } else if (activeTab === "register") {
        return (
          <>
            <section className="flex items-center justify-center pt-4 md:pt-10 px-2 sm:px-4">
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-md w-full max-w-3xl">
                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4 md:mb-6">
                  Register Your Account
                </h2>

                <form
                  className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2"
                  onSubmit={handleSubmit}
                >
                  {/* Name */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                  </div>

                  {/* Phone */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                  </div>

                  {/* Password */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                  </div>

                  {/* Address Fields */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">Street</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="123 Main St"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Surat"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Gujarat"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="395010"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="India"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </>
        );
      } else if (activeTab === "contact") {
        return (
          <>
            <section className="bg-gray-100 py-8 md:py-16 px-2 sm:px-4 md:px-10">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                {/* Contact Info / Image */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-900 mb-2">
                      Contact Info
                    </h3>
                    <p className="text-gray-700">
                      📍 Corporate office 4007-08 The Palladium Mall, Yogi
                      Chowk, Surat, Gujarat 395010123 Your Street, Surat,
                      Gujarat
                    </p>
                    <p className="text-gray-700">📞 +91 63546 70311</p>
                    <p className="text-gray-700">✉️ info@evegimpex.com</p>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.4528000589385!2d72.8863542!3d21.213885899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f70d7292175%3A0xd81cb1cd81432bc!2sEveg%20International%20Private%20Limited!5e0!3m2!1sen!2sin!4v1744805029557!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[400px]"
                  ></iframe>
                </div>
              </div>
            </section>
          </>
        );
      } else if (activeTab === "orderHistory") {
        return <OrderHistory />;
      }
    };

    const filterList = ["account", "register", "orderHistory", "contact"];

    return (
      <div>
        <div className="py-40 container mx-auto px-2 sm:px-4 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold uppercase text-center montserrat mb-4 text-gray-800">
            My Account
          </h1>

          {/* Tab Navigation */}
          {/* Responsive Tab Navigation */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 border-b mb-4 md:mb-6">
            {filterList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-2 md:px-4 text-sm md:text-base font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-gray-800 text-gray-800"
                    : "text-gray-500"
                }`}
              >
                {tab === "account"
                  ? "My Account"
                  : tab === "register"
                  ? "Register"
                  : tab === "orderHistory"
                  ? "Order History"
                  : "Contact Us"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="px-2 sm:px-0">{renderTabContent()}</div>
        </div>
      </div>
    );
};

export default Account;
