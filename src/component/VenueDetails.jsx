import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  Users, 
  Calendar, 
  Wifi, 
  Music, 
  Phone, 
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  Clock
} from 'lucide-react';
import Reviews from './Reviews';

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    guests: '',
    paymentMethod: ''
  });
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        setError('');
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock venue data
        setVenue({
          id: 1,
          name: 'Grand Ballroom',
          rating: 4.8,
          reviews: 156,
          location: '123 Main Street, City',
          price: 2500,
          capacity: 300,
          availableDates: ['2024-04-01', '2024-04-15', '2024-05-01'],
          description: 'A stunning venue perfect for weddings, corporate events, and special occasions. Features include a grand entrance, high ceilings, and state-of-the-art facilities.',
          features: ['WiFi', 'Parking', 'Catering', 'Audio/Visual', 'Outdoor Space'],
          contact: {
            phone: '+1 (555) 123-4567',
            email: 'info@grandballroom.com'
          },
          images: [
            '/images/venue1.jpg',
            '/images/venue2.jpg',
            '/images/venue3.jpg',
            '/images/venue4.jpg',
            '/images/venue5.jpg'
          ]
        });
      } catch (err) {
        setError('Failed to load venue details. Please try again later.');
        console.error('Error fetching venue:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showFullGallery) {
        setShowFullGallery(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showFullGallery]);

  const nextImage = () => {
    if (venue) {
      setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
    }
  };

  const prevImage = () => {
    if (venue) {
      setCurrentImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowFullGallery(true);
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
      if (parseInt(bookingData.guests) > venue.capacity) {
        throw new Error(`Maximum capacity is ${venue.capacity} guests`);
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

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user makes changes
    if (bookingError) {
      setBookingError('');
    }
  };

  const handleImageError = (index) => {
    setImageError(prev => ({
      ...prev,
      [index]: true
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!venue) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-12">
          <div className="grid grid-cols-3 gap-4">
            {/* First 3 Images */}
            {venue.images.slice(0, 3).map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md ${
                    index === currentImageIndex ? 'ring-2 ring-teal-500' : ''
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <img 
                    src={imageError[index] ? '/images/placeholder.jpg' : image} 
                    alt={`${venue.name} - Image ${index + 1}`}
                    onError={() => handleImageError(index)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 text-white text-xs">
                      View Image {index + 1}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* See More Button */}
            {venue.images.length > 3 && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md bg-gray-100"
                  onClick={() => setShowFullGallery(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/80 to-teal-600/80 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-lg font-semibold mb-1">View All</p>
                      <p className="text-sm opacity-90">{venue.images.length} Photos</p>
                      <div className="mt-2 p-2 bg-white/20 rounded-full inline-block">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Full Gallery Modal */}
        <AnimatePresence>
          {showFullGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowFullGallery(false);
                }
              }}
            >
              <div className="relative w-full max-w-7xl">
                <button
                  onClick={() => setShowFullGallery(false)}
                  className="absolute -top-16 right-0 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white flex items-center space-x-2"
                >
                  <X className="w-6 h-6" />
                  <span className="text-sm">Close Gallery</span>
                </button>
                
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={imageError[currentImageIndex] ? '/images/placeholder.jpg' : venue.images[currentImageIndex]} 
                    alt={venue.name}
                    onError={() => handleImageError(currentImageIndex)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <button 
                      onClick={prevImage}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                    Image {currentImageIndex + 1} of {venue.images.length}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                  {venue.images.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer ${
                        index === currentImageIndex ? 'ring-2 ring-teal-500' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={imageError[index] ? '/images/placeholder.jpg' : image} 
                        alt={`${venue.name} - Image ${index + 1}`}
                        onError={() => handleImageError(index)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 left-2 text-white text-xs">
                          Image {index + 1}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Venue Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{venue.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1">{venue.rating}</span>
                    <span className="mx-1">·</span>
                    <span>{venue.reviews} reviews</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5" />
                    <span className="ml-1">{venue.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">${venue.price}</p>
                <p className="text-gray-600">per event</p>
              </div>
            </div>

            <div className="border-t border-b py-8 my-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold">{venue.capacity} people</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Available Dates</p>
                    <p className="font-semibold">{venue.availableDates.length} dates</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this venue</h2>
              <p className="text-gray-600 leading-relaxed">{venue.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {venue.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {feature === 'WiFi' ? (
                      <Wifi className="w-6 h-6 text-gray-600" />
                    ) : (
                      <Music className="w-6 h-6 text-gray-600" />
                    )}
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-600">{venue.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-6 h-6 text-gray-600" />
                  <span className="text-gray-600">{venue.contact.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book this venue</h3>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleBookingChange}
                    min="1"
                    max={venue.capacity}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Maximum capacity: {venue.capacity} guests
                  </p>
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
                        <span className="font-medium">Rs. {venue.price}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Service Charge</span>
                        <span className="font-medium">Rs. {(venue.price * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total Amount</span>
                          <span>Rs. {(venue.price * 1.1).toFixed(2)}</span>
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
        </div>
      </div>
    </div>
  );
};

export default VenueDetails; 