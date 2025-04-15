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

  const location = useLocation();
  useEffect(() => {
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
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
          <p>Joined on: {new Date(userData.createdAt).toLocaleDateString()}</p>

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
        <div className="login-section">
          <h2 className="text-xl font-bold mb-2">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
          <p className="mt-3 text-sm">
            Don’t have an account?{" "}
            <button
              className="text-blue-600"
              onClick={() => setActiveTab("register")}
            >
              Register here
            </button>
          </p>
        </div>
      );
    } else if (activeTab === "register") {
      return <p>⚙️ Registration form coming soon or link to Register page.</p>;
    } else if (activeTab === "contact") {
      return <p>📞 Contact Us section. You can include a form or info here.</p>;
    } else if (activeTab === "orderHistory") {
      return <OrderHistory />;
    }
  };

  const filterList = ["account", "register", "orderHistory", "contact"];

  return (
    <div>
      <div className="py-52 container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold uppercase text-center montserrat mb-4 text-gray-800">
          My Account
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b mb-6">
          {filterList.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-medium capitalize ${
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
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Account;
