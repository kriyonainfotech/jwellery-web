const express = require("express");
const routes = express.Router();
const {
  addCategory,
  viewCategories,
  deleteCategory,
} = require("../controller/categoryController");
const { isAdminLoggedIn } = require("../middleware/authmiddleware");

// Route to add a new category
routes.post("/add", isAdminLoggedIn, addCategory);

// Route to view all categories
routes.get("/view", isAdminLoggedIn, viewCategories);

// Route to delete a category by ID
routes.delete("/delete/:categoryId", isAdminLoggedIn, deleteCategory);

module.exports = routes;
