import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { updateCartQty, removeFromCart, getCart } from "../Components/utilis/cartUtils";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = getCart(); // it's already complete, no need to remap
    setCartItems(cart);
    console.log(cart, "cart");
  }, []);

const handleQtyChange = (productId, variantId, newQty) => {
  // ✅ Sanitize qty
  const qty = isNaN(newQty) || newQty < 1 ? 1 : newQty;

  // 🔄 Update localStorage
  updateCartQty(productId, variantId, qty);

  // ✅ Update React state directly
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item._id === productId && item.variantId === variantId
        ? { ...item, quantity: qty }
        : item
    )
  );
};

const handleRemove = (productId, variantId) => {
  removeFromCart(productId, variantId);
  const updatedCart = getCart().map((item) => {
    const variant = item.variants?.find((v) => v._id === item.variantId);
    return { ...item, variant };
  });
  setCartItems(updatedCart);
};

const subtotal = cartItems.reduce(
  (acc, item) => acc + (item.variant?.totalPrice || 0) * item.quantity,
  0
);

return (
  <div className="bg-[#efdfbb75] h-screen">
    <div className="container mx-auto pt-40">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item._id + item.variantId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-[8rem_1fr_auto] bg-white border-[0.2px] border-red-800 border-opacity-40 rounded-xl overflow-hidden"
              >
                {/* Thumbnail */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-[full] h-full object-cover"
                />

                {/* Product Info & Controls */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.variant?.metalColor} • {item.variant?.carat}
                    </p>
                  </div>

                  <div className="flex items-center mt-4 gap-2">
                    <button
                      onClick={() =>
                        handleQtyChange(
                          item._id,
                          item.variantId,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 font-medium">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() =>
                        handleQtyChange(
                          item._id,
                          item.variantId,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Remove Button */}
                <div className="p-4 flex flex-col justify-between items-end text-right">
                  <p className="font-bold text-lg maroon">
                    ₹{item.variant?.totalPrice * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id, item.variantId)}
                    className="text-white text-sm bg-maroon px-4 py-2 rounded-2xl mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white border-[0.2px] border-red-900 border-opacity-40 p-6 rounded-lg sticky top-24 h-fit">
            <h3 className="text-lg montserrat font-bold mb-4">🧾 Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between font-semibold text-xl">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <Link to={"/checkout"}>
              <button className="mt-6 w-full bg-maroon text-white py-3 rounded-lg font-semibold">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold mb-4">Your cart is empty!</h3>
          <a
            href="/"
            className="maroon bg-maroon text-white rounded-lg px-3 py-2 font-medium hover:underline"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  </div>
);
};

export default CartPage;