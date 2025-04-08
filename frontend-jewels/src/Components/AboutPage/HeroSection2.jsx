import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "../Header";

const HeroSection2 = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Header isHomepage={true} />
    <section className="relative h-[700px] w-full overflow-hidden">
      {/* Background Video/Image with Blur */}
      <div className="absolute inset-0">
        {/* Video (optimized) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)} // Trigger when video loads
          poster="/placeholder-blur.jpg" // Low-res blurred placeholder
        >
          <source
            src="https://res.cloudinary.com/dckm6ymoh/video/upload/v1744110582/19259-300109084_small_c7slxh.mp4"
            type="video/webm"
          />
          <source
            src="https://res.cloudinary.com/dckm6ymoh/video/upload/v1744110582/19259-300109084_small_c7slxh.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback Image (if video fails) */}
        {!isLoaded && (
          <motion.img
            src="/placeholder-blur.jpg"
            alt="Loading jewelry"
            className="w-full h-full object-cover filter blur-xl"
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Tagline with Framer Motion */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="crimson text-4xl md:text-6xl lg:text-7xl text-center leading-tight mb-4">
          Our Vision of Beauty,
          <br />
          Worn by You
        </h1>
        <motion.button
          className="font-montserrat mt-8 px-8 py-3 border-2 border-white hover:bg-white hover:text-black transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Discover Collection
        </motion.button>
      </motion.div>
      </section>
      </>
  );
};

export default HeroSection2;
