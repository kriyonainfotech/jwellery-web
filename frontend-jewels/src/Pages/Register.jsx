import React, { useState } from "react";
import "../styles/register.css";
import Header from "../Components/Header";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // Registration logic (save user details to a server or local storage)
    const email = e.target.email.value;
    const password = e.target.password.value;

    // For simplicity, let's assume registration is successful
    setIsRegistered(true);
  };

  return (
    <div className="">
      <Header isHomepage={false} />
      <div className="container">
        <h1 className="account-heading text-3xl text-gray-900 tracking-wider pb-2 montserrat uppercase font-medium">Register</h1>
        <div className="account-nav">
          <a className="montserrat text-md" href="/account/login">My Account</a>
          <a className="montserrat text-md" href="/pages/order-history">Order History</a>
          <a className="montserrat text-md" href="/pages/whislist">Wishlist</a>
          <a className="montserrat text-md" href="/account/register">Register</a>
          <a className="montserrat text-md" href="/pages/contact-us">Contact Us</a>
        </div>

        {!isRegistered ? (
          <div className="register-section mt-5">
            <h2 className="uppercase montserrat text-2xl tracking-wide text-center">Create New Account</h2>
            <p className="montserrat text-gray-600 text-sm text-center">Register to create your account.</p>
            <form onSubmit={handleRegister} className="register-form">
              <div className="form-group">
                <label className="montserrat ">Name</label>
                <input type="text" name="name" className="fs-12 rounded-0" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label className="montserrat ">Email</label>
                <input type="email" name="email" className="fs-12 rounded-0" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label className="montserrat ">Password</label>
                <input type="password" className="fs-12 rounded-0" placeholder="Enter password" name="password" required />
              </div>
              <button type="submit" className="register-button">Register</button>
            </form>
            <p className="montserrat text-md text-center mt-4">Already have an account? <a href="/account/login" className="underline">Login</a></p>
          </div>
        ) : (
          <div className="success-section">
            <h2>Registration Successful!</h2>
            <p>You can now <a href="/account/login">login</a> with your credentials.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
