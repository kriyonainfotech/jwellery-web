// models/Cart.js

const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user who owns the cart
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }, // Reference to the product in the cart
        quantity: {
          type: Number,
          required: true,
          min: 1, // Quantity must be at least 1
        },
        price: {
          type: Number,
          required: true,
        }, // Price at the time the product was added to the cart
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0, // Total price of all items in the cart
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
