import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import HostNavBar from "./HostNavBar";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  MessageSquare,
  CheckCircle,
  Calendar,
  DollarSign,
  Home,
  Plus,
  Edit2,
  Clock,
  ChevronDown,
} from "lucide-react";
import BackButton from "./BackButton";
import { motion, AnimatePresence } from "framer-motion";

const resourceTips = [
  {
    img: "https://a0.muscache.com/im/pictures/hosting-ux/tips-1.png",
    title: "Now you can Airbnb more than an Airbnb",
  },
  {
    img: "https://a0.muscache.com/im/pictures/hosting-ux/tips-2.png",
    title: "Explore new hosting tools to help grow your business",
  },
  {
    img: "https://a0.muscache.com/im/pictures/hosting-ux/tips-3.png",
    title: "What you need to know about Airbnb Services",
  },
  {
    img: "https://a0.muscache.com/im/pictures/hosting-ux/tips-4.png",
    title: "Get early access to new hosting tools",
  },
];

const reservationTabs = [
  { label: "Checking out", count: 0 },
  { label: "Currently hosting", count: 0 },
  { label: "Arriving soon", count: 0 },
  { label: "Upcoming", count: 0 },
  { label: "Pending review", count: 0 },
];

const quickActions = [
  {
    icon: <Home className="w-6 h-6" />,
    label: "Listings",
    description: "Manage your properties",
    link: "/host/listings",
    color: "bg-blue-500",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    label: "Reservations",
    description: "View booking requests",
    link: "/host/reservations",
    color: "bg-green-500",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    label: "Earnings",
    description: "Track your income",
    link: "/host/earnings",
    color: "bg-purple-500",
  },
  {
    icon: <Plus className="w-6 h-6" />,
    label: "New Listing",
    description: "Add a property",
    link: "/become-host",
    color: "bg-orange-500",
  },
];

const HostDashboard = () => {
  const { user } = useAuth() || { user: { name: "Host" } };
  const [activeTab, setActiveTab] = useState(0);
  const [incompleteListings, setIncompleteListings] = useState([]);
  const [showListingDropdown, setShowListingDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowListingDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Get incomplete listings from localStorage (mock data for now)
    const savedDrafts = JSON.parse(
      localStorage.getItem("listingDrafts") || "[]"
    );
    setIncompleteListings(savedDrafts);
  }, []);

  // Mock incomplete listings if none exist
  useEffect(() => {
    if (incompleteListings.length === 0) {
      const mockDrafts = [
        {
          id: 1,
          title: "Luxury Villa",
          progress: 65,
          lastUpdated: "2024-03-15",
          stepsCompleted: ["Basic Info", "Location", "Photos"],
          stepsRemaining: ["Pricing", "Availability", "House Rules"],
        },
        {
          id: 2,
          title: "Mountain Cabin",
          progress: 40,
          lastUpdated: "2024-03-10",
          stepsCompleted: ["Basic Info", "Location"],
          stepsRemaining: ["Photos", "Pricing", "Availability", "House Rules"],
        },
      ];
      localStorage.setItem("listingDrafts", JSON.stringify(mockDrafts));
      setIncompleteListings(mockDrafts);
    }
  }, [incompleteListings.length]);

  useEffect(() => {
    if (showListingDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px margin
        left: rect.right - 320 + window.scrollX, // 320px = dropdown width
        width: rect.width,
      });
    }
  }, [showListingDropdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative z-0">
      <HostNavBar />
      <BackButton />
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-0">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || "Host"}!
            </h1>
            <p className="text-gray-600 text-lg">
              Here's what's happening with your listings today.
            </p>
          </div>
          {incompleteListings.length > 0 ? (
            <div className="relative inline-block">
              <motion.button
                ref={buttonRef}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowListingDropdown(!showListingDropdown)}
                className="mt-4 md:mt-0 px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold shadow-lg hover:bg-sky-600 transition-all duration-200 flex items-center space-x-2"
              >
                <Edit2 className="w-5 h-5" />
                <div className="flex flex-col items-start">
                  <span>Complete your listing</span>
                  <span className="text-sm font-normal opacity-90">
                    {incompleteListings.length}{" "}
                    {incompleteListings.length === 1 ? "draft" : "drafts"}{" "}
                    remaining
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: showListingDropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 ml-2" />
                </motion.div>
              </motion.button>
              {/* Dropdown Menu rendered in Portal */}
              {showListingDropdown &&
                ReactDOM.createPortal(
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="fixed w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-[9999]"
                    style={{
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                      transformOrigin: "top right",
                    }}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Incomplete Listings
                      </h3>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                      {incompleteListings.map((listing) => (
                        <motion.button
                          key={listing.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => {
                            navigate(`/become-host?draft=${listing.id}`);
                            setShowListingDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="mt-1">
                              <Edit2 className="w-5 h-5 text-sky-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 truncate">
                                  {listing.title}
                                </p>
                                <span className="text-sm text-sky-600 ml-2 flex-shrink-0">
                                  {listing.progress}%
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                                <span className="truncate">
                                  Last updated{" "}
                                  {new Date(
                                    listing.lastUpdated
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {listing.stepsRemaining
                                  .slice(0, 2)
                                  .map((step, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full truncate"
                                    >
                                      {step}
                                    </span>
                                  ))}
                                {listing.stepsRemaining.length > 2 && (
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{listing.stepsRemaining.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          navigate("/become-host");
                          setShowListingDropdown(false);
                        }}
                        className="w-full text-center text-sm text-sky-600 hover:text-sky-700 font-medium"
                      >
                        Create new listing
                      </button>
                    </div>
                  </motion.div>,
                  document.body
                )}
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/become-host")}
              className="mt-4 md:mt-0 px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold shadow-lg hover:bg-sky-600 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create new listing</span>
            </motion.button>
          )}
        </motion.div>

        {/* Incomplete Listings Section */}
        {incompleteListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Complete Your Listings
              </h2>
              <span className="text-sm text-gray-500">
                {incompleteListings.length}{" "}
                {incompleteListings.length === 1 ? "draft" : "drafts"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {incompleteListings.map((listing) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * listing.id }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>
                          Last updated{" "}
                          {new Date(listing.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-sky-600 mb-1">
                        {listing.progress}% Complete
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${listing.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Completed Steps:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {listing.stepsCompleted.map((step, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Remaining Steps:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {listing.stepsRemaining.map((step, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full"
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/become-host?draft=${listing.id}`)}
                    className="mt-4 w-full px-4 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Continue Listing</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={action.link}
                className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div
                  className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
                >
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {action.label}
                </h3>
                <p className="text-gray-600">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Reservations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Your reservations
            </h2>
            <Link
              to="/host/reservations"
              className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
            >
              View all reservations
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {reservationTabs.map((tab, idx) => (
              <motion.button
                key={tab.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2.5 rounded-full border text-base font-medium transition-all duration-200 ${
                  activeTab === idx
                    ? "border-sky-500 text-sky-600 bg-sky-50"
                    : "border-gray-200 text-gray-700 bg-white hover:border-sky-500 hover:text-sky-600"
                }`}
              >
                {tab.label} ({tab.count})
              </motion.button>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl flex flex-col items-center justify-center py-16 min-h-[180px]">
            <CheckCircle className="w-12 h-12 text-gray-400 mb-4" />
            <div className="text-gray-700 text-lg text-center">
              You don't have any guests
              <br />
              checking out today or tomorrow.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HostDashboard;
