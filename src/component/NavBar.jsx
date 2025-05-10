import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown, Bell, Loader2, Check, Clock, MapPin, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock notifications data - replace with actual data from your backend
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your booking for Grand Ballroom has been confirmed",
      time: "2 hours ago",
      read: false,
      type: "booking"
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "Payment for Garden Pavilion has been processed",
      time: "1 day ago",
      read: true,
      type: "payment"
    },
    {
      id: 3,
      title: "New Review",
      message: "You received a new 5-star review",
      time: "2 days ago",
      read: true,
      type: "review"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Listen for custom events from venue bookings
  useEffect(() => {
    const handleBookingNotification = (event) => {
      const { venue, date, time } = event.detail;
      const newNotification = {
        id: Date.now(),
        title: "Venue Booked",
        message: `Your booking for ${venue} on ${date} at ${time} has been confirmed`,
        time: "Just now",
        read: false,
        type: "booking"
      };
      setNotifications(prev => [newNotification, ...prev]);
    };

    window.addEventListener('venueBooked', handleBookingNotification);
    return () => {
      window.removeEventListener('venueBooked', handleBookingNotification);
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setIsNotificationOpen(false);
  };

  // Mock popular destinations data
  const popularDestinations = [
    {
      id: 1,
      city: "New York",
      venues: [
        { id: 1, name: "Grand Ballroom", count: 12 },
        { id: 2, name: "Skyline Terrace", count: 8 },
        { id: 3, name: "Central Park Pavilion", count: 5 }
      ]
    },
    {
      id: 2,
      city: "Los Angeles",
      venues: [
        { id: 4, name: "Hollywood Hills", count: 15 },
        { id: 5, name: "Beachside Venue", count: 10 },
        { id: 6, name: "Downtown LA Hall", count: 7 }
      ]
    },
    {
      id: 3,
      city: "Chicago",
      venues: [
        { id: 7, name: "Lakefront Center", count: 9 },
        { id: 8, name: "Magnificent Mile", count: 6 },
        { id: 9, name: "Millennium Park", count: 4 }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setIsProfileOpen(false);
    } finally {
      // Add a small delay to show the loading animation
      setTimeout(() => {
        setIsLoggingOut(false);
      }, 500);
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3"
            onClick={scrollToTop}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-white">V</span>
            </motion.div>
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
            >
              VenueHub
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link
              to="/venues" 
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200"
            >
              Venues
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Notification Button */}
            <div className="relative">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200 relative"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </motion.button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 border border-gray-100"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {notifications.length > 0 && (
                        <div className="flex space-x-2">
                          <button
                            onClick={markAllAsRead}
                            className="text-sm text-teal-600 hover:text-teal-700"
                          >
                            Mark all as read
                          </button>
                          <button
                            onClick={clearAllNotifications}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Clear all
            </button>
                        </div>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                              !notification.read ? 'bg-teal-50' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.read ? 'bg-gray-300' : 'bg-teal-500'
                                }`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {notification.message}
                                </p>
                                <div className="flex items-center mt-1 text-xs text-gray-400">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {notification.time}
                                </div>
                              </div>
                              {!notification.read && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex-shrink-0"
                                >
                                  <Check className="w-4 h-4 text-teal-500" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Profile Dropdown */}
            <AnimatePresence mode="wait">
              {isLoggingOut ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-center w-10 h-10"
                >
                  <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
                </motion.div>
              ) : user ? (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center"
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>
                    <span className="text-gray-700 font-medium">{user.name || user.email}</span>
                    <motion.div
                      animate={{ rotate: isProfileOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100"
                      >
                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                          Profile
                        </Link>
                        <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                          Settings
                        </Link>
                        <Link to="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                          My Bookings
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                        >
                          Sign Out
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="font-medium"
                    >
                      Sign In
                    </motion.span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-3">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/venues"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Venues
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {isLoggingOut ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-2"
                >
                  <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
                </motion.div>
              ) : user ? (
                <>
                  <div className="border-t border-gray-100 pt-3">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 rounded-lg"
                    >
                      Sign Out
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2"
                >
            <Link
            to="/login"
                    className="block w-full px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg text-center hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="font-medium"
                    >
                      Sign In
                    </motion.span>
            </Link>
                </motion.div>
              )}
          </div>
          </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;