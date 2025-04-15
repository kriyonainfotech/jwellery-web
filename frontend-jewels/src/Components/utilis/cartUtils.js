// utils/cartUtils.js

// 🔁 Get cart from localStorage
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// 💾 Save cart to localStorage
export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ➕ Add product to cart (or increase quantity if already exists)
export const addToCart = (product, variantId = null, quantity = 1) => {
  const cart = getCart();

  const itemIndex = cart.findIndex(
    (item) => item._id === product._id && item.variantId === variantId
  );

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += quantity;
  } else {
    cart.push({
      _id: product._id,
      title: product.title,
      thumbnail: product.thumbnail,
      variantId,
      variant: product.variants.find((v) => v._id === variantId),
      quantity: Number(quantity),
    });
  }

  saveCart(cart);
  return cart;
};

// 🔁 Update quantity of a product in cart
export const updateCartQty = (productId, variantId, qty) => {
  if (!qty || isNaN(qty) || qty < 1) qty = 1; // 💡 fallback

  const cart = getCart();

  const updatedCart = cart.map((item) => {
    if (item._id === productId && item.variantId === variantId) {
      return { ...item, quantity: Number(qty) };
    }
    return item;
  });

  saveCart(updatedCart);
  return updatedCart;
};


// ❌ Remove item from cart
export const removeFromCart = (productId, variantId) => {
  const cart = getCart();

  const updatedCart = cart.filter(
    (item) => !(item._id === productId && item.variantId === variantId)
  );

  saveCart(updatedCart);
  return updatedCart;
};

// 🧮 Get total quantity of items in cart
export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// 💰 Get total cart value
export const getCartTotalPrice = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const price = item?.variant?.totalPrice || 0;
    return sum + price * item.quantity;
  }, 0);
};
