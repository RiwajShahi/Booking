import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ChevronDown,
  Bell,
  Loader2,
  Check,
  Clock,
  MapPin,
  Building2,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";
import { logout } from "../api/api";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("token")
  );
  const { user, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const location = useLocation();

  // Load notifications from localStorage on component mount
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications
      ? JSON.parse(savedNotifications)
      : [
          {
            id: 1,
            title: "Booking Confirmed",
            message: "Your booking for Grand Ballroom has been confirmed",
            time: "2 hours ago",
            read: false,
            type: "booking",
          },
          {
            id: 2,
            title: "Payment Successful",
            message: "Payment for Garden Pavilion has been processed",
            time: "1 day ago",
            read: true,
            type: "payment",
          },
          {
            id: 3,
            title: "New Review",
            message: "You received a new 5-star review",
            time: "2 days ago",
            read: true,
            type: "review",
          },
        ];
  });

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Listen for custom events from venue bookings
  useEffect(() => {
    const handleVenueBooked = (event) => {
      const newNotification = {
        id: Date.now(),
        title: "New Booking",
        message: `Your booking for ${event.detail.venue} on ${event.detail.date} has been received`,
        time: "Just now",
        read: false,
        type: "booking",
      };
      setNotifications((prev) => [newNotification, ...prev]);
    };

    window.addEventListener("venueBooked", handleVenueBooked);
    return () => window.removeEventListener("venueBooked", handleVenueBooked);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock popular destinations data
  const popularDestinations = [
    {
      id: 1,
      city: "New York",
      venues: [
        { id: 1, name: "Grand Ballroom", count: 12 },
        { id: 2, name: "Skyline Terrace", count: 8 },
        { id: 3, name: "Central Park Pavilion", count: 5 },
      ],
    },
    {
      id: 2,
      city: "Los Angeles",
      venues: [
        { id: 4, name: "Hollywood Hills", count: 15 },
        { id: 5, name: "Beachside Venue", count: 10 },
        { id: 6, name: "Downtown LA Hall", count: 7 },
      ],
    },
    {
      id: 3,
      city: "Chicago",
      venues: [
        { id: 7, name: "Lakefront Center", count: 9 },
        { id: 8, name: "Magnificent Mile", count: 6 },
        { id: 9, name: "Millennium Park", count: 4 },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authLogout();
      setIsLoggedIn(false);
      setIsProfileOpen(false);
      // Add a small delay to show the loading animation
      setTimeout(() => {
        setIsLoggingOut(false);
        // Clear all auth-related data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Refresh the page and redirect to home
        window.location.href = "/";
      }, 500);
    } catch (error) {
      setIsLoggingOut(false);
      console.error("Logout failed:", error);
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const [mode, setMode] = React.useState(
    () => localStorage.getItem("mode") || "host"
  );

  React.useEffect(() => {
    const handleStorage = () => {
      setMode(localStorage.getItem("mode") || "host");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleBecomeHost = () => {
    localStorage.setItem("role", "host");
    localStorage.setItem("mode", "host");
    setMode("host");
    navigate("/host/dashboard");
  };

  const handleSwitchToHosting = () => {
    localStorage.setItem("mode", "host");
    setMode("host");
    navigate("/host/dashboard");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 min-h-[4.5rem] py-2">
            {/* Logo Left */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center space-x-3"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center shadow-md"
                >
                  <span className="text-lg font-bold text-white">H</span>
                </motion.div>
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  className="text-lg font-bold text-gray-900"
                >
                  Hostsy
                </motion.span>
              </Link>
            </div>

            {/* Centered Navigation */}
            <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
              <Link
                to="/"
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive("/")
                    ? "text-sky-600"
                    : "text-gray-700 hover:text-sky-500"
                }`}
              >
                Home
              </Link>
              <Link
                to="/venues"
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive("/venues")
                    ? "text-sky-600"
                    : "text-gray-700 hover:text-sky-500"
                }`}
              >
                Venues
              </Link>
              <Link
                to="/contact"
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive("/contact")
                    ? "text-sky-600"
                    : "text-gray-700 hover:text-sky-500"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Profile/Right Section */}
            <div className="flex items-center space-x-4">
              {/* Become a Host or Switch to Hosting Button (Desktop) */}
              {mode === "travel" ? (
                <button
                  onClick={handleSwitchToHosting}
                  className="hidden md:flex whitespace-nowrap px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-medium transition-all duration-200 shadow-md hover:shadow-lg text-base"
                >
                  Switch to Hosting
                </button>
              ) : (
                <button
                  onClick={handleBecomeHost}
                  className="hidden md:flex whitespace-nowrap px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-medium transition-all duration-200 shadow-md hover:shadow-lg text-base"
                >
                  Become a host
                </button>
              )}
              {/* Notification Button and Dropdown */}
              <div className="relative" ref={notificationRef}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-2 text-gray-700 hover:text-sky-500 transition-colors duration-200 relative bg-transparent"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-md"
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </motion.button>
                {isNotificationOpen && (
                  <div
                    className="absolute right-0 z-50 w-80 bg-[#2d3450] rounded-xl shadow-lg py-2 border border-gray-700"
                    style={{ top: "calc(100% + 0.5rem)" }}
                  >
                    <div className="px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold text-white">
                        Notifications
                      </h3>
                      {notifications.length > 0 && (
                        <div className="flex space-x-2">
                          <button
                            onClick={markAllAsRead}
                            className="text-sm text-teal-400 hover:text-teal-300"
                          >
                            Mark all as read
                          </button>
                          <button
                            onClick={clearAllNotifications}
                            className="text-sm text-red-400 hover:text-red-300"
                          >
                            Clear all
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-[#232946] cursor-pointer ${
                              !notification.read ? "bg-teal-900/20" : ""
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div
                                  className={`w-2 h-2 rounded-full mt-2 ${
                                    notification.read
                                      ? "bg-gray-300"
                                      : "bg-teal-400"
                                  }`}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-300">
                                  {notification.message}
                                </p>
                                <div className="flex items-center mt-1 text-xs text-gray-400">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {notification.time}
                                </div>
                              </div>
                              {!notification.read && (
                                <Check className="w-4 h-4 text-teal-400" />
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-center text-gray-400">
                          No notifications
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown Button and Dropdown */}
              <div className="relative">
                {user ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 p-1 rounded-full hover:bg-sky-100 transition-colors duration-200"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shadow-md"
                      >
                        <User className="w-6 h-6 text-white" />
                      </motion.div>
                      <span className="hidden md:block text-gray-900 font-medium text-base">
                        {user ? user.name || user.email : ""}
                      </span>
                      <motion.div
                        animate={{ rotate: isProfileOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="hidden md:block"
                      >
                        <ChevronDown className="w-4 h-4 text-gray-700" />
                      </motion.div>
                    </motion.button>
                    {isProfileOpen && (
                      <div
                        className="absolute right-0 z-50 w-48 bg-[#2d3450] rounded-xl shadow-lg py-2 border border-gray-700"
                        style={{ top: "calc(100% + 0.5rem)" }}
                      >
                        <div className="px-4 py-2 border-b border-gray-700">
                          <p className="text-sm font-medium text-white">
                            {user?.email || ""}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-200 hover:bg-[#232946] hover:text-teal-400 transition-colors duration-200"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Profile
                          </Link>
                          <button
                            onClick={() => navigate("/cohost")}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Apply for Co-Host
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#232946] flex items-center transition-colors duration-200"
                            disabled={isLoggingOut}
                          >
                            {isLoggingOut ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Logging out...
                              </>
                            ) : (
                              "Logout"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="hidden md:flex px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>
            </div>
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
              className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-3">
                <Link
                  to="/"
                  className={`block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-violet-600 rounded-lg transition-colors duration-200 ${
                    isActive("/") ? "text-violet-600" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/venues"
                  className={`block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-violet-600 rounded-lg transition-colors duration-200 ${
                    isActive("/venues") ? "text-violet-600" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Venues
                </Link>
                <Link
                  to="/contact"
                  className={`block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-violet-600 rounded-lg transition-colors duration-200 ${
                    isActive("/contact") ? "text-violet-600" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                {/* Become a Host or Switch to Hosting Button (Mobile) */}
                {mode === "travel" ? (
                  <button
                    onClick={() => {
                      handleSwitchToHosting();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 bg-sky-500 text-white rounded-lg text-center hover:bg-sky-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                  >
                    Switch to Hosting
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleBecomeHost();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 bg-sky-500 text-white rounded-lg text-center hover:bg-sky-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                  >
                    Become a Host
                  </button>
                )}
                {user && (
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-violet-600 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                )}
                {isLoggingOut ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center py-2"
                  >
                    <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
                  </motion.div>
                ) : user ? (
                  <>
                    <div className="border-t border-gray-100 pt-3">
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-violet-600 rounded-lg transition-colors duration-200 ${
                          isActive("/profile") ? "text-violet-600" : ""
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-violet-600 rounded-lg transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <Link
                        to="/bookings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-violet-600 rounded-lg transition-colors duration-200"
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
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50/50 rounded-lg transition-colors duration-200"
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
                      className="block w-full px-4 py-2.5 bg-sky-500 text-white rounded-lg text-center hover:bg-sky-600 transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="font-medium"
                      >
                        Log In
                      </motion.span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default NavBar;
