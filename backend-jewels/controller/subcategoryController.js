// controller/subcategoryController.js

const Subcategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel"); // Category model to check if category exists
const Product = require("../models/productModel"); // Product model to fetch products by subcategory
const uploadImageToCloudinary = require("../middleware/uploadTocloud");

// Add a new subcategory
const addSubcategory = async (req, res) => {
  try {
    console.log("📥 [POST] Creating new subcategory...");

    const { name, categoryId } = req.body;
    console.log("Received data:", req.body, req.file);

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      console.log("❌ Category not found");
      return res
        .status(400)
        .send({ success: false, message: "Category not found." });
    }

    const imageUrl = await uploadImageToCloudinary(req.file, "subcategories");

    // Create new subcategory
    const subcategory = new Subcategory({
      name,
      categoryId: categoryId,
      image: imageUrl,
    });

    await subcategory.save();

    console.log("✅ Subcategory created successfully", subcategory);
    return res.status(201).send({
      success: true,
      message: "Subcategory added successfully.",
      data: subcategory,
    });
  } catch (error) {
    console.log("Error in add subcategory", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

// View all subcategories
const viewSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category", "name"); // Populate category name
    if (!subcategories || subcategories.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No subcategories found." });
    }
    return res.status(200).send({
      success: true,
      message: "Subcategories fetched successfully.",
      data: subcategories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Delete a subcategory
const deleteSubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    // Find the subcategory by ID
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res
        .status(404)
        .send({ success: false, message: "Subcategory not found." });
    }

    // Delete the subcategory
    await Subcategory.findByIdAndDelete(subcategoryId);

    return res.status(200).send({
      success: true,
      message: "Subcategory deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Get products by subcategory
const getProductsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    // Find the subcategory by ID
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res
        .status(404)
        .send({ success: false, message: "Subcategory not found." });
    }

    // Fetch all products in the subcategory
    const products = await Product.find({ subCategoryId: subcategoryId });

    return res.status(200).send({
      success: true,
      message: "Products fetched by subcategory.",
      products: products,
      subcategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  addSubcategory,
  viewSubcategories,
  deleteSubcategory,
  getProductsBySubcategory,
};
