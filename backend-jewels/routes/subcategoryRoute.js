// routes/subcategoryRoutes.js

const express = require("express");
const routes = express.Router();
const { isAdminLoggedIn } = require("../middleware/authmiddleware");
const {
  addSubcategory,
  viewSubcategories,
  deleteSubcategory,
} = require("../controller/subcategoryController");

// Protect routes with isAdminLoggedIn middleware
routes.post("/add", isAdminLoggedIn, addSubcategory);
routes.get("/view", isAdminLoggedIn, viewSubcategories);
routes.delete("/delete/:subcategoryId", isAdminLoggedIn, deleteSubcategory);

module.exports = routes;
