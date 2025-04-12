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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 779943],
    metalColor: [],
    categories: [],
    carat: [],
  });

    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 100 &&
          !loading
        ) {
          setPage((prev) => prev + 1);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    
    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);

        try {
          let response;

          if (categoryId) {
            console.log("📦 Fetching products by category ID:", categoryId);
            response = await axios.get(
              `${apiurl}/category/${categoryId}?page=${page}&limit=9`
            );
          } else if (subcategoryId) {
            console.log(
              "📦 Fetching products by subcategory ID:",
              subcategoryId
            );
            response = await axios.get(
              `${apiurl}/product/subcategory/${subcategoryId}?page=${page}&limit=9`
            );
          }

          if (response?.data?.success) {
            setProducts((prev) => [...prev, ...response.data.products]);
            console.log("✅ Products fetched:", response.data.products.length);
          } else {
            console.warn("⚠️ No products received");
          }
        } catch (error) {
          console.error("❌ Error fetching products:", error.message);
        } finally {
          setLoading(false);
        }
      };

       if (categoryId) fetchProducts();
    }, [categoryId, subcategoryId, page]);

    
  // Mock infinite scroll
  const loadMoreProducts = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts((prev) => [...prev, ...new Array(6).fill({})]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="h-[500px] w-full bg-gray-200 mb-8">
        <img
          src="/banner.jpg"
          alt="Collection Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 flex gap-8">
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
                <Link to={`/`} className="no-underline">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <LazyLoadImage
                      src={product.image || "/placeholder.jpg"}
                      effect="blur"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Product Title
                    </h3>
                    <p className="text-primary font-medium">₹ 1,24,999</p>
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
