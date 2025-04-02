const express = require("express");
const {
  registeradminHandler,
  loginadminHandler,
  verifySecretKey,
  getAllUsers,
} = require("../controller/adminController");
const { authenticateJWT } = require("../middleware/authmiddleware");
const routes = express.Router();

routes.post("/register", registeradminHandler);
routes.post("/login", loginadminHandler);
routes.post("/verify-secret-key", authenticateJWT, verifySecretKey);
routes.get("/allusers", getAllUsers);
// routes.post("/check-auth",)

module.exports = routes;
