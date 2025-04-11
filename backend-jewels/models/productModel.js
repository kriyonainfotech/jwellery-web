const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  metalColor: {
    type: String,
    enum: ["Yellow Gold", "Rose Gold", "White Gold", "Silver"],
    required: true,
  },
  carat: { type: String, enum: ["14KT", "18KT", "22KT"], required: true },
  size: { type: String }, // Only for rings

  diamondDetails: {
    type: [
      {
        stoneType: { type: String },
        color: String,
        clarity: String,
        shape: String,
        weight: Number,
      },
    ],
    default: [],
  },

  priceBreakup: [
    {
      label: String,
      amount: Number,
    },
  ],
  totalPrice: { type: Number, required: true },

  sku: { type: String, required: true },
  stock: { type: Number, default: 0 },
  weightInGrams: { type: Number },
  images: [String],
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: [String], // Bestseller, New Arrival, etc.
  variants: [variantSchema], // 🔥 This is where the magic happens
  status: {
    status: {
      type: Boolean,
      default: true, // true = active
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.index({ title: "text" }); // for search
productSchema.index({ categoryId: 1 });
productSchema.index({ subCategoryId: 1 });
productSchema.index({ "variants.metalColor": 1 });
productSchema.index({ "variants.carat": 1 });

module.exports = mongoose.model("Product", productSchema);
