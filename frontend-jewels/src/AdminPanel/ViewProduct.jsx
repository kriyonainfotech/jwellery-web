import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const VariantModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full rounded-lg p-6 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Variants of {product.title}</h2>
        <button
          className="absolute top-2 right-4 text-lg font-bold text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {product.variants?.map((variant, idx) => (
          <div key={idx} className="border rounded-md p-4 mb-4">
            <p className="mb-2">
              <strong>Color:</strong> {variant.metalColor} | <strong>Carat:</strong> {variant.carat} | <strong>Size:</strong> {variant.size}
            </p>
            <p><strong>Price:</strong> ₹{variant.totalPrice}</p>
            <div className="flex gap-3 mt-2 flex-wrap">
              {variant.images?.length ? (
                variant.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Variant-${idx}-Image-${i}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))
              ) : (
                <p className="text-gray-400">No Images</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/all`
        );

        console.log(response.data.data, "all products")
        if (response.data.success === true) {
          setProducts(response.data.data);
        }
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
            {products.map((product) => (
              <tr key={product._id} className="text-sm">
                <td className="px-6 py-4 border-b">
                  <img
                    src={product.thumbnail || "/no-image.png"}
                    className="w-14 h-14 object-cover rounded"
                    alt={product.title}
                  />
                </td>
                <td className="px-5 py-3 border-b">producttitle</td>
                <td className="px-5 py-3 border-b">
                  {product.categoryId?.name}
                </td>
                <td className="px-5 py-3 border-b">{product.description}</td>
                <td className="px-5 py-3 border-b">
                  {product.tags?.join(", ")}
                </td>
                <td className="px-5 py-3 border-b text-center">
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.variants?.length} Variant
                    {product.variants?.length > 1 ? "s" : ""}
                  </button>
                </td>
                <td className="px-5 py-3 border-b text-center capitalize">
                  {product.status?.status ? "Active" : "Inactive"}
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

        {/* 🔍 Variant Modal */}
        {selectedProduct && (
          <VariantModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
