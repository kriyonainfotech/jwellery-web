const express = require("express");
const routes = express.Router();
const { isAdminLoggedIn } = require("../middleware/authmiddleware");
const multer = require("multer");
const {
  addSubcategory,
  viewSubcategories,
  deleteSubcategory,
} = require("../controller/subcategoryController");
const storage = multer.memoryStorage(); // or diskStorage if saving locally
const upload = multer({ storage: storage });

// Protect routes with isAdminLoggedIn middleware
routes.post(
  "/add-subcategory",
  isAdminLoggedIn,
  upload.single("image"),
  addSubcategory
);
routes.get("/view", isAdminLoggedIn, viewSubcategories);
routes.delete("/delete/:subcategoryId", isAdminLoggedIn, deleteSubcategory);

module.exports = routes;
