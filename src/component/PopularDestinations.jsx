import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, ArrowRight, Building2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PopularDestinations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      name: "Kathmandu",
      location: "Central Nepal",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "The capital city of Nepal, known for its rich culture, ancient temples, and vibrant atmosphere.",
      venues: [
        { id: 1, name: "Grand Ballroom", count: 12 },
        { id: 2, name: "Skyline Terrace", count: 8 },
        { id: 3, name: "Central Park Pavilion", count: 5 }
      ]
    },
    {
      id: 2,
      name: "Pokhara",
      location: "Western Nepal",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1589394815804-9648d8d9021b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "A beautiful lakeside city with stunning views of the Annapurna mountain range.",
      venues: [
        { id: 4, name: "Lakeside Venue", count: 15 },
        { id: 5, name: "Mountain View Hall", count: 10 },
        { id: 6, name: "Garden Pavilion", count: 7 }
      ]
    },
    {
      id: 3,
      name: "Lumbini",
      location: "Southern Nepal",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "The birthplace of Lord Buddha, featuring ancient monasteries and peaceful gardens.",
      venues: [
        { id: 7, name: "Peace Garden", count: 9 },
        { id: 8, name: "Temple Hall", count: 6 },
        { id: 9, name: "Meditation Center", count: 4 }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleVenueClick = (destination, venue) => {
    navigate(`/venues?location=${encodeURIComponent(destination.name)}&venue=${encodeURIComponent(venue.name)}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-lg text-gray-600">Explore the most beautiful places in Nepal</p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: currentIndex === index ? 1.05 : 1,
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                    <span>{destination.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                  <button
                    onClick={() => handleExploreClick(destination)}
                    className="flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors duration-300"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-teal-600 w-4' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Venue Selection Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDestination(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Venues in {selectedDestination.name}
                  </h3>
                  <button
                    onClick={() => setSelectedDestination(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  {selectedDestination.venues.map((venue) => (
                    <button
                      key={venue.id}
                      onClick={() => handleVenueClick(selectedDestination, venue)}
                      className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Building2 className="w-5 h-5 text-teal-500" />
                        <span className="text-gray-900 font-medium">{venue.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{venue.count} venues</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PopularDestinations; 