// models/category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String }, // optional image URL
  },
  { timestamps: true }
);

// categorySchema.index({ name: 1 }); // 🔍 Index for faster search

module.exports = mongoose.model("Category", categorySchema);
