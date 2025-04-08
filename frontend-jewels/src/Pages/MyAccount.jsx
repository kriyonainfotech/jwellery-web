// import React, { useState } from "react";
// import "../styles/account.css";
// import Header from "../Components/Header";
// import axios from "axios";

// const Account = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

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
//         }
//       );

//       if (res.status === 200) {
//         setIsLoggedIn(true);
//         console.log("Login successful:", res.data);
//         localStorage.setItem("token", res.data.token);
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         alert(error.response.data.message);
//       } else {
//         alert("Something went wrong!");
//       }
//     }
//   };

//   return (
//     <div className="">
//       <Header isHomepage={false} />
//       <div className="container">
//         <h1 className="account-heading text-3xl text-gray-900 tracking-wider pb-2 montserrat uppercase font-medium ">
//           My Account
//         </h1>
//         <div className="account-nav">
//           <a className="montserrat text-md" href="/account/login">
//             My Account
//           </a>
//           {/* <a className="montserrat text-md" href="/pages/order-history">
//             Order History
//           </a>
//           <a className="montserrat text-md" href="/pages/whislist">
//             Wishlist
//           </a> */}
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
//               Don’t have an account with us yet? Create one{" "}
//               <a href="/account/register">here</a>.
//             </p>
//             <form onSubmit={handleLogin} className="login-form">
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="fs-12"
//                   placeholder="Enter email here ... "
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="fs-12"
//                   placeholder="Enter Password here ... "
//                   name="password"
//                   required
//                 />
//               </div>
//               <button type="submit" className="login-button">
//                 Login
//               </button>
//             </form>
//             <p className="montserrat text-md">
//               Forgot your password? Reset it{" "}
//               <a href="/account/register" className="underline">
//                 here
//               </a>
//               .
//             </p>
//           </div>
//         ) : (
//           <div className="profile-section">
//             <h2>Welcome, User!</h2>
//             <p>Email: user@example.com</p>
//             <button
//               className="logout-button"
//               onClick={() => setIsLoggedIn(false)}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account;
import React, { useEffect, useState } from "react";
import "../styles/account.css";
import Header from "../Components/Header";
import axios from "axios";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

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
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", res);

      if (res.status === 200) {
        setIsLoggedIn(true);
        const { user, token } = res.data;

        setUserData(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  }, []);

  return (
    <div className="">
      <Header isHomepage={false} />
      <div className="container">
        <h1 className="account-heading text-3xl text-gray-900 tracking-wider pb-2 montserrat uppercase font-medium ">
          My Account
        </h1>
        <div className="account-nav">
          <a className="montserrat text-md" href="/account/login">
            My Account
          </a>
          <a className="montserrat text-md" href="/account/register">
            Register
          </a>
          <a className="montserrat text-md" href="/pages/contact-us">
            Contact Us
          </a>
        </div>

        {!isLoggedIn ? (
          <div className="login-section">
            <h2 className="uppercase montserrat text-2xl tracking-wide">
              Sign In
            </h2>
            <p className="montserrat text-md">
              Don’t have an account?{" "}
              <a href="/account/register">Create one here</a>.
            </p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        ) : (
          <>
            {userData && (
              <div className="profile-section mt-3 ">
                <h2>Welcome, {userData.name}!</h2>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
                <button
                  className="text-white px-3 py-2 bg-gray-800"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserData(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
