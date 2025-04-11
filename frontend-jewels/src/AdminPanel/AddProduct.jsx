import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const apiurl = import.meta.env.VITE_API_URL;

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("active");
  const [variants, setVariants] = useState([
    {
      metalColor: "",
      carat: "",
      size: "",
      diamondDetails: [],
      priceBreakup: [],
      totalPrice: "",
      sku: "",
      stock: "",
      weightInGrams: "",
      images: [],
    },
  ]);

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleVariantImageChange = (index, files) => {
    const fileArray = Array.from(files);
    const updatedVariants = [...variants];
    updatedVariants[index].images = fileArray;
    setVariants(updatedVariants);
  };

  const addNewVariant = () => {
    setVariants([
      ...variants,
      {
        metalColor: "",
        carat: "",
        size: "",
        diamondDetails: [],
        priceBreakup: [],
        totalPrice: "",
        sku: "",
        stock: "",
        weightInGrams: "",
        images: [],
      },
    ]);
  };

  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  // categories and subcategories
  const fetchCategories = async () => {
    // ✅ Check localStorage first
    const cached = localStorage.getItem("categories");
    if (cached) {
      console.log("📦 Using cached categories from localStorage");
      setCategories(JSON.parse(cached));
      return;
    }

    // 🧠 If not cached, fetch from API
    try {
      console.log("🌐 Fetching categories from API...");
      const res = await axios.get(`${apiurl}/category/getallcategories`);
      if (res.data.success && res.data.categories) {
        setCategories(res.data.categories);
        localStorage.setItem("categories", JSON.stringify(res.data.categories));
        console.log("✅ Categories saved to localStorage");
      } else {
        console.error("⚠️ No categories received from API");
      }
    } catch (err) {
      console.error("❌ Error fetching categories:", err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // const subcategories = [
  //   { _id: "abc", name: "Rose Gold" },
  //   { _id: "def", name: "Yellow Gold" },
  // ];

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("subCategoryId", subCategoryId);
    formData.append("status", status);
    formData.append("tags", tags);

    // Append thumbnail image
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    // Prepare variants
    const updatedVariants = variants.map((variant, i) => {
      const { images, ...rest } = variant;
      return rest; // images will be handled separately
    });

    formData.append("variants", JSON.stringify(updatedVariants));

    // Append all variant images in a nested way
    variants.forEach((variant, i) => {
      variant.images.forEach((file, j) => {
        formData.append(`variantImages_${i}_${j}`, file); // like variantImages_0_0
      });
    });

    console.log("🚀 Submitting formData:", formData);

    try {
      const res = await axios.post(`${apiurl}/product/add-product`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res, "res");

      if (res.data.success) {
        console.log("✅ Product added:", res.data);
        navigate("/admin/products");
      } else {
        console.error("❌ API failed:", res.data.message);
      }
    } catch (err) {
      console.error("🔥 API Error:", err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-cyan-900 mb-6">
        Add New Jewelry Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Product Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="e.g. Diamond Ring"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="e.g. New, Bestseller, Gift"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={categoryId}
            onChange={(e) => {
              const selectedId = e.target.value;
              setCategoryId(selectedId);

              const selectedCategory = categories.find(
                (cat) => cat._id === selectedId
              );
              if (selectedCategory && selectedCategory.subcategories) {
                setSubcategories(selectedCategory.subcategories);
                console.log("Subcategories:", selectedCategory.subcategories);
              } else {
                setSubcategories([]); // no subcategories
              }
            }}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block mb-1 font-medium">Subcategory</label>
          {subcategories.length > 0 && (
            <div className="">
              <select
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail"
              className="mt-2 w-28 h-28 object-cover rounded-md"
            />
          )}
        </div>

        {/* Description - Full width row */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md"
            rows="4"
            placeholder="Describe the product in detail..."
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-cyan-800">
            Product Variants
          </h3>

          {variants.map((variant, index) => (
            <div
              key={index}
              className="border p-4 mb-4 rounded-md shadow-sm space-y-4 bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Metal Color</label>
                  <select
                    value={variant.metalColor}
                    onChange={(e) =>
                      handleVariantChange(index, "metalColor", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="Yellow Gold">Yellow Gold</option>
                    <option value="Rose Gold">Rose Gold</option>
                    <option value="White Gold">White Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Carat</label>
                  <select
                    value={variant.carat}
                    onChange={(e) =>
                      handleVariantChange(index, "carat", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="14KT">14KT</option>
                    <option value="18KT">18KT</option>
                    <option value="22KT">22KT</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Size (for rings)</label>
                  <input
                    type="text"
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="e.g. 6, 7, 8..."
                  />
                </div>

                <div>
                  <label className="block mb-1">SKU</label>
                  <input
                    type="text"
                    value={variant.sku}
                    onChange={(e) =>
                      handleVariantChange(index, "sku", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Unique SKU"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Stock</label>
                  <input
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(index, "stock", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Stock quantity"
                  />
                </div>

                <div>
                  <label className="block mb-1">Total Price</label>
                  <input
                    type="number"
                    value={variant.totalPrice}
                    onChange={(e) =>
                      handleVariantChange(index, "totalPrice", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="₹ Total price"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">Weight (g)</label>
                  <input
                    type="number"
                    value={variant.weightInGrams}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "weightInGrams",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Weight in grams"
                  />
                </div>

                <div>
                  <label className="block mb-1">Upload Variant Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      handleVariantImageChange(index, e.target.files)
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                    accept="image/*"
                  />
                </div>
              </div>

              {/* 🗑️ Remove Variant (if more than one) */}
              {variants.length > 1 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove this variant
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* ➕ Add Variant Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={addNewVariant}
              className="bg-violet-800 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
            >
              + Add Another Variant
            </button>
            {/* Submit Button - Full width row */}
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
