// pages/ProductDetailsPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "./ProductDetails";
const apiurl = import.meta.env.VITE_API_URL;

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) return; // prevent duplicate fetches

    const fetchProduct = async () => {
      console.log("Fetching product...");
      setLoading(true);
      try {
        const res = await axios.get(`${apiurl}/product/${productId}`);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
        console.log("Done loading");
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading || !product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  console.log(product, "pp2");
  
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
