const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  viewCart,
  updateCartItem,
} = require("../controller/cartController");
const { isUserLoggedIn } = require("../middleware/authmiddleware");

// Add product to cart
router.post("/add", isUserLoggedIn, addToCart);

// Remove product from cart
router.delete("/remove/:id", removeFromCart);

// View the user's cart
router.get("/view", viewCart);

// Update quantity of a cart item
router.put("/update/:id", updateCartItem);

module.exports = router;
