import React, { useState } from "react";

const AddProduct = () => {
  // Categories and Subcategories for Jewelry
  const categories = [
    { id: 1, name: "Rings", subcategories: ["Gold", "Silver", "Platinum"] },
    { id: 2, name: "Necklaces", subcategories: ["Chains", "Pendants", "Chokers"] },
    { id: 3, name: "Earrings", subcategories: ["Hoops", "Studs", "Drop Earrings"] },
  ];

  // State to handle form data
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productTags, setProductTags] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [productStockQuantity, setProductStockQuantity] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productMaterial, setProductMaterial] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle form inputs
  const handleCategoryChange = (e) => {
    setProductCategory(e.target.value);
    setProductSubCategory(""); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (e) => {
    setProductSubCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview selected image
    }
  };

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleProductDescriptionChange = (e) => setProductDescription(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);
  const handleProductTagsChange = (e) => setProductTags(e.target.value);
  const handleProductSKUChange = (e) => setProductSKU(e.target.value);
  const handleProductStockQuantityChange = (e) => setProductStockQuantity(e.target.value);
  const handleProductWeightChange = (e) => setProductWeight(e.target.value);
  const handleProductMaterialChange = (e) => setProductMaterial(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      productName &&
      productDescription &&
      productPrice &&
      productCategory &&
      productSubCategory &&
      productTags &&
      productSKU &&
      productStockQuantity &&
      productWeight &&
      productMaterial &&
      productImage
    ) {
      const newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        subCategory: productSubCategory,
        tags: productTags,
        SKU: productSKU,
        stockQuantity: productStockQuantity,
        weight: productWeight,
        material: productMaterial,
        image: productImage,
      };

      alert("Product Added Successfully!");
      console.log(newProduct); // Here you can handle the product data (e.g., send to API or store in state)

      // Reset the form after submitting
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductCategory("");
      setProductSubCategory("");
      setProductTags("");
      setProductSKU("");
      setProductStockQuantity("");
      setProductWeight("");
      setProductMaterial("");
      setProductImage(null);
      setImagePreview(null);
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Get subcategories based on selected category
  const selectedCategory = categories.find((category) => category.id === parseInt(productCategory));
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <div className="col-12 flex justify-center">
      <div className="col-10 mt-5">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Add New Jewelry Product</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div className="flex flex-col">
              <label htmlFor="productName" className="text-lg font-medium mb-1">Product Name</label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={handleProductNameChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Description */}
            <div className="flex flex-col">
              <label htmlFor="productDescription" className="text-lg font-medium mb-1">Product Description</label>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter product description"
                rows="4"
                required
              />
            </div>

            {/* Product Price */}
            <div className="flex flex-col">
              <label htmlFor="productPrice" className="text-lg font-medium mb-1">Product Price</label>
              <input
                type="number"
                id="productPrice"
                value={productPrice}
                onChange={handleProductPriceChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter product price"
                required
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col">
              <label htmlFor="productTags" className="text-lg font-medium mb-1">Product Tags</label>
              <input
                type="text"
                id="productTags"
                value={productTags}
                onChange={handleProductTagsChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter product tags (comma separated)"
                required
              />
            </div>

            {/* SKU */}
            <div className="flex flex-col">
              <label htmlFor="productSKU" className="text-lg font-medium mb-1">Product SKU</label>
              <input
                type="text"
                id="productSKU"
                value={productSKU}
                onChange={handleProductSKUChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter product SKU"
                required
              />
            </div>

            {/* Stock Quantity */}
            <div className="flex flex-col">
              <label htmlFor="productStockQuantity" className="text-lg font-medium mb-1">Stock Quantity</label>
              <input
                type="number"
                id="productStockQuantity"
                value={productStockQuantity}
                onChange={handleProductStockQuantityChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter stock quantity"
                required
              />
            </div>

            {/* Weight */}
            <div className="flex flex-col">
              <label htmlFor="productWeight" className="text-lg font-medium mb-1">Weight (grams)</label>
              <input
                type="number"
                id="productWeight"
                value={productWeight}
                onChange={handleProductWeightChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter product weight"
                required
              />
            </div>

            {/* Material */}
            <div className="flex flex-col">
              <label htmlFor="productMaterial" className="text-lg font-medium mb-1">Material Type</label>
              <input
                type="text"
                id="productMaterial"
                value={productMaterial}
                onChange={handleProductMaterialChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter material type (e.g., Gold, Silver)"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-lg font-medium mb-1">Select Category</label>
              <select
                id="category"
                value={productCategory}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            {productCategory && (
              <div className="flex flex-col">
                <label htmlFor="subcategory" className="text-lg font-medium mb-1">Select Subcategory</label>
                <select
                  id="subcategory"
                  value={productSubCategory}
                  onChange={handleSubCategoryChange}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subCategory, index) => (
                    <option key={index} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Product Image */}
            <div className="flex flex-col">
              <label htmlFor="productImage" className="text-lg font-medium mb-1">Product Image</label>
              <input
                type="file"
                id="productImage"
                onChange={handleImageChange}
                className="p-2 border border-gray-300 rounded-md"
                accept="image/*"
                required
              />
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Image Preview:</h3>
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
