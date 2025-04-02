import React, { useState } from "react";

// Sample user data
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", role: "User", status: "Active" },
];

const ViewUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  // Handle Edit User functionality
  const handleEditUser = (id) => {
    alert(`Editing user with ID: ${id}`);
    // You could open a modal or navigate to an edit page here
  };

  // Handle Delete User functionality
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    alert(`Deleted user with ID: ${id}`);
  };

  // Toggle User Status functionality
  const handleToggleStatus = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 montserrat">Manage Users</h1>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-5 py-3 border-b">ID</th>
              <th className="px-5 py-3 border-b">Name</th>
              <th className="px-5 py-3 border-b">Email</th>
              <th className="px-5 py-3 border-b">Role</th>
              <th className="px-5 py-3 border-b">Status</th>
              <th className="px-5 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-sm">
                <td className="px-6 py-4 border-b">{user.id}</td>
                <td className="px-5 py-3 border-b">{user.name}</td>
                <td className="px-5 py-3 border-b">{user.email}</td>
                <td className="px-5 py-3 border-b">{user.role}</td>
                <td className="px-5 py-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${user.status === "Active" ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3 border-b text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mx-2"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 mx-2"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-yellow-500 hover:text-yellow-700 mx-2"
                    onClick={() => handleToggleStatus(user.id)}
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
