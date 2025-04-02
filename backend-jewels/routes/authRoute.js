const express = require("express");
const routes = express.Router();
const {
  registerUser,
  loginUser,
  verifyOTP,
  logout,
} = require("../controller/userController");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/verify-otp", verifyOTP);
routes.post("/logout", logout);

module.exports = routes;
