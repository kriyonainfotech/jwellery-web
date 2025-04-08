const express = require("express");
const routes = express.Router();
const {
  registerUser,
  loginUser,
  verifyOTP,
  logout,
  getUserById,
} = require("../controller/userController");
const { protect } = require("../middleware/authmiddleware");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/me/:id", protect, getUserById);


module.exports = routes;
