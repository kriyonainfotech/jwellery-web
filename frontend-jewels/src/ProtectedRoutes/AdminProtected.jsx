import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log("user", user);

  if (!user || user.isAdmin !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtected;
