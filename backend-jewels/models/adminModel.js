const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminId: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      default: "admin", // Default role for this model
      enum: ["admin"], // Role types
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // Avoid `__v` field
  }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
