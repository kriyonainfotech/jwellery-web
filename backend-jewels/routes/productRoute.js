// // routes/productRoutes.js

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const {
//   createProduct,
//   getAllProducts,
//   updateProduct,
//   deleteProduct,
// } = require("../controller/productController");
// const { isAdminLoggedIn } = require("../middleware/authmiddleware");

// // Create a new product
// // Change from generic any() to specific fields
// router.post(
//   "/add-product",
//   upload.fields([
//     { name: 'thumbnail', maxCount: 1 },
//     { name: 'variantImages_0', maxCount: 10 },
//     { name: 'variantImages_1', maxCount: 10 }
//   ]),
//   createProduct
// );
// // router.put("/update/:id", upload.array("images", 5), updateProduct);
// // router.delete("/delete/:id", deleteProduct);
// router.get("/all", getAllProducts);

// module.exports = router;
const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const mongoose = require("mongoose");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer();

const uploadStream = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "jewelry-products",
        resource_type: "auto",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Add Product Endpoint
router.post("/add-product", upload.any(), async (req, res) => {
  try {
    // Validate request format
    if (!req.body.product) {
      return res.status(400).json({ error: "Product data is required" });
    }
    console.log("Received product data:", req.body.product);
    console.log("Received files:", req.files);

    // Parse product data
    const productData = JSON.parse(req.body.product);

    // Validate required fields
    if (
      !productData.title?.trim() ||
      !mongoose.Types.ObjectId.isValid(productData.categoryId) ||
      !mongoose.Types.ObjectId.isValid(productData.subCategoryId)
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Process thumbnail
    const thumbnailFile = req.files.find((f) => f.fieldname === "thumbnail");
    if (!thumbnailFile) {
      return res.status(400).json({ error: "Thumbnail is required" });
    }
    const thumbnailRes = await uploadStream(thumbnailFile);

    // Process variant images
    const variantMap = new Map();
    req.files.forEach((file) => {
      const match = file.fieldname.match(/variants\[(\d+)\]\[images\]/);
      if (match) {
        const index = parseInt(match[1]);
        if (!variantMap.has(index)) variantMap.set(index, []);
        variantMap.get(index).push(file);
      }
    });

    // Upload all variant images in parallel
    const processedVariants = await Promise.all(
      productData.variants.map(async (variant, index) => {
        // Validate variant required fields
        // Replace line 115 in productRoute.js
        if (
          !variant.metalColor ||
          !variant.carat ||
          !variant.sku ||
          !variant.totalPrice
        ) {
          const missing = [];
          if (!variant.metalColor) missing.push("metalColor");
          if (!variant.carat) missing.push("carat");
          if (!variant.sku) missing.push("sku");
          if (!variant.totalPrice) missing.push("totalPrice");
          throw new Error(
            `Variant ${index + 1} missing: ${missing.join(", ")}`
          );
        }

        const files = variantMap.get(index) || [];
        const uploadPromises = files.map((file) => uploadStream(file));
        const images = await Promise.all(uploadPromises);

        return {
          ...variant,
          images: images.map((img) => img.secure_url),
          stock: Number(variant.stock) || 0,
          totalPrice: Number(variant.totalPrice),
          weightInGrams: Number(variant.weightInGrams) || undefined,
        };
      })
    );

    // Create final product object
    const newProduct = new Product({
      ...productData,
      thumbnail: thumbnailRes.secure_url,
      tags: productData.tags?.filter((t) => t) || [],
      variants: processedVariants,
      status: { status: productData.status === "active" },
    });

    // Validate with Mongoose schema
    const validationError = newProduct.validateSync();
    if (validationError) {
      const errors = Object.values(validationError.errors).map(
        (e) => e.message
      );
      return res.status(400).json({ error: errors.join(", ") });
    }

    // Save to database
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Product creation error:", error);
    const statusCode =
      error instanceof mongoose.Error.ValidationError ? 400 : 500;
    res.status(statusCode).json({
      error: error.message || "Failed to create product",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    console.log("📦 [API] Fetching all products...");

    const products = await Product.find()
      .populate("categoryId", "name") // populate category name only
      .populate("subCategoryId", "name") // populate subcategory name only
      .sort({ createdAt: -1 });

    if (!products.length) {
      console.log("❌ No products found.");
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }

    console.log(`✅ Found ${products.length} products`);
    products.forEach((prod, index) => {
      console.log(
        `🔹 ${index + 1}. ${prod.title} | 💎 Variants: ${
          prod.variants.length
        } | 🏷️ Category: ${prod.categoryId?.name}`
      );
    });

    res.status(200).json({
      success: true,
      message: "🎉 Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log("🔥 Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "❌ Server Error: Could not fetch products",
    });
  }
});

module.exports = router;
