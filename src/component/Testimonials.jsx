import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Wedding Planner",
      image: "/images/testimonial1.jpg",
      rating: 5,
      text: "The venue booking process was incredibly smooth and professional. The team went above and beyond to make our event special."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Corporate Event Organizer",
      image: "/images/testimonial2.jpg",
      rating: 5,
      text: "Excellent service and beautiful venues. The platform made it easy to find and book the perfect space for our corporate event."
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Birthday Party Host",
      image: "/images/testimonial3.jpg",
      rating: 5,
      text: "Found the perfect venue for my daughter's birthday party. The booking process was simple and the venue was exactly as described."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-white">Read experiences from our satisfied customers</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-[#2d3450] rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-teal-700/40"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  loading="eager"
                />
                <div>
                  <h3 className="font-semibold text-white text-xl">{testimonials[currentIndex].name}</h3>
                  <p className="text-sm text-gray-300">{testimonials[currentIndex].role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-200 text-lg leading-relaxed">{testimonials[currentIndex].text}</p>
            </motion.div>
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-teal-400 w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 