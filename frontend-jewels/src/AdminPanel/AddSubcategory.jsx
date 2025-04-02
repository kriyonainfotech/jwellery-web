import React, { useState } from "react";

const AddSubCategory = () => {


  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home Appliances" },
  ]);

  const [subCategoryName, setSubCategoryName] = useState("");
  const [category, setCategory] = useState(""); // For selected category
  const [subCategoryImage, setSubCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle subcategory name input change
  const handleNameChange = (e) => {
    setSubCategoryName(e.target.value);
  };

  // Handle category dropdown change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle subcategory image input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubCategoryImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (category && subCategoryName && subCategoryImage) {
      const newSubCategory = {
        name: subCategoryName,
        category: category, // Selected category
        image: subCategoryImage, // Subcategory image file
      };
      onAddSubCategory(newSubCategory);
      alert("Subcategory added successfully!");
      setSubCategoryName(""); // Reset subcategory name
      setCategory(""); // Reset category selection
      setSubCategoryImage(null); // Reset image
      setImagePreview(null); // Reset image preview
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="col-12 flex justify-center">
      <div className="col-10 mt-20">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Add New Subcategory</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-lg font-medium mb-1">Select Category</label>
              <select
                id="category"
                value={category}
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

            {/* Subcategory Name */}
            <div className="flex flex-col">
              <label htmlFor="subCategoryName" className="text-lg font-medium mb-1">Subcategory Name</label>
              <input
                type="text"
                id="subCategoryName"
                value={subCategoryName}
                onChange={handleNameChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter subcategory name"
                required
              />
            </div>

            {/* Subcategory Image */}
            <div className="flex flex-col">
              <label htmlFor="subCategoryImage" className="text-lg font-medium mb-1">Subcategory Image</label>
              <input
                type="file"
                id="subCategoryImage"
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
                    alt="Subcategory Preview"
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
                Add Subcategory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
