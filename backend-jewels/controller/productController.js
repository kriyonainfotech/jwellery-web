const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const mongoose = require("mongoose");

const multer = require("multer");
const uploadImageToCloudinary = require("../middleware/uploadTocloud");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new product

exports.createProduct = async (req, res) => {
  try {
    console.log("🚀 [API] Create Product Initiated...");

    const {
      title,
      categoryId,
      subCategoryId,
      description,
      tags = [],
    } = req.body;

    console.log("📥 Incoming Data:");
    console.log("📝 Title:", title);
    console.log("📦 Category ID:", categoryId);
    console.log("🔖 Subcategory ID:", subCategoryId);
    console.log("🏷️ Tags:", tags);

    let variants = JSON.parse(req.body.variants || "[]");

    // Step 1: Create base product
    const newProduct = new Product({
      title,
      categoryId,
      subCategoryId,
      description,
      tags,
      variants: [],
      thumbnail: "",
    });

    await newProduct.save();
    console.log("🆕 Product placeholder created with ID:", newProduct._id);

    // Step 2: Handle Thumbnail Upload
    let thumbnailUrl = "";
    if (req.files?.thumbnail?.[0]) {
      console.log("📤 Uploading Thumbnail...");
      thumbnailUrl = await uploadImageToCloudinary(
        req.files.thumbnail[0],
        `jewels/products/${newProduct._id}`
      );
      console.log("🖼️ Thumbnail Uploaded:", thumbnailUrl);
    }

    // Step 3: Process Each Variant
    const updatedVariants = [];

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      const files = req.files?.[`images_${i}`] || [];

      console.log(`🧩 Processing Variant ${i + 1}...`);
      const imageUrls = [];

      for (const file of files) {
        const uploadedUrl = await uploadImageToCloudinary(
          file,
          `jewels/products/${newProduct._id}/variant-${i}`
        );
        imageUrls.push(uploadedUrl);
      }

      console.log(
        `📸 Uploaded ${imageUrls.length} images for Variant ${i + 1}`
      );

      updatedVariants.push({
        ...variant,
        images: imageUrls,
      });
    }

    // Step 4: Final Update of Product
    newProduct.variants = updatedVariants;
    if (thumbnailUrl) newProduct.thumbnail = thumbnailUrl;

    await newProduct.save();
    console.log("✅ Product Created Successfully with ID:", newProduct._id);

    res.status(201).send({
      success: true,
      message: "🎉 Product created successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.log("🔥 Error in Create Product API:", error.message);
    res.status(500).send({
      success: false,
      message: "❌ Error creating product.",
    });
  }
};

exports.getAllProducts = async (req, res) => {
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
};
