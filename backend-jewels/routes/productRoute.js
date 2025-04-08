// // routes/productRoutes.js

// const express = require("express");
// const router = express.Router();
// const { upload } = require("../config/multerConfig");

// const {
//   createProduct,
//   getAllProducts,
//   updateProduct,
//   deleteProduct,
// } = require("../controller/productController");

// // Create a new product
// router.post("/add", upload.array("images", 5), createProduct);
// router.put("/update/:id", upload.array("images", 5), updateProduct);
// router.delete("/delete/:id", deleteProduct);

// // View all products
// router.get("/", getAllProducts);

// module.exports = router;
