// controller/subcategoryController.js

const Subcategory = require("../models/subcategoryModel");
const Category = require("../models/categoryModel"); // Category model to check if category exists

// Add a new subcategory
const addSubcategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(400)
        .send({ success: false, message: "Category not found." });
    }

    // Create new subcategory
    const subcategory = new Subcategory({
      name,
      description,
      category: categoryId,
    });

    await subcategory.save();

    return res.status(201).send({
      success: true,
      message: "Subcategory added successfully.",
      data: subcategory,
    });
  } catch (error) {
    console.error(error);
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

module.exports = {
  addSubcategory,
  viewSubcategories,
  deleteSubcategory,
};
