const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const { placeOrder, getMyOrders } = require("../controller/orderController");

// Add product to cart
router.post("/place-order", protect, placeOrder);
router.get("/get-orders", protect, getMyOrders)

module.exports = router;
