// const Category = require("../models/categoryModel");

// // Add a new category
// const addCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     console.log(req.body, "category");
//     // Check if category already exists
//     const existingCategory = await Category.findOne({ name });
//     if (existingCategory) {
//       return res.status(400).send({
//         success: false,
//         message: "Category with this name already exists.",
//       });
//     }

//     // Create new category
//     const newCategory = new Category({
//       name,
//       description,
//     });

//     await newCategory.save();

//     return res.status(201).send({
//       success: true,
//       message: "Category added successfully.",
//       data: newCategory,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error adding category.",
//     });
//   }
// };

// // View all categories
// const viewCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();

//     if (categories.length === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "No categories found.",
//       });
//     }

//     return res.status(200).send({
//       success: true,
//       message: "Categories fetched successfully.",
//       data: categories,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error fetching categories.",
//     });
//   }
// };

// // Delete a category
// const deleteCategory = async (req, res) => {
//   try {
//     const { categoryId } = req.params;

//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return res.status(404).send({
//         success: false,
//         message: "Category not found.",
//       });
//     }

//     await category.deleteOne({ categoryId });

//     return res.status(200).send({
//       success: true,
//       message: "Category deleted successfully.",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error deleting category.",
//     });
//   }
// };

// module.exports = { addCategory, viewCategories, deleteCategory };
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    console.log(`📦 Category ID: ${categoryId}`);
    console.log(`📄 Page: ${page}, 🔢 Limit: ${limit}`);

    const products = await Product.find({ categoryId })
      .skip(skip)
      .limit(limit)
      .populate("categoryId subCategoryId");

    const total = await Product.countDocuments({ categoryId });

    res.status(200).json({
      success: true,
      message: "✅ Products fetched by category",
      currentPage: page,
      totalProducts: total,
      products,
    });
  } catch (error) {
    console.log("❌ Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
