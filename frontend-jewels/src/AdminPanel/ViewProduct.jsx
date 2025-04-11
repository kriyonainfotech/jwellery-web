import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/all`
        );
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold montserrat">Manage Products</h1>
        <Link
          to={"/admin/products/add"}
          className="bg-violet-800 no-underline text-white px-4 py-2 rounded-md shadow-md hover:bg-violet-700 transition duration-300"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="px-5 py-3 border-b">Thumbnail</th>
              <th className="px-5 py-3 border-b">Product Title</th>
              <th className="px-5 py-3 border-b">Category</th>
              <th className="px-5 py-3 border-b">Description</th>
              <th className="px-5 py-3 border-b">Tags</th>
              <th className="px-5 py-3 border-b text-center">Variants</th>
              <th className="px-5 py-3 border-b text-center">Status</th>
              <th className="px-5 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((product) => (
              <tr key={product._id} className="text-sm">
                <td className="px-6 py-4 border-b">
                  <img
                    src={product.thumbnail}
                    className="w-14 h-14 object-cover rounded"
                    alt={product.title}
                  />
                </td>
                <td className="px-5 py-3 border-b">{product.title}</td>
                <td className="px-5 py-3 border-b">
                  {product.categoryId?.name}
                </td>
                <td className="px-5 py-3 border-b">{product.description}</td>
                <td className="px-5 py-3 border-b">
                  {product.tags?.join(", ")}
                </td>
                <td className="px-5 py-3 border-b text-center">
                  {product.variants?.length} Variants
                </td>
                <td className="px-5 py-3 border-b text-center capitalize">
                  {product.status}
                </td>
                <td className="px-5 py-3 border-b text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mx-2"
                    onClick={() => alert(`Edit ${product.title}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 mx-2"
                    onClick={() => alert(`Delete ${product.title}`)}
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
