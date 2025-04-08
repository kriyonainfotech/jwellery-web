import { useState } from "react";
import { motion } from "framer-motion";

const BrandPhilosophy = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* Image Column (60%) */}
      <motion.div
        className="relative lg:w-[60%] h-[50vh] lg:h-auto"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          {/* Blur placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 filter blur-xl z-10" />
          )}

          {/* Standard image with onLoad trigger */}
          <img
            src="https://res.cloudinary.com/dckm6ymoh/image/upload/v1744111884/2025_HW_HP_FWMH_Desktop_1_dgnahn.webp"
            alt="Jewelry craftsmanship"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-left absolute inset-0 transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </motion.div>

      {/* Text Column (40%) */}
      <motion.div
        className="lg:w-[40%] bg-black p-8 lg:p-16 flex items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="text-white">
          <h2 className="font-crimson text-3xl lg:text-4xl mb-6">
            The Art of Meaningful Adornment
          </h2>

          <div className="space-y-4 font-montserrat lg:text-lg leading-relaxed">
            <p>
              We believe jewelry is not just decoration — it's{" "}
              <span className="italic">whispered poetry</span>
              between metal and skin.
            </p>

            <div className="w-24 h-px bg-gradient-to-r from-[#D4AF37] to-transparent my-8" />

            <p>
              Each piece begins as a sketch, transforms through ancestral
              techniques, and finds its soul when
              <span className="font-semibold"> worn by you</span>.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BrandPhilosophy;
