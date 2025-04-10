const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { isAdminLoggedIn } = require("../middleware/authmiddleware");

router.post(
  "/add-category",
  isAdminLoggedIn,
  upload.single("image"),
  createCategory
);

router.get("/getallcategories", getAllCategories); // 📦 All

// router.get("/:id", getCategoryById); // 🔍 One
// router.put("/:id", protect, isAdmin, updateCategory); // ✏️ Edit
// router.delete("/:id", protect, isAdmin, deleteCategory); // ❌ Delete

module.exports = router;
