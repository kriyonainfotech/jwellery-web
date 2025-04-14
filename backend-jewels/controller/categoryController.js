const Category = require("../models/categoryModel");
const uploadImageToCloudinary = require("../middleware/uploadTocloud");
const Subcategory = require("../models/subCategoryModel"); // 👈 import this
const Product = require("../models/productModel");

exports.getAllCategories = async (req, res) => {
  try {
    console.log("📦 Fetching all categories...");

    const categories = await Category.find().sort({ createdAt: -1 });

    if (!categories || categories.length === 0) {
      console.log("❌ No categories found");
      return res.status(404).json({ message: "No categories found" });
    }

    // Fetch subcategories for each category
    const categoriesWithSub = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await Subcategory.find({
          categoryId: category._id,
        });
        return {
          ...category.toObject(),
          subcategories: subcategories || [], // add subcategories key
        };
      })
    );

    console.log(
      "📁 Fetched categories with subcategories:",
      categoriesWithSub.length
    );
    res.status(200).json({ success: true, categories: categoriesWithSub });
  } catch (err) {
    console.log("❌ Error fetching categories:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Get single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    console.log("📁 Fetched category:", category.name);
    res.status(200).json(category);
  } catch (err) {
    console.error("❌ Error fetching category:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    console.log("📥 [POST] Creating new category...");

    const { categoryName } = req.body;
    console.log("Received data:", req.body, req.file);

    if (!categoryName || !req.file) {
      console.error("❌ categoryName or image not provided");
      return res
        .status(400)
        .json({ message: "categoryName and image are required" });
    }

    const existing = await Category.findOne({ categoryName });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const imageUrl = await uploadImageToCloudinary(req.file, "categories");

    const category = await Category.create({
      name: categoryName,
      image: imageUrl,
    });

    console.log("✅ Category created:", category.categoryName);
    res.status(200).json({ message: "Category created", category });
  } catch (err) {
    console.log("🔥 Error creating category:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    console.log("✏️ Updating category:", category.name);

    if (name) category.name = name;

    // If new image uploaded
    if (req.file) {
      const imageUrl = await uploadImageToCloudinary(req.file, "categories");
      category.image = imageUrl;
    }

    await category.save();

    console.log("✅ Category updated:", category.name);
    res.status(200).json({ message: "Category updated", category });
  } catch (err) {
    console.error("❌ Error updating category:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.body.id;

    // ✅ Check if any subcategory exists under this category
    const subcategories = await Subcategory.find({ categoryId });

    if (subcategories.length > 0) {
      console.log("⚠️ Cannot delete category. Subcategories still exist.");
      return res.status(400).json({
        message:
          "Cannot delete category. Please delete all subcategories first.",
      });
    }

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      console.log("❌ Category not found");
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("🗑️ Successfully deleted category:", category.name);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("🔥 Error deleting category:", err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    console.log("🛍️ [API] Get Products by Category");

    const { categoryId } = req.params;

    console.log(`📦 Category ID: ${categoryId}`);

    // Fetch all products in the category without pagination
    const products = await Product.find({ categoryId }).populate(
      "categoryId subCategoryId"
    );

    console.log(products, "products");

    res.status(200).json({
      success: true,
      message: "✅ Products fetched by category",
      products, // Return all products without pagination
    });
  } catch (error) {
    console.log("❌ Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
