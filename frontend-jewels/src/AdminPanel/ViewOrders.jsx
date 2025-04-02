import React, { useState } from 'react';

const ViewOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'John Doe', date: '2024-12-20', status: 'Pending', totalAmount: '$120.50' },
    { id: 2, customerName: 'Jane Smith', date: '2024-12-18', status: 'Shipped', totalAmount: '$89.99' },
    { id: 3, customerName: 'Michael Brown', date: '2024-12-17', status: 'Completed', totalAmount: '$200.00' },
  ]);

  const handleViewOrder = (orderId) => {
    alert(`Viewing order ${orderId}`);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedUsers = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedUsers);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold montserrat">Manage Orders</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-5 py-3 border-b">Order ID</th>
              <th className="px-5 py-3 border-b">Customer Name</th>
              <th className="px-5 py-3 border-b">Order Date</th>
              <th className="px-5 py-3 border-b">Status</th>
              <th className="px-5 py-3 border-b">Total Amount</th>
              <th className="px-5 py-3 border-b text-center">Actions</th>
              <th className="px-5 py-3 border-b">change Status</th>

            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-sm">
                <td className="px-5 py-3 border-b">{order.id}</td>
                <td className="px-5 py-3 border-b">{order.customerName}</td>
                <td className="px-5 py-3 border-b">{order.date}</td>
                <td className="px-5 py-3 border-b">{order.status}</td>
                <td className="px-5 py-3 border-b">{order.totalAmount}</td>
                <td className="px-5 py-3 border-b text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mx-2"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    View
                  </button>

                </td>
                <td className="px-5 py-3 border-b">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="bg-gray-100 text-sm p-2 rounded-md border border-gray-300"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
