import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewProduct = () => {
  const [products, setProducts] = useState([
    { id: 1, image: 'https://picsum.photos/100/100', name: 'Smartphone', description: 'Latest model with high-end features' },
    { id: 2, image: 'https://picsum.photos/100/100', name: 'Laptop', description: 'Powerful laptop for productivity' },
    { id: 3, image: 'https://picsum.photos/100/100', name: 'Headphones', description: 'Noise-cancelling headphones' },
  ]);

  const handleAddProduct = () => {
    alert('Add Product button clicked!');
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold montserrat">Manage Products</h1>
        <Link
          to={'/admin/products/add'}
          className="bg-green-500 no-underline text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-5 py-3 border-b">Image</th>
              <th className="px-5 py-3 border-b">Product Name</th>
              <th className="px-5 py-3 border-b">Description</th>
              <th className="px-5 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-sm">
                <td className="px-6 py-4 border-b">
                  <img src={product.image} className="img-fluid w-14 h-14 object-cover rounded" alt={product.name} />
                </td>
                <td className="px-5 py-3 border-b">{product.name}</td>
                <td className="px-5 py-3 border-b">{product.description}</td>
                <td className="px-5 py-3 border-b text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mx-2"
                    onClick={() => alert(`Edit ${product.name}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 mx-2"
                    onClick={() => alert(`Delete ${product.name}`)}
                  >
                    Delete
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

export default ViewProduct;
