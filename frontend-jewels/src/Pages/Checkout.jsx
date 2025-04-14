import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', city: '', pincode: '', mobile: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const grandTotal = cartItems.reduce((acc, item) => acc + item.quantity * (item.variant?.totalPrice || 0), 0);

  const handleOrder = () => {
    if (!form.name || !form.address || !form.city || !form.pincode || !form.mobile) {
      alert('Please fill all the fields');
      return;
    }
    // Show success modal
    // Post order data to backend
    console.log('Order placed:', { cartItems, form, grandTotal });
    setOrderPlaced(true);

  };

  return (
    <>
      <div className=''>
        <div className='bg-cream pt-40'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-4 md:p-8">

            {/* Cart Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6 space-y-4"
            >
              <h2 className="text-2xl font-bold text-cyan-900">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item._id + item.variantId} className="flex items-center gap-4">
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.variant?.metalColor} • {item.variant?.carat}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Qty: {item.quantity}</p>
                    <p className="marron montserrat font-semibold">₹{item.quantity * item.variant?.totalPrice}</p>
                  </div>
                </div>
              ))}
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="maroon montserrat">₹{grandTotal}</span>
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold text-cyan-900">Shipping & Payment</h2>
              <input name="name" onChange={handleChange} value={form.name} type="text" required placeholder="Full Name" className="w-full border rounded p-2" />
              <input name="address" onChange={handleChange} value={form.address} type="text" required placeholder="Address" className="w-full border rounded p-2" />
              <input name="city" onChange={handleChange} value={form.city} type="text" required placeholder="City" className="w-full border rounded p-2" />
              <input name="pincode" onChange={handleChange} value={form.pincode} type="text" required placeholder="Pincode" className="w-full border rounded p-2" />
              <input name="mobile" onChange={handleChange} value={form.mobile} type="text" required placeholder="Mobile Number" className="w-full border rounded p-2" />

              <button
                onClick={handleOrder}
                className="w-full bg-maroon hover:bg-red-900 text-white py-3 rounded-xl font-semibold transition"
              >
                Place Order
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-sm w-full animate-pop">
            <div className="text-4xl mb-4">🎉🎊</div>
            <h2 className="text-xl font-bold text-green-600">Order Placed Successfully!</h2>
            <p className="text-gray-600 mt-2">Thank you for shopping with us 💎</p>
            <button
              onClick={() => setOrderPlaced(false)}
              className="mt-6 px-4 py-2 bg-maroon text-white rounded-lg hover:bg-red-900"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default Checkout;
