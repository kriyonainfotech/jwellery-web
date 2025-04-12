// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { isAdminLoggedIn } = require("../middleware/authmiddleware");

// Create a new product
router.post(
  "/add-product",
  //   isAdminLoggedIn,
  upload.any(),
  createProduct
);
// router.put("/update/:id", upload.array("images", 5), updateProduct);
// router.delete("/delete/:id", deleteProduct);
router.get("/all", getAllProducts);

module.exports = router;
