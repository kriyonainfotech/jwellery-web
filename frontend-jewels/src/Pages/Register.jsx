// import React, { useState } from "react";
// import "../styles/register.css";
// import Header from "../Components/Header";

// const Register = () => {
//   const [isRegistered, setIsRegistered] = useState(false);

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // Registration logic (save user details to a server or local storage)
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     // For simplicity, let's assume registration is successful
//     setIsRegistered(true);
//   };

//   return (
//     <div className="">
//       <Header isHomepage={false} />
//       <div className="container">
//         <h1 className="account-heading text-3xl text-gray-900 tracking-wider pb-2 montserrat uppercase font-medium">Register</h1>
//         <div className="account-nav">
//           <a className="montserrat text-md" href="/account/login">My Account</a>
//           <a className="montserrat text-md" href="/pages/order-history">Order History</a>
//           <a className="montserrat text-md" href="/pages/whislist">Wishlist</a>
//           <a className="montserrat text-md" href="/account/register">Register</a>
//           <a className="montserrat text-md" href="/pages/contact-us">Contact Us</a>
//         </div>

//         {!isRegistered ? (
//           <div className="register-section mt-5">
//             <h2 className="uppercase montserrat text-2xl tracking-wide text-center">Create New Account</h2>
//             <p className="montserrat text-gray-600 text-sm text-center">Register to create your account.</p>
//             <form onSubmit={handleRegister} className="register-form">
//               <div className="form-group">
//                 <label className="montserrat ">Name</label>
//                 <input type="text" name="name" className="fs-12 rounded-0" placeholder="Enter your name" required />
//               </div>
//               <div className="form-group">
//                 <label className="montserrat ">Email</label>
//                 <input type="email" name="email" className="fs-12 rounded-0" placeholder="Enter your email" required />
//               </div>
//               <div className="form-group">
//                 <label className="montserrat ">Password</label>
//                 <input type="password" className="fs-12 rounded-0" placeholder="Enter password" name="password" required />
//               </div>
//               <button type="submit" className="register-button">Register</button>
//             </form>
//             <p className="montserrat text-md text-center mt-4">Already have an account? <a href="/account/login" className="underline">Login</a></p>
//           </div>
//         ) : (
//           <div className="success-section">
//             <h2>Registration Successful!</h2>
//             <p>You can now <a href="/account/login">login</a> with your credentials.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/register.css";
import Header from "../Components/Header";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔍 Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log("Token:", token);
    console.log("User:", user);
    if (token && user) {
      setIsLoggedIn(true);
      console.log("User is already logged in.", isLoggedIn);
    }
  }, [isLoggedIn]);

  // 🧾 Register API call
  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          name,
          phone,
          email,
          password,
        }
      );

      if (res.status === 201) {
        setIsRegistered(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div>
      <Header isHomepage={false} />
      <div className="container">
        <h1 className="account-heading text-3xl text-gray-900 tracking-wider pb-2 montserrat uppercase font-medium">
          Register
        </h1>
        <div className="account-nav">
          <a className="montserrat text-md" href="/account/login">
            My Account
          </a>
          {/* <a className="montserrat text-md" href="/pages/order-history">
            Order History
          </a>
          <a className="montserrat text-md" href="/pages/whislist">
            Wishlist
          </a> */}
          <a className="montserrat text-md" href="/account/register">
            Register
          </a>
          <a className="montserrat text-md" href="/pages/contact-us">
            Contact Us
          </a>
        </div>

        {/* 🚫 Already logged in message */}
        {isLoggedIn ? (
          <div className="already-logged-in mt-10 text-center">
            <h2 className="text-xl text-orange-500 montserrat">
              You are already logged in!
            </h2>
          </div>
        ) : isRegistered ? (
          <div className="success-section mt-10 text-center">
            <h2 className="text-xl text-green-600 montserrat">
              🎉 Registration Successful!
            </h2>
            <p>
              You can now{" "}
              <a href="/account/login" className="underline text-blue-600">
                login
              </a>{" "}
              with your credentials.
            </p>
          </div>
        ) : (
          <div className="register-section mt-5">
            <h2 className="uppercase montserrat text-2xl tracking-wide text-center">
              Create New Account
            </h2>
            <p className="montserrat text-gray-600 text-sm text-center">
              Register to create your account.
            </p>
            <form onSubmit={handleRegister} className="register-form">
              <div className="form-group">
                <label className="montserrat ">Name</label>
                <input
                  type="text"
                  name="name"
                  className="fs-12 rounded-0"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="montserrat ">Phone</label>
                <input
                  type="phone"
                  name="phone"
                  className="fs-12 rounded-0"
                  placeholder="Enter your phone"
                  required
                />
              </div>
              <div className="form-group">
                <label className="montserrat ">Email</label>
                <input
                  type="email"
                  name="email"
                  className="fs-12 rounded-0"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="montserrat ">Password</label>
                <input
                  type="password"
                  className="fs-12 rounded-0"
                  placeholder="Enter password"
                  name="password"
                  required
                />
              </div>
              <button type="submit" className="register-button">
                Register
              </button>
            </form>
            <p className="montserrat text-md text-center mt-4">
              Already have an account?{" "}
              <a href="/account/login" className="underline">
                Login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
