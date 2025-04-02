const Cart = require("../models/cartModel");
const Product = require("../models/productModel"); // Make sure to require the Product model for price lookup

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Assuming user authentication is done
    console.log(req.user, "a", req.body);

    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find cart for the user
    let cart = await Cart.findOne({ user: userId });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // Update the quantity if the product is already in the cart
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Assuming user authentication is done

    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item to remove
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// View cart
const viewCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user authentication is done

    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update item quantity in cart
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // Product ID in the cart
    const { quantity } = req.body; // New quantity
    const userId = req.user._id; // Assuming user authentication is done

    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity
    cart.items[itemIndex].quantity = quantity;

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addToCart, removeFromCart, viewCart, updateCartItem };
