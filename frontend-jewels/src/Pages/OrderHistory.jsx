import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const apiurl = import.meta.env.VITE_API_URL;

const OrderHistory = () => {
 
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);

const fetchOrders = async () => {
  try {
    const res = await axios.get(`${apiurl}/order/get-orders`, {
      withCredentials: true,
    });
    console.log(res.data, "order response");

    // Store the orders in localStorage
    localStorage.setItem("orders", JSON.stringify(res.data.orders));

    setOrders(res.data.orders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  // Check if orders are available in localStorage
  const storedOrders = localStorage.getItem("orders");

  if (storedOrders) {
    setOrders(JSON.parse(storedOrders));
    setLoading(false); // No need to call the API if data is in localStorage
  } else {
    fetchOrders(); // Fetch from API if no orders in localStorage
  }
}, []);


  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading orders...</div>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="text-center text-gray-500">No orders yet.</div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-50 p-5 rounded-xl shadow-md mb-6 space-y-4"
              >
                {/* Top Order Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  {/* Left: Order Info */}
                  <div>
                    <p className="text-xs text-gray-500 truncate">
                      <span className="font-semibold">Order:</span> {order._id}
                    </p>
                    <p className="text-xs text-gray-400">
                      Placed: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Right: Status Buttons */}
                  <div className="flex flex-wrap gap-2 text-xs mt-1 sm:mt-0">
                    <span
                      title={`Order Status: ${order.status}`}
                      className={`px-3 py-2 rounded-full font-semibold capitalize ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span
                      title={`Payment: ${order.paymentStatus}`}
                      className={`px-3 py-2 rounded-full font-semibold capitalize ${
                        order.paymentStatus === "paid"
                          ? "bg-blue-100 text-blue-700"
                          : order.paymentStatus === "failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 border p-3 rounded-md">
                      {/* You can fetch product thumbnail using item.productId.image if populated */}
                      <img
                        src={item.productId.thumbnail || "/placeholder.jpg"}
                        alt="Product"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-sm mb-0 font-medium">
                          {item.productId.title}
                        </p>
                        <p className="text-sm mb-0 text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm mb-0 text-gray-700">
                          Price: ₹ {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Summary */}
                <div className="flex flex-col sm:flex-row sm:justify-between text-sm pt-2 border-t mt-4">
                  <div className="mt-2">
                    <p className="text-gray-500">
                      Shipping Address:
                      <span className="text-gray-800 font-medium ps-2">
                        {order.shippingInfo[0]?.address},{" "}
                        {order.shippingInfo[0]?.city},{" "}
                        {order.shippingInfo[0]?.state} -{" "}
                        {order.shippingInfo[0]?.pincode}
                      </span>
                    </p>
                    <p className="text-gray-500">
                      Phone: {order.userId?.phone || "Not provided"}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:text-right">
                    <p className="text-gray-500">
                      Payment Method: {order.paymentMethod}
                    </p>
                    <p className="font-bold text-gray-900">
                      Total: ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default OrderHistory;
