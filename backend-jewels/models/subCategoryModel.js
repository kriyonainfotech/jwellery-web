const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

// 🧠 Useful indexes (you can uncomment these if needed)
// subCategorySchema.index({ name: 1 }, { unique: true });
// subCategorySchema.index({ categoryId: 1 });

module.exports =
  mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
