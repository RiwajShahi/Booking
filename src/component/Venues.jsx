import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Star, X, Phone, Mail, Check, Heart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bhaktapur from '../assets/images/bhaktapur.jpg';

const Venues = () => {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    guests: '',
    paymentMethod: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const navigate = useNavigate();

  const toggleFavorite = (venueId) => {
    setFavorites(prev => 
      prev.includes(venueId) 
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors
    if (bookingError) setBookingError('');
    if (paymentError) setPaymentError('');
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');
    setPaymentError('');
    setIsSubmitting(true);

    try {
      // Validate booking data
      if (!bookingData.date || !bookingData.startTime || !bookingData.endTime || !bookingData.guests) {
        throw new Error('Please fill in all required fields');
      }

      // Validate date is not in the past
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        throw new Error('Please select a future date');
      }

      // Validate time range
      const start = new Date(`2000-01-01T${bookingData.startTime}`);
      const end = new Date(`2000-01-01T${bookingData.endTime}`);
      
      if (end <= start) {
        throw new Error('End time must be after start time');
      }

      // Validate guest count
      if (parseInt(bookingData.guests) > selectedVenue.capacity) {
        throw new Error(`Maximum capacity is ${selectedVenue.capacity} guests`);
      }

      if (!showPayment) {
        setShowPayment(true);
        setIsSubmitting(false);
        return;
      }

      // Validate payment method
      if (!bookingData.paymentMethod) {
        throw new Error('Please select a payment method');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dispatch notification event
      const bookingEvent = new CustomEvent('venueBooked', {
        detail: {
          venue: selectedVenue.name,
          date: bookingData.date,
          time: `${bookingData.startTime} - ${bookingData.endTime}`
        }
      });
      window.dispatchEvent(bookingEvent);
      
      setBookingSuccess(true);
      setBookingData({
        date: '',
        startTime: '',
        endTime: '',
        guests: '',
        paymentMethod: ''
      });
      setShowPayment(false);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setBookingSuccess(false);
      }, 3000);

    } catch (error) {
      if (error.message.includes('payment')) {
        setPaymentError(error.message);
      } else {
        setBookingError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const venues = [
    {
      id: 1,
      name: "Grand Ballroom",
      location: "Kathmandu",
      rating: 4.8,
      capacity: 500,
      price: "Rs. 50,000",
      image: bhaktapur,
      description: "Elegant venue perfect for large gatherings and celebrations."
    },
    {
      id: 2,
      name: "Garden Pavilion",
      location: "Pokhara",
      rating: 4.9,
      capacity: 300,
      price: "Rs. 35,000",
      image: "/images/venue2.jpg",
      description: "Beautiful outdoor venue with stunning mountain views."
    },
    {
      id: 3,
      name: "Skyline Terrace",
      location: "Bhaktapur",
      rating: 4.7,
      capacity: 200,
      price: "Rs. 25,000",
      image: "/images/venue3.jpg",
      description: "Modern rooftop venue with panoramic city views."
    }
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Featured Venues
          </h2>
          <p className="text-lg text-white">Discover our most popular venues</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-[#2d3450] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-teal-700/40 cursor-pointer"
              onClick={() => navigate(`/venues/${venue.id}`)}
            >
              <div className="relative h-48">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute top-4 right-4 bg-[#232946]/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-white">{venue.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{venue.name}</h3>
                <p className="text-gray-300 mb-4">{venue.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{venue.location}</span>
                  </div>
                  <p className="text-xl font-bold text-teal-400">{venue.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Venue Details Overlay */}
        <AnimatePresence>
          {selectedVenue && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVenue(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedVenue.image}
                    alt={selectedVenue.name}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  <button
                    onClick={() => setSelectedVenue(null)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(selectedVenue.id);
                    }}
                    className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        favorites.includes(selectedVenue.id)
                          ? 'text-red-500 fill-red-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedVenue.name}</h2>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                        <span>{selectedVenue.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-teal-600">${selectedVenue.price}/hour</div>
                      <div className="flex items-center justify-end text-gray-600">
                        <Star className="w-5 h-5 mr-1 text-yellow-400" />
                        <span>{selectedVenue.rating} Rating</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8">{selectedVenue.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                      <div className="space-y-3">
                        {selectedVenue.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 mr-2 text-teal-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-5 h-5 mr-2 text-teal-600" />
                          <span>{selectedVenue.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-5 h-5 mr-2 text-teal-600" />
                          <span>{selectedVenue.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-5 h-5 mr-2 text-teal-600" />
                          <span>Capacity: {selectedVenue.capacity} people</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      {bookingError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                          {bookingError}
                        </div>
                      )}
                      {paymentError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                          {paymentError}
                        </div>
                      )}
                      {bookingSuccess && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                          Venue reserved successfully!
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            name="date"
                            value={bookingData.date}
                            onChange={handleBookingChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                          <input
                            type="number"
                            name="guests"
                            value={bookingData.guests}
                            onChange={handleBookingChange}
                            min="1"
                            max={selectedVenue.capacity}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      </div>


                      {showPayment && (
                        <div className="space-y-4 pt-4 border-t">
                          <h4 className="font-semibold text-gray-900">Payment Method</h4>
                          <div className="space-y-3">
                            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="esewa"
                                checked={bookingData.paymentMethod === 'esewa'}
                                onChange={handleBookingChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                              />
                              <div className="flex items-center space-x-2">
                                <img src="/images/esewa.png" alt="eSewa" className="h-6" />
                                <span className="text-gray-700">eSewa</span>
                              </div>
                            </label>

                            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="khalti"
                                checked={bookingData.paymentMethod === 'khalti'}
                                onChange={handleBookingChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                              />
                              <div className="flex items-center space-x-2">
                                <img src="/images/khalti.png" alt="Khalti" className="h-6" />
                                <span className="text-gray-700">Khalti</span>
                              </div>
                            </label>

                            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="connectips"
                                checked={bookingData.paymentMethod === 'connectips'}
                                onChange={handleBookingChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                              />
                              <div className="flex items-center space-x-2">
                                <img src="/images/connectips.png" alt="ConnectIPS" className="h-6" />
                                <span className="text-gray-700">ConnectIPS</span>
                              </div>
                            </label>

                            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={bookingData.paymentMethod === 'cash'}
                                onChange={handleBookingChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                              />
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-700">Cash on Arrival</span>
                              </div>
                            </label>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">Venue Price</span>
                              <span className="font-medium">Rs. {selectedVenue.price}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">Service Charge</span>
                              <span className="font-medium">Rs. {(selectedVenue.price * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-semibold">
                                <span>Total Amount</span>
                                <span>Rs. {(selectedVenue.price * 1.1).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : showPayment ? (
                          'Complete Reservation'
                        ) : (
                          'Reserve Now'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Venues; 