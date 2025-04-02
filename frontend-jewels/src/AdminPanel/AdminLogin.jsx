import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const apiurl = import.meta.env.VITE_API_URL;

const SecretKeyModal = ({ onBack, onKeyVerified }) => {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleVerifyKey = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiurl}/admin/verify-secret-key`,
        { secretKey },
        { withCredentials: true }
      );

      if (response.data.success === true) {
        toast.success("Secret key verified successfully!");
        onKeyVerified();
      } else {
        setError("Invalid secret key. Please try again.");
      }
    } catch (error) {
      console.log("Error verifying secret key:", error);
      toast.error('Error verifying secret key')
      setError("An error occurred while verifying the secret key.");
    }
  };

  return (
    <div className="login-section ">
      <div className="p-8 rounded-md ">
        <h2 className="uppercase crimson text-3xl mb-5" >Verify Your Secret Key</h2>
        <div className="border p-4 shadow ">
          <div className="form-group mb-4">
            <label className="fs-12 ">Secret Key</label>
            <input
              type="password"
              placeholder="Enter Secret Key..."
              required
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="fs-12"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="w-25 login-button"
            >
              Back
            </button>
            <button
              onClick={handleVerifyKey}
              className="w-25 login-button"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    console.log(loginData)

    try {
      // const authResponse = await axios.get(
      //   `${apiurl}/superadmin/check-admin`,
      //   { withCredentials: true }
      // );
      // // console.log(authResponse)
      // if (authResponse.data.success) {
      //   console.log("User is superadmin");
      //   setIsAuthenticated(true);
      //   setIsModalOpen(true); // Show modal for secret key
      // } else {
      //   console.log("Not a superadmin");
      //   setIsAuthenticated(false);
      // }


      // Send POST request to the admin login API
      const loginResponse = await axios.post(
        `${apiurl}/admin/login`,
        loginData,
        { withCredentials: true } // Optional: if you need to send cookies or credentials
      );

      console.log(loginResponse, 'lr')
      if (loginResponse.data.success === true) {
        toast.success("Login successful! Please enter the secret key.");
        setIsModalOpen(true);
        // Perform actions on successful login (e.g., redirect or open a modal)
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError(error?.response?.data || "An error occurred during login.");
      toast.error(error?.response?.data || "An error occurred during login."); // Optional toast notification for errors
    }
  };

  const handleKeyVerified = () => {
    navigate("/admin");
  };

  return (
    <>
      {!isModalOpen ? (
        <div className="login-section">
          <h2 className="uppercase crimson text-3xl" >Sign In to Admin Panel</h2>
          <div className="col-4 flex justify-center border p-4 my-4 rounded shadow">

            <form onSubmit={handleLogin} className=" w-full ">
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="fs-12" placeholder="Enter email here ... " required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="fs-12" placeholder="Enter Password here ... " name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>

        </div>
      ) : (
        <SecretKeyModal
          onBack={() => setIsModalOpen(false)}
          onKeyVerified={handleKeyVerified}
        />
      )}
    </>
  );
};

export default AdminLogin;
