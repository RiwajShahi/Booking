import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Star, X, Phone, Mail, Check, Heart } from 'lucide-react';

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
      location: "Kathmandu, Nepal",
      price: 150,
      rating: 4.8,
      capacity: 500,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      description: "A luxurious ballroom perfect for large events, weddings, and corporate gatherings. Features state-of-the-art lighting and sound systems.",
      features: ["Professional Sound System", "LED Lighting", "Catering Kitchen", "Parking Space", "WiFi", "Air Conditioning"],
      phone: "+977 1234567890",
      email: "info@grandballroom.com"
    },
    {
      id: 2,
      name: "Garden Pavilion",
      location: "Lalitpur, Nepal",
      price: 100,
      rating: 4.6,
      capacity: 200,
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "An elegant outdoor venue surrounded by beautiful gardens, perfect for intimate gatherings and outdoor events.",
      features: ["Garden Setting", "Outdoor Catering", "Tent Options", "Parking", "Restrooms", "Power Supply"],
      phone: "+977 1234567891",
      email: "info@gardenpavilion.com"
    },
    {
      id: 3,
      name: "Modern Conference Hall",
      location: "Bhaktapur, Nepal",
      price: 120,
      rating: 4.7,
      capacity: 300,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      description: "A contemporary conference hall equipped with modern technology, ideal for business meetings and presentations.",
      features: ["Projector", "Video Conferencing", "High-Speed WiFi", "Catering Service", "Parking", "Air Conditioning"],
      phone: "+977 1234567892",
      email: "info@modernconference.com"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Venues</h2>
          <p className="text-lg text-gray-600">Discover our handpicked selection of premium venues</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => setSelectedVenue(venue)}
            >
              <div className="relative h-64">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-teal-600 font-semibold">${venue.price}/hour</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(venue.id);
                  }}
                  className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites.includes(venue.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2 text-teal-600" />
                    <span>Capacity: {venue.capacity} people</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>{venue.rating} Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
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

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                          <input
                            type="time"
                            name="startTime"
                            value={bookingData.startTime}
                            onChange={handleBookingChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                          <input
                            type="time"
                            name="endTime"
                            value={bookingData.endTime}
                            onChange={handleBookingChange}
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