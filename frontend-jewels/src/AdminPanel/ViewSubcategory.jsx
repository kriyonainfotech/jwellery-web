import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewSubcategory = () => {
  const [subcategories, setSubcategories] = useState([
    { id: 1, image: 'https://picsum.photos/100/100', name: 'Smartphones', description: 'Mobile phones category' },
    { id: 2, image: 'https://picsum.photos/100/100', name: 'Laptops', description: 'Laptops and notebooks category' },
    { id: 3, image: 'https://picsum.photos/100/100', name: 'Headphones', description: 'Headphones and audio devices category' },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home Appliances" },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold montserrat">Manage Subcategories</h1>
        <Link
          to={'/admin/subcategories/add '}
          className="bg-purple-500 no-underline text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 transition duration-300"
        >
          Add Subcategory
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-5 py-3 border-b">Image</th>
              <th className="px-5 py-3 border-b">Subcategory Name</th>
              <th className="px-5 py-3 border-b">Description</th>
              <th className="px-5 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory) => (
              <tr key={subcategory.id} className="text-sm">
                <td className="px-6 py-4 border-b">
                  <img src={subcategory.image} className="img-fluid w-14 h-14 object-cover rounded" alt={subcategory.name} />
                </td>
                <td className="px-5 py-3 border-b">{subcategory.name}</td>
                <td className="px-5 py-3 border-b">{subcategory.description}</td>
                <td className="px-5 py-3 border-b text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mx-2"
                    onClick={() => alert(`Edit ${subcategory.name}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 mx-2"
                    onClick={() => alert(`Delete ${subcategory.name}`)}
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

export default ViewSubcategory;
