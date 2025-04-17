const express = require("express");
const routes = express.Router();
const {
  registerUser,
  loginUser,
  verifyOTP,
  logout,
  getUserById,
  getCounts,
  getAllUsers,
} = require("../controller/userController");
const { protect, isAdminLoggedIn } = require("../middleware/authmiddleware");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/me/:id", protect, getUserById);
routes.get("/getcounts", isAdminLoggedIn, getCounts);
routes.get("/allusers", isAdminLoggedIn, getAllUsers);


module.exports = routes;
