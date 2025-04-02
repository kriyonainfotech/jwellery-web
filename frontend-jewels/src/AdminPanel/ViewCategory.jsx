import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ViewCategory = () => {
  const [categories, setCategories] = useState([
    { id: 1, image: 'https://comoexplicarte.com/wp-content/uploads/2020/02/jhonmejia.jpg?w=1120', name: 'Electronics', description: 'Electronic gadgets and devices' },
    { id: 2, image: 'https://comoexplicarte.com/wp-content/uploads/2020/02/jhonmejia.jpg?w=1120', name: 'Clothing', description: 'Fashion and apparel' },
    { id: 3, image: 'https://comoexplicarte.com/wp-content/uploads/2020/02/jhonmejia.jpg?w=1120', name: 'Home Appliances', description: 'Appliances for home use' },
  ]);

  // Open Add Category modal logic (Optional)
  const handleAddCategory = () => {
    alert('Add Category button clicked!');
  };

  return (
    <div>
      <div className="p-6">
        {/* Add Category Button */}
        <div className="mb-6 flex justify-between align-center">
          <h1 className="text-3xl font-semibold montserrat">Manage Categories</h1>
          <Link
            to='/admin/categories/add'
            className="bg-blue-500 no-underline text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add Category
          </Link>
        </div>

        {/* Categories Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold">
                <th className="px-5 py-3 border-b">Image</th>
                <th className="px-5 py-3 border-b">Category Name</th>
                <th className="px-5 py-3 border-b">Description</th>
                <th className="px-5 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="text-sm">
                  <td className="px-6 py-4 border-b">
                    <img src={category.image} className='img-fluid w-14 h-14 object-cover rounded' alt="" />
                  </td>
                  <td className="px-5 py-3 border-b">{category.name}</td>
                  <td className="px-5 py-3 border-b">{category.description}</td>
                  <td className="px-5 py-3 border-b text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 mx-2"
                      onClick={() => alert(`Edit ${category.name}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 mx-2"
                      onClick={() => alert(`Delete ${category.name}`)}
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
    </div>
  )
}

export default ViewCategory
