// pages/ProductDetailsPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "./ProductDetails";
const apiurl = import.meta.env.VITE_API_URL;

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${apiurl}/product/${productId}`).then((res) => {
      setProduct(res.data.product);
    });
  }, [productId]);

  console.log(product, 'pp2')
  if (!product) return <div className="text-center py-10">Loading...</div>;

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
