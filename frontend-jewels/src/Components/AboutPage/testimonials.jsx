import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "The ring arrived as a whisper of elegance - exactly how jewelry should feel. It's become my silent signature.",
    author: "Élise Laurent",
    location: "Paris, FR",
    image:
      "https://res.cloudinary.com/dckm6ymoh/image/upload/v1744115297/2025_HW_2x2_TILE1_amlwsz.webp",
  },
  {
    id: 2,
    text: "Not just jewelry, but wearable art. The craftsmanship speaks before I do in any room.",
    author: "Amara Singh",
    location: "Mumbai, IN",
    image:
      "https://res.cloudinary.com/dckm6ymoh/image/upload/v1744115297/2025_HW_2x2_TILE1_amlwsz.webp",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-black py-20 px-8 md:px-16">
      {/* Section Title */}
      <motion.h2
        className="crimson text-4xl md:text-5xl text-center mb-16 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Voices of Elegance
      </motion.h2>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.3 }}
          >
            {/* Testimonial Card */}
            <div className="h-full flex flex-col">
              {/* Client Image */}
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>

              {/* Quote */}
              <div className="bg-white p-8 flex-1">
                <p className="font-montserrat text-lg italic mb-6">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-black pt-4">
                  <p className="crimson text-xl">{testimonial.author}</p>
                  <p className="font-montserrat text-gray-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;