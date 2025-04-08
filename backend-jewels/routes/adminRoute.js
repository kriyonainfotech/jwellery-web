const express = require("express");
const {
  registeradminHandler,
  loginadminHandler,
  verifySecretKey,
  getAllUsers,
  verifyAdmin,
} = require("../controller/adminController");
const { authenticateJWT, isAdmin } = require("../middleware/authmiddleware");
const routes = express.Router();

// routes.post("/register", registeradminHandler);
routes.post("/login", isAdmin, loginadminHandler);
routes.post("/verify-secret-key", authenticateJWT, verifySecretKey);
// routes.get("/allusers", getAllUsers);
routes.post("/check-auth", isAdmin, verifyAdmin);

module.exports = routes;
