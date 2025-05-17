import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar';
import Footer from './Footer';

const VenuesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [allVenues, setAllVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    guests: ''
  });

  useEffect(() => {
    // Load venues from localStorage
    const loadVenues = () => {
      try {
        // Get venues from localStorage
        const storedVenues = localStorage.getItem('venues');
        console.log('Raw venues from localStorage:', storedVenues);

        if (!storedVenues) {
          console.log('No venues found in localStorage');
          setAllVenues([]);
          setFilteredVenues([]);
          return;
        }

        // Parse the venues
        const parsedVenues = JSON.parse(storedVenues);
        console.log('Parsed venues:', parsedVenues);

        // Ensure we have valid venue data
        const validVenues = parsedVenues.filter(venue => {
          const isValid = venue && 
            venue.id && 
            venue.name && 
            venue.description && 
            venue.city && 
            venue.state;
          
          if (!isValid) {
            console.log('Invalid venue found:', venue);
          }
          
          return isValid;
        });

        console.log('Valid venues:', validVenues);
        
        setAllVenues(validVenues);
        setFilteredVenues(validVenues);
      } catch (error) {
        console.error('Error loading venues:', error);
        setAllVenues([]);
        setFilteredVenues([]);
      }
    };

    loadVenues();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter venues based on search parameters
    const filtered = allVenues.filter(venue => {
      const locationMatch = venue.city.toLowerCase().includes(searchParams.location.toLowerCase()) ||
                          venue.state.toLowerCase().includes(searchParams.location.toLowerCase());
      const capacityMatch = !searchParams.guests || venue.capacity >= parseInt(searchParams.guests);
      return locationMatch && capacityMatch;
    });
    console.log('Filtered venues:', filtered);
    setFilteredVenues(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#232946]">
      <NavBar />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="rounded-2xl shadow-lg p-6 bg-[#2d3450] border border-teal-700/40">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Location Search */}
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-teal-400 transition-colors duration-200" />
                    <input
                      type="text"
                      name="location"
                      value={searchParams.location}
                      onChange={handleInputChange}
                      placeholder="Where do you want to go?"
                      className="w-full pl-10 pr-4 py-3 bg-[#232946] border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:bg-[#1f2544] transition-colors duration-200 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Date Picker */}
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-teal-400 transition-colors duration-200" />
                    <input
                      type="date"
                      name="date"
                      value={searchParams.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#232946] border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:bg-[#1f2544] transition-colors duration-200 text-white"
                    />
                  </div>

                  {/* Guests */}
                  <div className="relative group">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-teal-400 transition-colors duration-200" />
                    <input
                      type="number"
                      name="guests"
                      value={searchParams.guests}
                      onChange={handleInputChange}
                      placeholder="Number of guests"
                      min="1"
                      className="w-full pl-10 pr-4 py-3 bg-[#232946] border border-gray-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:bg-[#1f2544] transition-colors duration-200 text-white placeholder-gray-400"
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
                    <span className="text-white font-medium">Search Venues</span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Venues Grid */}
          {filteredVenues.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg">No venues available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#2d3450] rounded-2xl overflow-hidden shadow-lg border border-teal-700/40"
                >
                  {venue.images && venue.images.length > 0 && (
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={venue.images[0]}
                        alt={venue.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{venue.name}</h3>
                    <p className="text-gray-300 mb-4">{venue.description}</p>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-teal-400">Location:</span> {venue.city}, {venue.state}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-teal-400">Price:</span> ${venue.price}/night
                      </p>
                      <p className="text-gray-300">
                        <span className="text-teal-400">Capacity:</span> {venue.capacity} people
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-teal-400 font-medium mb-2">Amenities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {venue.amenities && venue.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-1 bg-teal-900/50 text-teal-300 rounded-full text-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VenuesPage; 