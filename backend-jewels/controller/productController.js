// controller/productController.js
const Product = require("../models/productModel");
const Subcategory = require("../models/subcategoryModel");
const Category = require("../models/categoryModel");
const { upload } = require("../config/multerConfig");
const cloudinary = require("cloudinary").v2;

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, subcategory, stock } = req.body;

    // Validate price and stock
    if (price <= 0 || stock < 0) {
      return res.status(400).send({
        success: false,
        message: "Price must be greater than 0 and stock cannot be negative.",
      });
    }

    console.log(req.body, "rb");

    // Check if the subcategory exists
    const foundSubcategory = await Subcategory.findById(subcategory).populate(
      "category"
    );
    console.log(foundSubcategory, "fsc");
    if (!foundSubcategory) {
      return res.status(400).json({ message: "Subcategory not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image." });
    }

    // Extract image URLs from Cloudinary
    const imageUrls = req.files.map((file) => file.path);

    const newProduct = new Product({
      title,
      description,
      price,
      images: imageUrls,
      category: foundSubcategory?.category?._id || null,
      categoryName: foundSubcategory?.category?.name || null,
      subcategory, // Associate subcategory with the product
      subcategoryName: foundSubcategory?.name || null,
      stock,
    });
    console.log(newProduct, "np");
    const savedProduct = await newProduct.save();
    return res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("subcategory");
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("subcategory");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID from request params
    const { title, description, price, subcategory, stock } = req.body;

    // Validate price and stock
    if (price !== undefined && price <= 0) {
      return res.status(400).send({
        success: false,
        message: "Price must be greater than 0.",
      });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).send({
        success: false,
        message: "Stock cannot be negative.",
      });
    }

    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the subcategory exists (if updated)
    let foundSubcategory;
    if (subcategory) {
      foundSubcategory = await Subcategory.findById(subcategory).populate(
        "category"
      );
      if (!foundSubcategory) {
        return res.status(400).json({ message: "Subcategory not found" });
      }
    }

    // Handle updated images
    let imageUrls = product.images;

    if (req.files && req.files.length > 0) {
      try {
        // Delete old images from Cloudinary
        for (const image of imageUrls) {
          const publicIdMatch = image.match(/\/([^/]+)\.[^/.]+$/);
          const publicId = publicIdMatch ? publicIdMatch[1] : null;
          if (publicId) {
            await cloudinary.uploader.destroy(
              `saaraa-jewels/product_images/${publicId}`
            );
          }
        }

        // Upload new images to Cloudinary and update image URLs
        imageUrls = req.files.map((file) => file.path);
      } catch (cloudError) {
        console.error("Cloudinary error:", cloudError);
        return res.status(500).json({ message: "Image processing error." });
      }
    }

    // Update product fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.images = imageUrls;

    if (subcategory) {
      product.subcategory = subcategory;
      product.subcategoryName = foundSubcategory.name;
      product.category = foundSubcategory.category?._id || product.category;
      product.categoryName =
        foundSubcategory.category?.name || product.categoryName;
    }

    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID from request params

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        const publicIdMatch = image.match(/\/([^/]+)\.[^/.]+$/);
        const publicId = publicIdMatch ? publicIdMatch[1] : null;
        if (publicId) {
          await cloudinary.uploader.destroy(
            `saaraa-jewels/product_images/${publicId}`
          );
        }
      }
    }

    // Delete the product from MongoDB
    await Product.findByIdAndDelete(id);

    // Return a success response
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { deleteProduct };

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
