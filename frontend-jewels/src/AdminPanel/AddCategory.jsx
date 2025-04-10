// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const apiurl = import.meta.env.VITE_API_URL;

// const AddCategory = () => {
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryImage, setCategoryImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="col-12 flex justify-center ">
//         <div className="col-10 mt-20">
//           <div className=" p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-semibold mb-4 opacity-80">
//               Add New Category
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Category Name */}
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="categoryName"
//                   className="text-lg font-medium mb-1"
//                 >
//                   Category Name
//                 </label>
//                 <input
//                   type="text"
//                   id="categoryName"
//                   value={categoryName}
//                   onChange={handleNameChange}
//                   className="p-2 border border-gray-300 rounded-md"
//                   placeholder="Enter category name"
//                   required
//                 />
//               </div>

//               {/* Category Image */}
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="categoryImage"
//                   className="text-lg font-medium mb-1"
//                 >
//                   Category Image
//                 </label>
//                 <input
//                   type="file"
//                   id="categoryImage"
//                   onChange={handleImageChange}
//                   className="p-2 border border-gray-300 rounded-md"
//                   accept="image/*"
//                   required
//                 />
//                 {/* Image Preview */}
//                 {categoryImage && (
//                   <div className="mt-4">
//                     <h3 className="text-sm font-medium">Image Preview:</h3>
//                     <img
//                       src={imagePreview}
//                       alt="Category Preview"
//                       className="mt-2 w-32 h-32 object-cover rounded-md"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
//                 >
//                   Add Category
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddCategory;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const apiurl = import.meta.env.VITE_API_URL;
console.log(apiurl);

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      setError("Please provide category name and image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("image", categoryImage);

      const response = await axios.post(
        `${apiurl}/category/add-category`, // Update your backend URL here
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.category) {
        toast.success("✅ Category created successfully!");
        navigate("/admin/categories"); // Redirect to category list page if needed
      }
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Something went wrong while creating category."
      );
    }
  };

  return (
    <div className="col-12 flex justify-center">
      <div className="col-10 mt-20">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 opacity-80">
            Add New Category
          </h2>

          {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Name */}
            <div className="flex flex-col">
              <label
                htmlFor="categoryName"
                className="text-lg font-medium mb-1"
              >
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={handleNameChange}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Category Image */}
            <div className="flex flex-col">
              <label
                htmlFor="categoryImage"
                className="text-lg font-medium mb-1"
              >
                Category Image
              </label>
              <input
                type="file"
                id="categoryImage"
                onChange={handleImageChange}
                className="p-2 border border-gray-300 rounded-md"
                accept="image/*"
                required
              />
              {categoryImage && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Image Preview:</h3>
                  <img
                    src={imagePreview}
                    alt="Category Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
