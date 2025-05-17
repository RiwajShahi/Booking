import React, { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import kathmandu from '../assets/images/kathmandu.jpg';
import pokhara from '../assets/images/pokhara.jpg';
import bhaktapur from '../assets/images/bhaktapur.jpg';



const PopularDestinations = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      id: 1,
      name: "Kathmandu Valley",
      location: "Kathmandu",
      description: "Experience the rich cultural heritage and ancient temples of the capital city.",
      image: kathmandu,
      rating: 4.8
    },
    {
      id: 2,
      name: "Pokhara Lakeside",
      location: "Pokhara",
      description: "Enjoy the serene beauty of Phewa Lake and the majestic Annapurna range.",
      image: pokhara,
      rating: 4.9
    },
    {
      id: 3,
      name: "Bhaktapur Durbar Square",
      location: "Bhaktapur",
      description: "Step back in time in this UNESCO World Heritage site with its medieval architecture.",
      image: bhaktapur,
      rating: 4.7
    }
  ];

  const handleExploreClick = (destination) => {
    setSelectedDestination(destination);
  };

  return (
    <section className="py-16 ">
      <div className="w-full">
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-white">Explore the most beautiful places in Nepal</p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group bg-[#2d3450] rounded-2xl shadow-lg border border-teal-700/40 overflow-hidden transition-all duration-300 relative hover:shadow-2xl hover:border-teal-400"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-[#232946] px-3 py-1 rounded-full shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-white font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-6 left-6 bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-sm font-semibold">{destination.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 mt-4">{destination.name}</h3>
                  <p className="text-gray-200 text-sm mb-6 line-clamp-2">{destination.description}</p>
                  <button
                    onClick={() => handleExploreClick(destination)}
                    className="flex items-center bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300"
                  >
                    <span className="font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Selection Modal */}
      {selectedDestination && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="bg-[#232946] rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#232946]"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">{selectedDestination.name}</h3>
              <p className="text-gray-200 mb-6">{selectedDestination.description}</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSelectedDestination(null);
                    navigate(`/venues?location=${selectedDestination.location}`);
                  }}
                  className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg transition-all duration-300"
                >
                  View Venues
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularDestinations; 