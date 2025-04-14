const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const mongoose = require("mongoose");

const multer = require("multer");
const uploadImageToCloudinary = require("../middleware/uploadTocloud");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new product

exports.getProductById = async (req, res) => {
  try {
    // console.log(req.body, req.query, req.params);
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "❌ Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error("🔥 Error fetching product by ID:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
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

// exports.createProduct = async (req, res) => {
//   try {
//     console.log("🚀 [API] Create Product Initiated...");

//     const {
//       title,
//       categoryId,
//       subCategoryId,
//       description,
//       tags = [],
//     } = req.body;

//     console.log("📥 Incoming Data:");
//     console.log("📝 Title:", title);
//     console.log("📦 Category ID:", categoryId);
//     console.log("🔖 Subcategory ID:", subCategoryId);
//     console.log("🏷️ Tags:", tags);

//     let variants = JSON.parse(req.body.variants || "[]");

//     // Step 1: Create base product
//     const newProduct = new Product({
//       title,
//       categoryId,
//       subCategoryId,
//       description,
//       tags,
//       variants: [],
//       thumbnail: "",
//     });

//     await newProduct.save();
//     console.log("🆕 Product placeholder created with ID:", newProduct._id);

//     // Step 2: Handle Thumbnail Upload
//     let thumbnailUrl = "";
//     const thumbnailFile = req.files?.find((f) => f.fieldname === "thumbnail");
//     if (thumbnailFile) {
//       console.log("📤 Uploading Thumbnail...");
//       thumbnailUrl = await uploadImageToCloudinary(
//         thumbnailFile,
//         // 🚨 Remove space after "jewels/"
//         `jewels/products/${newProduct._id}` // ✅ Correct path
//       );
//       console.log("🖼️ Thumbnail Uploaded:", thumbnailUrl);
//     }

//     // Step 3: Process Each Variant
//     const updatedVariants = [];

//     for (let i = 0; i < variants.length; i++) {
//       const variant = variants[i];

//       const files =
//         req.files?.filter((f) => f.fieldname === `variantImages_${i}`) || [];

//       // Validate at least one image per variant
//       if (files.length === 0) {
//         console.error(`❌ Variant ${i + 1} has no images`);
//         throw new Error(`Variant ${i + 1} must have at least one image`);
//       }

//       // Validate variant fields
//       if (!variant.metalColor || !variant.carat) {
//         console.error(`❌ Variant ${i + 1} missing required fields`);
//         throw new Error(`Variant ${i + 1}: metalColor and carat are required`);
//       }

//       // 1. Sanitize metalColor
//       const sanitizedMetalColor =
//         variant.metalColor?.replace(/\s+/g, "-").toLowerCase() || "default";

//       console.log(`🖼 Found ${files.length} images for variant ${i + 1}`);

//       const imageUrls = [];

//       try {
//         // 3. Process images with error handling
//         for (const [index, file] of files.entries()) {
//           const folderPath =
//             `jewels/products/${newProduct._id}/variant-${sanitizedMetalColor}`
//               .replace(/\s+/g, "") // Remove all spaces
//               .replace(/\/+/g, "/"); // Fix duplicate slashes

//           console.log(
//             `📤 Uploading image ${index + 1}/${files.length} to:`,
//             folderPath
//           );

//           const uploadedUrl = await uploadImageToCloudinary(file, folderPath);
//           imageUrls.push(uploadedUrl);
//         }
//       } catch (uploadError) {
//         console.error(
//           `❌ Failed to upload images for variant ${i + 1}:`,
//           uploadError.message
//         );
//         // Cleanup uploaded images if needed
//         throw new Error(
//           `Image upload failed for variant ${i + 1}: ${uploadError.message}`
//         );
//       }

//       updatedVariants.push({
//         ...variant,
//         images: imageUrls,
//       });
//     }

//     // After processing all variants
//     try {
//       newProduct.variants = updatedVariants;
//       if (thumbnailUrl) newProduct.thumbnail = thumbnailUrl;

//       // 4. Save with validation
//       await newProduct.validate(); // Trigger mongoose validation
//       await newProduct.save();
//       console.log("💾 Product saved successfully");
//     } catch (saveError) {
//       console.error("❌ Product save failed:", saveError.message);
//       // Add cleanup logic here if needed
//       throw new Error(`Product save failed: ${saveError.message}`);
//     }

//     // Step 4: Final Update of Product
//     newProduct.variants = updatedVariants;
//     if (thumbnailUrl) newProduct.thumbnail = thumbnailUrl;

//     await newProduct.save();
//     console.log("✅ Product Created Successfully with ID:", newProduct._id);

//     res.status(201).send({
//       success: true,
//       message: "🎉 Product created successfully!",
//       data: newProduct,
//     });
//   } catch (error) {
//     console.error("🔥 Critical Error:", {
//       message: error.message,
//       stack: error.stack,
//     });

//     res.status(500).send({
//       success: false,
//       message: `Product creation failed: ${error.message}`,
//       errorCode: "IMAGE_UPLOAD_FAILURE",
//     });
//   }
// };
