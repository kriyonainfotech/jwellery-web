import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const apiurl = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    console.log(loginData);

    try {
      console.log(loginData, "loginData");

      const loginResponse = await axios.post(
        `${apiurl}/admin/login`,
        loginData,
        { withCredentials: true } // Optional: if you need to send cookies or credentials
      );

      console.log(loginResponse, "lr");
      if (loginResponse.data.success === true) {
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError(error?.response?.data || "An error occurred during login.");
      toast.error(error?.response?.data || "An error occurred during login."); // Optional toast notification for errors
    }
  };

  return (
    <>
      <div className="login-section">
        <h2 className="uppercase crimson text-3xl">Sign In to Admin Panel</h2>
        <div className="col-4 flex justify-center border p-4 my-4 rounded shadow">
          <form onSubmit={handleLogin} className=" w-full ">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="fs-12"
                placeholder="Enter email here ... "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="fs-12"
                placeholder="Enter Password here ... "
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
