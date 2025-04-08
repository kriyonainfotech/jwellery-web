import { motion } from "framer-motion";
import { useState } from "react";

const craftsmanshipItems = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dckm6ymoh/image/upload/v1744114189/ChatGPT_Image_Apr_8_2025_05_37_08_PM_rxb5qx.png",
    title: "Precision Cutting",
    keyword: "Exactitude",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dckm6ymoh/image/upload/v1744114361/ChatGPT_Image_Apr_8_2025_05_42_29_PM_w9qmmk.png",
    title: "Hand Engraving",
    keyword: "Artistry",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dckm6ymoh/image/upload/v1744115189/ChatGPT_Image_Apr_8_2025_05_56_17_PM_lskstt.png",
    title: "Stone Setting",
    keyword: "Patience",
  },
];

const Craftsmanship = () => {
  return (
    <section className="bg-white py-20 px-8 md:px-16">
      {/* Section Title */}
      <motion.h2
        className="crimson text-4xl md:text-5xl text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Alchemy of Craft
      </motion.h2>

      {/* Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {craftsmanshipItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Image Container - Simplified */}
            <div className="relative h-[400px] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Caption - Minimalist */}
            <div className="mt-4 text-center">
              <h3 className="crimson text-xl mb-2">{item.title}</h3>
              <div className="w-12 h-px bg-black mx-auto" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Craftsmanship;