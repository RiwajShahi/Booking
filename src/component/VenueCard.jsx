import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/venues/${venue.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#2d3450] rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl border border-teal-700/40"
      onClick={handleClick}
    >
      <div className="relative aspect-[16/9]">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#232946]/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-white">{venue.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{venue.name}</h3>
        <div className="flex items-center text-gray-300 mb-4">
          <MapPin className="w-5 h-5 mr-2 text-teal-400" />
          <span className="text-gray-200">{venue.location}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-300">
            <Users className="w-5 h-5 mr-2 text-teal-400" />
            <span className="text-gray-200">Up to {venue.capacity} people</span>
          </div>
          <p className="text-xl font-bold text-teal-400">${venue.price}</p>
        </div>
        <div className="flex items-center text-gray-300 pt-4 border-t border-teal-700/40">
          <User className="w-5 h-5 mr-2 text-teal-400" />
          <span className="text-gray-200">Hosted by {venue.host?.name || 'Anonymous'}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VenueCard; 