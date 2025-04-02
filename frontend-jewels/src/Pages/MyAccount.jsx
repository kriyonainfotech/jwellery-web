import React, { useState } from "react";
import "../styles/account.css";
import Header from "../Components/Header";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  const handleLogin = (e) => {
    e.preventDefault();
    // Static user login logic
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "user@example.com" && password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="">
      <Header isHomepage={false} />
      <div className="container">
        <h1 className="account-heading text-3xl text-gray-900 tracking-wider pb-2 montserrat uppercase font-medium ">My Account</h1>
        <div className="account-nav">
          <a className='montserrat text-md' href="/account/login">My Account</a>
          <a className='montserrat text-md' href="/pages/order-history">Order History</a>
          <a className='montserrat text-md' href="/pages/whislist">Wishlist</a>
          <a className='montserrat text-md' href="/account/register">Register</a>
          <a className='montserrat text-md' href="/pages/contact-us">Contact Us</a>
        </div>

        {!isLoggedIn ? (
          <div className="login-section">
            <h2 className="uppercase montserrat text-2xl tracking-wide" >Sign In</h2>
            <p className="montserrat text-md">Don’t have an account with us yet? Create one <a href="/account/register">here</a>.</p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="fs-12" placeholder="Enter email here ... " required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="fs-12" placeholder="Enter Password here ... " name="password" required />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
            <p className="montserrat text-md">Forgot your password? Reset it <a href="/account/register" className="underline" >here</a>.</p>
          </div>
        ) : (
          <div className="profile-section">
            <h2>Welcome, User!</h2>
            <p>Email: user@example.com</p>
            <button className="logout-button" onClick={() => setIsLoggedIn(false)}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
