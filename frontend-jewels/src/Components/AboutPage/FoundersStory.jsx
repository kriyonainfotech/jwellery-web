import { motion } from "framer-motion";
import { useState } from "react";
// import founderSignature from "../assets/signature.png"; // Add your signature image

const FoundersStory = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="min-h-screen bg-white flex flex-col md:flex-row items-center p-8 md:p-16">
      {/* Founder's Portrait (Left Side) */}
      <motion.div
        className="relative w-full md:w-[40%] h-[400px] md:h-[600px]"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Blur placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 z-10 animate-pulse" />
        )}

        {/* Main Image */}
        <img
          src="https://res.cloudinary.com/dckm6ymoh/image/upload/v1744112495/satishsir_shjuyf.webp"
          alt="Founder portrait"
          className={`w-full h-full object-cover rounded-full border-4 border-black transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-[-10px]"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

      </motion.div>

      {/* Founder's Quote (Right Side) */}
      <motion.div
        className="md:w-[60%] mt-12 md:mt-0 md:pl-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="relative">
          {/* Handwritten-style quote */}
          <p className="font-crimson text-2xl md:text-3xl leading-relaxed italic text-black mb-8">
            "Jewelry is where geometry meets soul. We don't just create objects
            — we sculpt heirlooms that whisper stories across generations."
          </p>

          {/* Signature */}
          <div className="flex items-center gap-4">
            {/* <img
              src={founderSignature}
              alt="Founder's signature"
              className="h-12 md:h-16 opacity-90"
              loading="lazy"
            /> */}
            <div>
              <p className="font-montserrat font-bold text-black">
                Amelia Laurent
              </p>
              <p className="font-montserrat text-gray-600">
                Founder & Lead Designer
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 w-24 h-px bg-black/20" />
          <div className="absolute -bottom-8 -right-8 w-24 h-px bg-black/20" />
        </div>
      </motion.div>
    </section>
  );
};

export default FoundersStory;
