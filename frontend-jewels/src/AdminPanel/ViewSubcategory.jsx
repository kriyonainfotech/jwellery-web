import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewSubcategory = () => {
  const { categoryId } = useParams(); // get categoryName from URL
  const [subcategories, setSubcategories] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    const localData = localStorage.getItem("categories");
    if (localData) {
      const allCategories = JSON.parse(localData);
      const matchedCategory = allCategories.find(
        (cat) => cat._id === categoryId
      );

      if (matchedCategory) {
        setCategoryTitle(matchedCategory.name);
        setSubcategories(matchedCategory.subcategories || []);
      }
    }
  }, [categoryId]);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold montserrat">
          {categoryTitle
            ? `Subcategories of "${categoryTitle}"`
            : "Manage Subcategories"}
        </h1>
        <Link
          to={`/admin/${categoryId}/add`}
          state={{ categoryName: categoryTitle }}
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
              <th className="px-5 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No subcategories found.
                </td>
              </tr>
            ) : (
              subcategories.map((subcategory) => (
                <tr key={subcategory._id} className="text-sm">
                  <td className="px-6 py-4 border-b">
                    <img
                      src={subcategory.image}
                      className="w-14 h-14 object-cover rounded"
                      alt={subcategory.name}
                    />
                  </td>
                  <td className="px-5 py-3 border-b">{subcategory.name}</td>
                  <td className="px-5 py-3 border-b text-center">
                    {/* <button
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
                    </button> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSubcategory;
