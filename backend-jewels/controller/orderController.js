const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");

exports.placeOrder = async (req, res) => {
  try {
    console.log("🛒 Placing Order API called...");

    const { cartItems, shippingInfo, paymentMethod = "COD", userId } = req.body;

    console.log("📦 Cart Items Received:", cartItems.length);
    console.log("👤 User ID:", userId);
    console.log("🚚 Shipping Info:", shippingInfo);
    console.log("💳 Payment Method:", paymentMethod);

    if (!cartItems || !cartItems.length) {
      console.warn("⚠️ Cart is empty, cannot place order.");
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty!" });
    }

    // 🔍 Calculate total and validate
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cartItems) {
      console.log("🔍 Fetching product:", item.productId);

      const product = await Product.findById(item.productId);
      if (!product) throw new Error("❌ Product not found: " + item.productId);

      const variant = product.variants.find((v) => v._id == item.variantId);
      if (!variant) throw new Error("❌ Variant not found: " + item.variantId);

      const price = variant.totalPrice * item.quantity;
      totalAmount += price;

      orderItems.push({
        productId: product._id,
        variantId: variant._id,
        quantity: item.quantity,
        price,
      });

      console.log(
        `✅ Added Item - 🏷️ Product: ${product.title} | 💎 Variant ID: ${variant._id} | 🧮 Qty: ${item.quantity} | 💰 Subtotal: ₹${price}`
      );
    }

    console.log("🧾 Total Amount Calculated: ₹", totalAmount);
    console.log("📦 Final Order Items:", orderItems.length);

    // ✅ Create order
    const newOrder = await Order.create({
      userId,
      orderItems,
      shippingInfo,
      paymentMethod,
      totalAmount,
    });

    console.log("✅ Order placed successfully! 🆔 Order ID:", newOrder._id);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("❌ Order Placement Failed:", error.message);
    res.status(500).json({ success: false, message: "Order failed!" });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    console.log("🔍 Fetching orders for user:", req.user.id);

    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate({
        path: "userId",
        select: "name email", // or whatever fields you want from user
      })
      .populate({
        path: "orderItems.productId",
        select: "title thumbnail", // change 'name' to 'title' if your product uses 'title'
      });
    if (!orders || !orders.length) {
      console.log("⚠️ No orders found for user:", req.user.id);
      return res.status(404).json({ success: false, message: "No orders found!" });
    }

    console.log("✅ Fetched orders for user:", req.user.id);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error.message);
    res.status(500).json({ success: false, message: "Error fetching orders!" });
  }
};
