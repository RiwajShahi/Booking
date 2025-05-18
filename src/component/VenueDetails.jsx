import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
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
  Clock,
  Check,
  MessageSquare,
} from "lucide-react";
import Reviews from "./Reviews";

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    guests: "",
    paymentMethod: "",
  });
  const [bookingError, setBookingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        setError("");

        // Get venues from localStorage
        const storedVenues = localStorage.getItem("venues");
        if (!storedVenues) {
          setError("No venues found.");
          setLoading(false);
          return;
        }

        const venues = JSON.parse(storedVenues);

        // Find the venue that matches the ID from the URL
        const foundVenue = venues.find((v) => v.id === parseInt(id)); // Assuming ID is a number

        if (foundVenue) {
          // Construct the location string
          const locationString = `${foundVenue.address}, ${foundVenue.city}, ${foundVenue.state} ${foundVenue.zipCode}`;

          // Prepare venue data, excluding fields not available in localStorage
          const venueData = {
            ...foundVenue,
            location: locationString,
            // Exclude rating, reviews, and detailed contact (phone, email) for now
            // In a real app, fetch these from backend if needed
            rating: null, // Set to null or a default value
            reviews: null, // Set to null or a default value
            contact: {
              // Provide minimal contact info if hostName is available
              hostId: foundVenue.hostId,
              hostName: foundVenue.hostName,
              phone: null, // Not stored in localStorage
              email: null, // Not stored in localStorage
            },
          };

          setVenue(venueData);
        } else {
          setError(`Venue with ID ${id} not found.`);
        }
      } catch (err) {
        setError("Failed to load venue details. Please try again later.");
        console.error("Error fetching venue:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showFullGallery) {
        setShowFullGallery(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showFullGallery]);

  const nextImage = () => {
    if (venue) {
      setCurrentImageIndex((prev) => (prev + 1) % venue.images.length);
    }
  };

  const prevImage = () => {
    if (venue) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + venue.images.length) % venue.images.length
      );
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowFullGallery(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");
    setPaymentError("");
    setIsSubmitting(true);

    try {
      // Check if user is authenticated
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { state: { from: `/venues/${id}` } });
        return;
      }

      // Validate booking data
      if (!bookingData.date || !bookingData.guests) {
        throw new Error("Please fill in all required fields");
      }

      // Validate date is not in the past
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        throw new Error("Please select a future date");
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
        throw new Error("Please select a payment method");
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBookingSuccess(true);
      setBookingData({
        date: "",
        guests: "",
        paymentMethod: "",
      });
      setShowPayment(false);

      // Dispatch custom event for notification
      window.dispatchEvent(
        new CustomEvent("venueBooked", {
          detail: {
            venue: venue.name,
            date: bookingData.date,
          },
        })
      );

      // Reset success message after 3 seconds
      setTimeout(() => {
        setBookingSuccess(false);
      }, 3000);
    } catch (error) {
      if (error.message.includes("payment")) {
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
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user makes changes
    if (bookingError) {
      setBookingError("");
    }
  };

  const handleImageError = (index) => {
    setImageError((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleMessageHost = () => {
    // In a real application, you would determine the conversation ID here.
    // This might involve checking if a conversation already exists between the current user and the host,
    // or creating a new one. The conversation ID could be based on the user IDs and the venue ID.
    const mockConversationId = `venue_${venue.id}_user_${
      localStorage.getItem("userId") || "guest"
    }`;

    // Navigate to the user's chat window for this conversation
    navigate(`/user/messages/${mockConversationId}`);
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
    <div className="min-h-screen bg-[#232946]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#2d3450] border-b border-teal-700/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#232946] rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-[#232946] rounded-full transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"
                }`}
              />
            </button>
            <button className="p-2 hover:bg-[#232946] rounded-full transition-colors">
              <Share2 className="w-6 h-6 text-gray-300" />
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
                    index === currentImageIndex ? "ring-2 ring-teal-500" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={imageError[index] ? "/images/placeholder.jpg" : image}
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
                      <p className="text-sm opacity-90">
                        {venue.images.length} Photos
                      </p>
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#2d3450] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={venue.images[currentImageIndex]}
                  alt={venue.name}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setShowFullGallery(false)}
                  className="absolute top-4 right-4 bg-[#232946]/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#232946] transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFavorite(!isFavorite);
                  }}
                  className="absolute top-4 left-4 p-2 bg-[#232946]/90 backdrop-blur-sm rounded-full hover:bg-[#232946] transition-colors duration-200"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {venue.name}
                    </h2>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-5 h-5 mr-2 text-teal-400" />
                      <span>{venue.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-400">
                      ${venue.price}/hour
                    </div>
                    <div className="flex items-center justify-end text-gray-300">
                      <Star className="w-5 h-5 mr-1 text-yellow-400" />
                      <span>{venue.rating} Rating</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-8">{venue.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Features
                    </h3>
                    <div className="space-y-3">
                      {venue.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-300"
                        >
                          <Check className="w-5 h-5 mr-2 text-teal-400" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <Phone className="w-5 h-5 mr-2 text-teal-400" />
                        <span>{venue.contact.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Mail className="w-5 h-5 mr-2 text-teal-400" />
                        <span>{venue.contact.email}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="w-5 h-5 mr-2 text-teal-400" />
                        <span>Capacity: {venue.capacity} people</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {bookingError && (
                      <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                        {bookingError}
                      </div>
                    )}
                    {paymentError && (
                      <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                        {paymentError}
                      </div>
                    )}
                    {bookingSuccess && (
                      <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg">
                        Venue reserved successfully!
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleBookingChange}
                          min={new Date().toISOString().split("T")[0]}
                          required
                          className="w-full px-4 py-2 bg-[#232946] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Number of Guests
                        </label>
                        <input
                          type="number"
                          name="guests"
                          value={bookingData.guests}
                          onChange={handleBookingChange}
                          min="1"
                          max={venue.capacity}
                          required
                          className="w-full px-4 py-2 bg-[#232946] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {showPayment && (
                      <div className="space-y-4 pt-4 border-t border-gray-700">
                        <h4 className="font-semibold text-white">
                          Payment Method
                        </h4>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-[#232946]">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="esewa"
                              checked={bookingData.paymentMethod === "esewa"}
                              onChange={handleBookingChange}
                              className="h-4 w-4 text-teal-400 focus:ring-teal-500"
                            />
                            <div className="flex items-center space-x-2">
                              <img
                                src="/images/esewa.png"
                                alt="eSewa"
                                className="h-6"
                              />
                              <span className="text-gray-300">eSewa</span>
                            </div>
                          </label>

                          <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-[#232946]">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="khalti"
                              checked={bookingData.paymentMethod === "khalti"}
                              onChange={handleBookingChange}
                              className="h-4 w-4 text-teal-400 focus:ring-teal-500"
                            />
                            <div className="flex items-center space-x-2">
                              <img
                                src="/images/khalti.png"
                                alt="Khalti"
                                className="h-6"
                              />
                              <span className="text-gray-300">Khalti</span>
                            </div>
                          </label>

                          <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-[#232946]">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="connectips"
                              checked={
                                bookingData.paymentMethod === "connectips"
                              }
                              onChange={handleBookingChange}
                              className="h-4 w-4 text-teal-400 focus:ring-teal-500"
                            />
                            <div className="flex items-center space-x-2">
                              <img
                                src="/images/connectips.png"
                                alt="ConnectIPS"
                                className="h-6"
                              />
                              <span className="text-gray-300">ConnectIPS</span>
                            </div>
                          </label>

                          <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-[#232946]">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cash"
                              checked={bookingData.paymentMethod === "cash"}
                              onChange={handleBookingChange}
                              className="h-4 w-4 text-teal-400 focus:ring-teal-500"
                            />
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-300">
                                Cash on Arrival
                              </span>
                            </div>
                          </label>
                        </div>

                        <div className="bg-[#232946] p-4 rounded-lg border border-gray-700">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-300">Venue Price</span>
                            <span className="font-medium text-white">
                              {venue.price}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-300">
                              Service Charge
                            </span>
                            <span className="font-medium text-white">
                              {(venue.price * 0.1).toFixed(2)}
                            </span>
                          </div>
                          <div className="border-t border-gray-700 pt-2 mt-2">
                            <div className="flex justify-between font-semibold text-white">
                              <span>Total Amount</span>
                              <span>{(venue.price * 1.1).toFixed(2)}</span>
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
                        "Complete Reservation"
                      ) : (
                        "Reserve Now"
                      )}
                    </button>
                  </form>
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
                <h1 className="text-3xl font-bold text-white mb-2">
                  {venue.name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1">{venue.rating}</span>
                    <span className="mx-1">·</span>
                    <span>{venue.reviews} reviews</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-teal-400" />
                    <span className="ml-1">{venue.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-teal-400">
                  {venue.price}
                </p>
                <p className="text-gray-300">per event</p>
              </div>
            </div>

            <div className="border-t border-b border-gray-700 py-8 my-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-teal-400" />
                  <div>
                    <p className="text-sm text-gray-300">Capacity</p>
                    <p className="font-semibold text-white">
                      {venue.capacity} people
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-teal-400" />
                  <div>
                    <p className="text-sm text-gray-300">Available Dates</p>
                    <p className="font-semibold text-white">
                      {venue.availableDates.length} dates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                About this venue
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {venue.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {venue.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {feature === "WiFi" ? (
                      <Wifi className="w-6 h-6 text-teal-400" />
                    ) : (
                      <Music className="w-6 h-6 text-teal-400" />
                    )}
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-6 h-6 text-teal-400" />
                  <span className="text-gray-300">{venue.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-6 h-6 text-teal-400" />
                  <span className="text-gray-300">{venue.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Message Host Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMessageHost}
              className="mt-4 px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold shadow-lg hover:bg-sky-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Message Host</span>
            </motion.button>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#2d3450] rounded-2xl border border-teal-700/40 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Book this venue
              </h3>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {bookingError && (
                  <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                    {bookingError}
                  </div>
                )}
                {paymentError && (
                  <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                    {paymentError}
                  </div>
                )}
                {bookingSuccess && (
                  <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg">
                    Venue reserved successfully!
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleBookingChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full px-4 py-2 bg-[#232946] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleBookingChange}
                    min="1"
                    max={venue.capacity}
                    required
                    className="w-full px-4 py-2 bg-[#232946] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Maximum capacity: {venue.capacity} guests
                  </p>
                </div>

                {showPayment && (
                  <div className="space-y-4 pt-4 border-t border-gray-700">
                    <h4 className="font-semibold text-white">Payment Method</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-[#232946]">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="connectips"
                          checked={bookingData.paymentMethod === "connectips"}
                          onChange={handleBookingChange}
                          className="h-4 w-4 text-teal-400 focus:ring-teal-500"
                        />
                        <div className="flex items-center space-x-2">
                          <img
                            src="/images/connectips.png"
                            alt="ConnectIPS"
                            className="h-6"
                          />
                          <span className="text-gray-300">ConnectIPS</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-[#232946]">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={bookingData.paymentMethod === "cash"}
                          onChange={handleBookingChange}
                          className="h-4 w-4 text-teal-400 focus:ring-teal-500"
                        />
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">Cash on Arrival</span>
                        </div>
                      </label>
                    </div>

                    <div className="bg-[#232946] p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Venue Price</span>
                        <span className="font-medium text-white">
                          {venue.price}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Service Charge</span>
                        <span className="font-medium text-white">
                          {(venue.price * 0.1).toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="flex justify-between font-semibold text-white">
                          <span>Total Amount</span>
                          <span>{(venue.price * 1.1).toFixed(2)}</span>
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
                    "Complete Reservation"
                  ) : (
                    "Reserve Now"
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
