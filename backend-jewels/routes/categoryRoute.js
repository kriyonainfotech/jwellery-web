// const express = require("express");
// const routes = express.Router();
// const {
//   addCategory,
//   viewCategories,
//   deleteCategory,
// } = require("../controller/categoryController");
// const { isAdminLoggedIn } = require("../middleware/authmiddleware");

// // Route to add a new category
// routes.post("/add", isAdminLoggedIn, addCategory);

// // Route to view all categories
// routes.get("/view", isAdminLoggedIn, viewCategories);

// // Route to delete a category by ID
// routes.delete("/delete/:categoryId", isAdminLoggedIn, deleteCategory);

// module.exports = routes;
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

const { protect, isAdmin } = require("../middleware/authmiddleware");

router.post(
  "/add-category",
  // protect,
  // isAdmin,
  upload.single("image"),
  createCategory
);

// router.get("/getallcategories", getAllCategories); // 📦 All
// router.get("/:id", getCategoryById); // 🔍 One
// router.put("/:id", protect, isAdmin, updateCategory); // ✏️ Edit
// router.delete("/:id", protect, isAdmin, deleteCategory); // ❌ Delete

module.exports = router;
