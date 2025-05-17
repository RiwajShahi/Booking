import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import hero from '../assets/images/hero.jpg'; 
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/venues');
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center" 
         style={{ backgroundImage: `url(${hero})` }}>
      

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your Perfect Venue
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Discover and book amazing venues for your next event. From intimate gatherings to grand celebrations.
          </p>

          {/* Book Now Button */}
          <motion.button
            onClick={handleBookNow}
            
            className="bg-red-500 animate-bounce text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-800 transition-colors duration-200 flex items-center space-x-2 mx-auto group"
          >
            <span>Book Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <p className="text-gray-200 mb-2">Popular Searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Pokhara', 'Kathmandu', 'Chitwan', 'Lumbini'].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;