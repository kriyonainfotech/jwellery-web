// components/ProductDetails.jsx
import React from "react";
import { motion } from "framer-motion";
import { addToCart } from "../Components/utilis/cartUtils";

const ProductDetails = ({ product }) => {
  console.log(product, "pp");
  const { thumbnail, title, description, variants, tags, status } = product;

  const variant = variants[0]; // Assuming single variant for now

  const handleAddToCart = () => {
    addToCart(product, product.variants?.[0]?._id, 1); // assuming variant exists
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-32">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <motion.div
          className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <p className="text-gray-600 mb-4">{description}</p>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Metal Color</p>
              <p className="font-medium text-gray-800">{variant.metalColor}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Carat</p>
              <p className="font-medium text-gray-800">{variant.carat}</p>
            </div>
            {/* 
            {variant.size?.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Available Sizes</p>
                <div className="flex gap-2 flex-wrap">
                  {variant.size.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )} */}

            {tags?.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-1">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-cyan-900">
                ₹{" "}
                {product?.variants?.[0]?.totalPrice?.toLocaleString() || "N/A"}
              </h2>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            <div className="mt-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-md transition-all"
              >
                Add To Cart
              </motion.button>
            </div>
          </div>

          {/* Status */}
          {/* <div className="">
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${status?.status
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
            >
              {status?.status ? "Available ✅" : "Out of Stock ❌"}
            </span>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
