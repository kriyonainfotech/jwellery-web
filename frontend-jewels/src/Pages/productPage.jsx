import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const apiurl = import.meta.env.VITE_API_URL;

const ProductPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 779943],
    metalColor: [],
    categories: [],
    carat: [],
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 100 &&
  //       !loading
  //     ) {
  //       setPage((prev) => prev + 1);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [loading]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (loading) return; // Don't fetch if already loading
      setLoading(true);

      try {
        let response;

        if (categoryId) {
          console.log("📦 Fetching products by category ID:", categoryId);
          response = await axios.get(
            `${apiurl}/category/${categoryId}?limit=50` // Fetch all products in the category
          );
          setCategory(response.data.category); // Set the category data
        } else if (subcategoryId) {
          console.log("📦 Fetching products by subcategory ID:", subcategoryId);
          response = await axios.get(
            `${apiurl}/subcategory/${subcategoryId}?limit=50` // Fetch all products in the subcategory
          );
          setsubcategory(response.data.subcategory); // Set the subcategory data
        }

        console.log(response, "get products by Id in shop");

        if (response?.data?.success && response?.data?.products?.length > 0) {
          setProducts(response.data.products); // Directly set all products
          console.log("✅ Products fetched:", response.data.products);
        } else {
          console.warn("⚠️ No products received");
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Trigger the fetch
  }, [categoryId, subcategoryId]); // Fetch products when categoryId or subcategoryId changes

  // Mock infinite scroll
  // const loadMoreProducts = () => {
  //   setLoading(true);
  //   // Simulate API call
  //   setTimeout(() => {
  //     setProducts((prev) => [...prev, ...new Array(6).fill({})]);
  //     setPage((prev) => prev + 1);
  //     setLoading(false);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   loadMoreProducts();
  // }, []);

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">No Products Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 flex gap-8 pt-44">
        {/* Filters Sidebar (30%) */}
        <div className="w-1/4 space-y-8">
          <FilterSection title="New Arrival">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-gray-700" />
              <span>Show New Arrivals</span>
            </label>
          </FilterSection>

          <FilterSection title="Price">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>₹{filters.priceRange[0].toLocaleString()}</span>
                <span>₹{filters.priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="779943"
                className="w-full range range-primary"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceRange: [e.target.value, filters.priceRange[1]],
                  })
                }
              />
            </div>
          </FilterSection>

          <FilterSection title="Metal Color">
            {["Rose Gold", "White Gold", "Yellow Gold"].map((color) => (
              <label key={color} className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span
                  className={`w-4 h-4 rounded-full ${
                    color === "Rose Gold"
                      ? "bg-rose-gold"
                      : color === "White Gold"
                      ? "bg-white-gold"
                      : "bg-yellow-gold"
                  }`}
                />
                <span>{color}</span>
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Category">
            {["Birthday Gifts", "Casual", "Cocktail", "Engagement Ring"].map(
              (category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>{category}</span>
                </label>
              )
            )}
          </FilterSection>
        </div>

        {/* Products Grid (70%) */}
        <div className="w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Link to={`/product/${product._id}`} className="no-underline">
                  <div className="h-[350px] bg-gray-100 rounded-t-lg overflow-hidden">
                    <LazyLoadImage
                      src={product.thumbnail || "/placeholder.jpg"}
                      effect="blur"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg crimson text-gray-800 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-800 montserrat font-medium">
                      ₹ {product.variants[0].totalPrice}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-xs">
    <h4 className="font-semibold text-lg mb-4">{title}</h4>
    <div className="space-y-3">{children}</div>
  </div>
);

export default ProductPage;
