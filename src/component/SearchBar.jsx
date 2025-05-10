import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    guests: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Search */}
          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-teal-500 transition-colors duration-200" />
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              placeholder="Where do you want to go?"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:bg-white transition-colors duration-200"
            />
          </div>

          {/* Date Picker */}
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-teal-500 transition-colors duration-200" />
            <input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:bg-white transition-colors duration-200"
            />
          </div>

          {/* Guests */}
          <div className="relative group">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-teal-500 transition-colors duration-200" />
            <input
              type="number"
              name="guests"
              value={searchParams.guests}
              onChange={handleChange}
              placeholder="Number of guests"
              min="1"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:bg-white transition-colors duration-200"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-all duration-200 flex items-center space-x-2 group"
          >
            <Search className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Search Venues</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar; 