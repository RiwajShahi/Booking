import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import VenueCard from './VenueCard';
import { useNavigate } from 'react-router-dom';

const VenuesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    guests: ''
  });

  // Sample venue data (replace with actual data from your backend)
  const venues = [
    {
      id: 1,
      name: 'Grand Ballroom',
      image: '/venue1.jpg',
      price: 5000,
      rating: 4.8,
      location: 'New York',
      capacity: 500
    },
    {
      id: 2,
      name: 'Skyline Terrace',
      image: '/venue2.jpg',
      price: 3500,
      rating: 4.6,
      location: 'Los Angeles',
      capacity: 300
    },
    {
      id: 3,
      name: 'Garden Pavilion',
      image: '/venue3.jpg',
      price: 2800,
      rating: 4.9,
      location: 'Miami',
      capacity: 200
    },
    {
      id: 4,
      name: 'Modern Loft',
      image: '/venue4.jpg',
      price: 4200,
      rating: 4.7,
      location: 'Chicago',
      capacity: 150
    },
    {
      id: 5,
      name: 'Riverside Hall',
      image: '/venue5.jpg',
      price: 3800,
      rating: 4.5,
      location: 'Boston',
      capacity: 250
    },
    {
      id: 6,
      name: 'City View Center',
      image: '/venue6.jpg',
      price: 4500,
      rating: 4.8,
      location: 'San Francisco',
      capacity: 400
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search params:', searchParams);
    // Handle search logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location Search */}
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-teal-500 transition-colors duration-200" />
                  <input
                    type="text"
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    placeholder="Number of guests"
                    min="1"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:bg-white transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex justify-end">
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
          </div>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VenueCard venue={venue} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenuesPage; 