import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

// const checkAuth = async () => {
//   try {
//     console.log("super admin avo che");
//     const response = await axios.post(`${apiurl}/admin/check-auth`, {
//       withCredentials: true,
//     });
//     console.log(response, "checkauth");
//     return response.data.success;
//   } catch (error) {
//     console.error("Authentication check failed:", error);
//     return false;
//   }
// };

const checkAuth = async () => {
  try {
    console.log("🔐 Checking admin auth...");
    const response = await axios.post(
      `${apiurl}/admin/check-auth`,
      {}, 
      { withCredentials: true } // ✅ proper config
    );
    console.log("✅ checkAuth response:", response);
    return response.data.success;
  } catch (error) {
    console.error("❌ Authentication check failed:", error);
    return false;
  }
};

const   AdminProtected = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth);
      setLoading(false);
    };

    verifyAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  // If seller is authenticated, render the protected routes
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtected;
