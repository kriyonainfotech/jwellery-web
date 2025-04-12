import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductDetails = ({ product }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState("rose-gold");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);

  const images = product?.variations?.[selectedVariation]?.images || [];
  const price = product?.variations?.[selectedVariation]?.price || 0;

  const Accordion = ({ title, children, id }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
        className="w-full py-4 flex justify-between items-center"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            openAccordion === id ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          openAccordion === id ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="flex gap-4">
          {/* Thumbnail Column */}
          <div className="flex flex-col gap-4 w-20">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  activeImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <LazyLoadImage
                  src={img}
                  effect="blur"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 aspect-square bg-gray-50 rounded-xl overflow-hidden">
            <LazyLoadImage
              src={images[activeImage]}
              effect="blur"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Title & Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="text-2xl font-semibold text-primary">
              ₹{price.toLocaleString()}
            </div>
          </div>

          {/* Variations */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Metal Color</h3>
            <div className="flex gap-3">
              {Object.keys(product.variations || {}).map((variation) => (
                <button
                  key={variation}
                  onClick={() => {
                    setSelectedVariation(variation);
                    setActiveImage(0);
                  }}
                  className={`p-1 rounded-full border-2 ${
                    selectedVariation === variation
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${
                      variation === "rose-gold"
                        ? "bg-rose-gold"
                        : variation === "white-gold"
                        ? "bg-white-gold"
                        : "bg-yellow-gold"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Accordions */}
          <div className="space-y-2">
            <Accordion title="Price Breakdown" id="price">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Product Price</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{(price * 0.18).toLocaleString()}</span>
                </div>
              </div>
            </Accordion>

            <Accordion title="Diamond Details" id="diamond">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Carat Weight</p>
                  <p className="font-medium">1.2 CT</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clarity</p>
                  <p className="font-medium">VVS/VS</p>
                </div>
              </div>
            </Accordion>
          </div>

          {/* Description */}
          <div id="description" className="pt-8">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <a
              href="#description"
              className="mt-4 inline-flex items-center text-primary hover:text-primary-dark"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
// Usage example (in a parent component):