const Category = require("../models/categoryModel");

// Add a new category
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(req.body, "category");
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        success: false,
        message: "Category with this name already exists.",
      });
    }

    // Create new category
    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();

    return res.status(201).send({
      success: true,
      message: "Category added successfully.",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error adding category.",
    });
  }
};

// View all categories
const viewCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No categories found.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Categories fetched successfully.",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching categories.",
    });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found.",
      });
    }

    await category.deleteOne({ categoryId });

    return res.status(200).send({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error deleting category.",
    });
  }
};

module.exports = { addCategory, viewCategories, deleteCategory };
