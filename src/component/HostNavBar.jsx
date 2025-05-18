import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  User,
  LogOut,
  Bell,
  Loader2,
  Calendar,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Today", to: "/host/dashboard" },
  { label: "Listings", to: "/host/listings" },
  { label: "Messages", to: "/host/messages" },
  { label: "Menu", to: "#", hasDropdown: true },
];

const menuDropdownOptions = [
  { label: "Reservations", to: "/host/reservations" },
  { label: "Earnings", to: "/host/earnings" },
  { label: "Insights", to: "/host/insights" },
  { label: "Create a new listing", to: "/become-host" },
];

const profileDropdownItems = [
  { label: "Profile", to: "/profile" },
  { label: "Account", to: "/host/account" },
  { label: "Visit the Help Center", to: "/help" },
  { label: "Get help with a safety issue", to: "/safety" },
  { label: "Gift cards", to: "/gift-cards" },
  { label: "Switch to traveling", to: "#", isSwitch: true },
  { label: "Log out", to: "#", isLogout: true },
];

const dummyNotifications = [
  {
    id: 1,
    type: "reservation",
    title: "New Reservation Request",
    message: "John Doe wants to book your Luxury Villa for March 25-30",
    time: "2 hours ago",
    read: false,
    icon: <Calendar className="w-5 h-5 text-sky-600" />,
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "Sarah Smith sent you a message about your Mountain Cabin",
    time: "5 hours ago",
    read: false,
    icon: <MessageSquare className="w-5 h-5 text-green-600" />,
  },
  {
    id: 3,
    type: "alert",
    title: "Payment Received",
    message: "You received a payment of $850 for your City Apartment",
    time: "1 day ago",
    read: true,
    icon: <CheckCircle className="w-5 h-5 text-purple-600" />,
  },
  {
    id: 4,
    type: "alert",
    title: "Listing Update Required",
    message: "Your Beach House listing needs to be updated with new photos",
    time: "2 days ago",
    read: true,
    icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
  },
];

const HostNavBar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const profileRef = useRef(null);
  const menuRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    // Navigate based on notification type
    switch (notification.type) {
      case "reservation":
        navigate("/host/reservations");
        break;
      case "message":
        navigate("/host/messages");
        break;
      default:
        break;
    }
    setNotificationsOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("mode");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const handleSwitchToTraveling = () => {
    localStorage.setItem("mode", "travel");
    navigate("/", { replace: true });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    setNotificationsOpen(false);
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-md"
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                ref={item.hasDropdown ? menuRef : undefined}
              >
                {item.hasDropdown ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                    className="text-gray-700 font-medium hover:text-sky-600 transition-colors px-2 py-1 flex items-center"
                  >
                    {item.label}
                    <motion.div
                      animate={{ rotate: menuDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="inline w-4 h-4 ml-1 text-gray-500" />
                    </motion.div>
                  </motion.button>
                ) : (
                  <Link
                    to={item.to}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive(item.to)
                        ? "text-sky-600"
                        : "text-gray-700 hover:text-sky-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Menu Dropdown */}
                <AnimatePresence>
                  {item.hasDropdown && menuDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                    >
                      {menuDropdownOptions.map((opt, i) => (
                        <Link
                          key={i}
                          to={opt.to}
                          className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors text-base"
                          onClick={() => setMenuDropdownOpen(false)}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Button */}
            <div className="relative" ref={notificationsRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-gray-700 hover:text-sky-500 transition-colors duration-200 relative"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-[999]"
                    style={{ transformOrigin: "top right" }}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Notifications
                        </h3>
                        {notifications.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleMarkAllAsRead}
                              className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                            >
                              Mark all as read
                            </motion.button>
                            <span className="text-gray-300">|</span>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleDeleteAll}
                              className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                              Delete all
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                          <Bell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <motion.button
                            key={notification.id}
                            whileHover={{ scale: 1.01 }}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                              !notification.read ? "bg-sky-50" : ""
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="mt-1">{notification.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-medium text-gray-900">
                                    {notification.title}
                                  </p>
                                  <span className="text-xs text-gray-500">
                                    {notification.time}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </motion.button>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="px-4 py-2 border-t border-gray-100">
                        <button className="w-full text-center text-sm text-sky-600 hover:text-sky-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-sky-50 transition-colors duration-200"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shadow-md"
                >
                  <User className="w-6 h-6 text-white" />
                </motion.div>
              </motion.button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                  >
                    {profileDropdownItems.map((item, idx) =>
                      item.to && !item.isLogout && !item.isSwitch ? (
                        <Link
                          key={idx}
                          to={item.to}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          key={idx}
                          onClick={
                            item.isLogout
                              ? handleLogout
                              : item.isSwitch
                              ? handleSwitchToTraveling
                              : undefined
                          }
                          className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors ${
                            item.isLogout ? "text-red-500 font-semibold" : ""
                          }`}
                          disabled={item.isLogout && isLoggingOut}
                        >
                          {item.isLogout && isLoggingOut ? (
                            <div className="flex items-center">
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Logging out...
                            </div>
                          ) : (
                            item.label
                          )}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <Menu className="w-5 h-5 text-gray-600" />
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
              {menuItems.map((item, idx) =>
                item.to && !item.hasDropdown ? (
                  <Link
                    key={idx}
                    to={item.to}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-sky-600 rounded-lg transition-colors duration-200 ${
                      isActive(item.to) ? "text-sky-600" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : null
              )}
              {menuDropdownOptions.map((opt, idx) => (
                <Link
                  key={idx}
                  to={opt.to}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-sky-600 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {opt.label}
                </Link>
              ))}
              {profileDropdownItems.map((item, idx) =>
                item.to && !item.isLogout && !item.isSwitch ? (
                  <Link
                    key={`mobile-${idx}`}
                    to={item.to}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50/50 hover:text-sky-600 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : null
              )}
              {profileDropdownItems.map((item, idx) =>
                item.isSwitch || item.isLogout ? (
                  <button
                    key={`mobile-${idx}`}
                    onClick={
                      item.isSwitch ? handleSwitchToTraveling : handleLogout
                    }
                    className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50/50 rounded-lg transition-colors duration-200 ${
                      item.isLogout ? "text-red-500 font-semibold" : ""
                    }`}
                    disabled={item.isLogout && isLoggingOut}
                  >
                    {item.isLogout && isLoggingOut ? (
                      <div className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Logging out...
                      </div>
                    ) : (
                      item.label
                    )}
                  </button>
                ) : null
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HostNavBar;
