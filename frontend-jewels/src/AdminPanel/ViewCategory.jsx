import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const apiurl = import.meta.env.VITE_API_URL;
console.log(apiurl);

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");
        const res = await axios.get(`${apiurl}/category/getallcategories`);
        console.log(res, "categories data");
        if (res.data.success) {
          setCategories(res.data.categories);
          localStorage.setItem(
            "categories",
            JSON.stringify(res.data.categories)
          );
        }
        // Make sure your backend returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="p-6">
        {/* Add Category Button */}
        <div className="mb-6 flex justify-between align-center">
          <h1 className="text-3xl font-semibold montserrat">
            Manage Categories
          </h1>
          <Link
            to="/admin/categories/add"
            className="bg-blue-600 no-underline text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add Category
          </Link>
        </div>

        {/* Categories Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-900 text-white text-sm uppercase tracking-wide">
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Category Name</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50 transition-all duration-200 border-b"
                >
                  <td className="px-6 py-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-14 h-14 object-cover rounded-full shadow-md border"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={() => alert(`Edit ${category.name}`)}
                      className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => alert(`Delete ${category.name}`)}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button>
                      <Link
                        to={`/admin/categories/${category._id}`}
                        className="bg-teal-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-teal-700 transition no-underline"
                      >
                        View Subcategories
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
