import React from "react";
import '../styles/home.css'

const CategorySection = () => {
  // Static array of categories
  const categories = [
    {
      id: 1,
      name: "Jewelry",
      imageUrl: "https://materialgood.com/cdn/shop/files/Slice_6_3f37ce4b-97e9-4cfc-9a85-1dfb975fcd35.png?v=1732131633", // Replace with actual image path
    },
    {
      id: 2,
      name: "Watches",
      imageUrl: "https://materialgood.com/cdn/shop/files/Slice_20_d0b96853-358c-4226-a46c-e9dab3b3e610.png?v=1732131620", // Replace with actual image path
    },
    {
      id: 3,
      name: "Rings",
      imageUrl: "https://materialgood.com/cdn/shop/files/Slice_8_5463ecd9-73aa-4411-afea-15be32820a7e.png?v=1732131608", // Replace with actual image path
    },
    {
      id: 4,
      name: "Earrings",
      imageUrl: "https://materialgood.com/cdn/shop/files/Slice_9_357c53cf-f42a-42b6-85f4-cca833bf19c3.png?v=1732131597", // Replace with actual image path
    },
  ];

  const bestsellers = [
    {
      id: 1,
      title: "Elegant Chains",
      imageUrl: "https://broskizz.com/cdn/shop/files/H76c127326e4d44f9bfe705c794541aa5M.jpg?v=1712263270&width=540", // Replace with actual image path
    },
    {
      id: 2,
      title: "Luxury Ring",
      imageUrl: "https://broskizz.com/cdn/shop/files/Hd7950bb2c25642d292d1936d4729cec6K-2-1.jpg?v=1712263608&width=720", // Replace with actual image path
    },
    {
      id: 3,
      title: "Classic Watch",
      imageUrl: "https://broskizz.com/cdn/shop/files/WhatsApp-Image-2023-08-09-at-7.32.32-AM.jpg?v=1712263559&width=720", // Replace with actual image path
    },
  ];
  return (
    <div>
      <div className="container mt-20">
        {/* section 1 */}
        <div className="row">
          <h1 className="uppercase crimson text-center text-2xl sm:text-3xl tracking-wide text-black px-3 px-sm-0">
            EXPLORE UP TO 20% OFF OUR HOLIDAY COLLECTION
          </h1>
        </div>
        <div className="row mt-5">
          {/* Map through the categories array */}
          {categories.map((category) => (
            <div key={category.id} className="col-6 col-lg-3 my-3 my-lg-0">
              <a href="#" className="item-card">
                <div className="item-img">
                  <img
                    src={category.imageUrl} // Use dynamic image path
                    alt={category.name}
                    className="category-image" // Add appropriate styling class if needed
                  />
                </div>
                <div className="item-title cursor-pointer pt-3">
                  <p className="montserrat text-center uppercase font-medium text-gray-900 hover:text-gray-700 ">
                    {category.name}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="col-12 mt-4">
          <p className="text-center montserrat uppercase">
            <a
              href=""
              className="text-gray-800 tracking-wide -2  font-medium border-gray-900 text-sm"
            >
              explore all
            </a>
          </p>
        </div>
      </div>

      {/* section 2 */}
      <div className="bg-black mt-20">
        <div className="container">
          <div className="row pt-16">
            <h1 className="uppercase text-center text-4xl sm:text-5xl tracking-wider crimson text-white font-semibold">
              FESTIVE FAVORITES
            </h1>
          </div>
          <div className="row pt-16">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <a href="#" className="h-full">
                <div className="image w-100 h-[500px]">
                  <img
                    src="https://materialgood.com/cdn/shop/files/Slice_10_3954f764-d978-4ae5-b126-bd369accadce.jpg?v=1732121359"
                    alt=""
                    className="w-100 object-cover h-100"
                  />
                </div>
                <p className="text-center crimson text-lg text-white pt-4">
                  SEASONAL MUST-HAVES
                </p>
              </a>
            </div>
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <a href="#" className="h-full">
                <div className="image w-100 h-[500px]">
                  <img
                    src="https://materialgood.com/cdn/shop/files/2700ae479859aa4d6752491010d788a6.png?v=1730736660"
                    alt=""
                    className="w-100 object-cover h-100"
                  />
                </div>
                <p className="text-center crimson text-lg text-white pt-4 uppercase">
                  The ferra collection
                </p>
              </a>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="image-banner mt-10"></div>
        </div>
      </div>

      {/* section 3 */}
      <div className="container my-20">
        <div className="row">
          <h1 className="text-center crimson text-4xl sm:text-5xl tracking-widest font-semibold">
            TIMEPIECES
          </h1>
          <div className="col-12 mt-3 mt-sm-5">
            <div className="image w-full h-[280px] sm:h-[300px] md:h-[500px] lg:h-[650px] relative">
              <img
                src="https://res.cloudinary.com/dckm6ymoh/image/upload/v1744123528/2024-Icons-BG-2x2-Onfig-T3_yk76ta.webp"
                alt=""
                className="w-full h-full object-cover object-top"
              />
              <a
                href="#"
                className="text-center underline text-white absolute bottom-0 left-1/2 -translate-x-1/2 montserrat   border-white mb-3 mb-md-5 text-sm"
              >
                SHOP DIAMOND EMBELLISHED TIMEPIECES
              </a>
            </div>
          </div>
          <div className="col-12 d-flex mt-2">
            <div className="col-6">
              <div className="image w-full pe-1">
                <a href="">
                  <img
                    src="https://res.cloudinary.com/dckm6ymoh/image/upload/v1744123519/elsa-perettipearls-by-the-yard-necklace-60763992_1045503_ED_rgcylm.webp"
                    className="object-cover w-full h-[600px]"
                    alt=""
                  />
                </a>
                <p className="text-center mt-4">
                  <a
                    href="#"
                    className="text-center uppercase montserrat text-sm text-gray-900 font-medium  border-gray-800"
                  >
                    SHOP VINTAGE & LEGACY TIMEPIECES
                  </a>
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className="image w-full ps-1 ">
                <a href="#">
                  <img
                    src="https://res.cloudinary.com/dckm6ymoh/image/upload/v1744123510/ziegfeld-collectionpearl-wrap-necklace-32803563_1051850_ED_1_sgzerd.jpg"
                    alt=""
                    className="object-cover w-full h-[600px]"
                  />
                </a>
                <p className="text-center mt-4">
                  <a
                    href="#"
                    className="text-center uppercase montserrat text-sm text-gray-900 font-medium  border-gray-800"
                  >
                    SHOP PRE-OWNED AUDEMARS PIGUET
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 4 */}
      <div className="bestsellers-container">
        <h2 className="uppercase crimson text-5xl tracking-widest font-semibold text-white my-16">
          Bestsellers
        </h2>
        <div className="row justify-center">
          {bestsellers.map((item) => (
            <div className="col-12 col-md-6 col-lg-4 my-2 my-lg-0">
              <div key={item.id} className="bestseller-card">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="bestseller-image"
                />
                <div className="bestseller-title">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
