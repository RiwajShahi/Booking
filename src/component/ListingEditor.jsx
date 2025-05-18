import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  Home,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Settings,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Edit2,
  Trash2,
  Eye,
  Star,
  MessageSquare,
  Clock,
} from "lucide-react";

const ListingEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [stats, setStats] = useState({
    views: 0,
    saves: 0,
    inquiries: 0,
    bookings: 0,
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        // Get listing from localStorage
        const storedListings = localStorage.getItem("venues");
        if (!storedListings) {
          throw new Error("No listings found");
        }

        const listings = JSON.parse(storedListings);
        const foundListing = listings.find((l) => l.id === parseInt(id));

        if (foundListing) {
          setListing(foundListing);
          // Mock stats for now
          setStats({
            views: Math.floor(Math.random() * 1000),
            saves: Math.floor(Math.random() * 100),
            inquiries: Math.floor(Math.random() * 50),
            bookings: Math.floor(Math.random() * 20),
          });
        } else {
          throw new Error("Listing not found");
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const tabs = [
    { id: "details", label: "Details", icon: <Home className="w-5 h-5" /> },
    { id: "photos", label: "Photos", icon: <ImageIcon className="w-5 h-5" /> },
    {
      id: "pricing",
      label: "Pricing",
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      id: "availability",
      label: "Availability",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Listing Not Found
          </h2>
          <button
            onClick={() => navigate("/host/listings")}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/host/listings")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {listing.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/venues/${listing.id}`)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setShowPublishModal(true)}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats and Navigation */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Listing Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.views}
                  </div>
                  <div className="text-sm text-gray-500">Views</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.saves}
                  </div>
                  <div className="text-sm text-gray-500">Saves</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.inquiries}
                  </div>
                  <div className="text-sm text-gray-500">Inquiries</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.bookings}
                  </div>
                  <div className="text-sm text-gray-500">Bookings</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-sky-50 text-sky-600"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                  <ChevronRight className="w-5 h-5 ml-auto" />
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    navigate(`/host/messages?listing=${listing.id}`)
                  }
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>View Messages</span>
                </button>
                <button
                  onClick={() =>
                    navigate(`/host/calendar?listing=${listing.id}`)
                  }
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Manage Calendar</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Listing</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Content based on active tab */}
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Basic Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={listing.name}
                          onChange={(e) =>
                            setListing({ ...listing, name: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={listing.description}
                          onChange={(e) =>
                            setListing({
                              ...listing,
                              description: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Location
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          value={listing.address}
                          onChange={(e) =>
                            setListing({ ...listing, address: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={listing.city}
                            onChange={(e) =>
                              setListing({ ...listing, city: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            value={listing.state}
                            onChange={(e) =>
                              setListing({ ...listing, state: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Capacity & Amenities
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Maximum Capacity
                        </label>
                        <input
                          type="number"
                          value={listing.capacity}
                          onChange={(e) =>
                            setListing({
                              ...listing,
                              capacity: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amenities
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {listing.amenities?.map((amenity, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={true}
                                onChange={() => {
                                  const newAmenities = listing.amenities.filter(
                                    (_, i) => i !== index
                                  );
                                  setListing({
                                    ...listing,
                                    amenities: newAmenities,
                                  });
                                }}
                                className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                              />
                              <span className="text-gray-700">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "photos" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Photos
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {listing.images?.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden group"
                      >
                        <img
                          src={image}
                          alt={`${listing.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                          <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                            <Edit2 className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors">
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-sky-500 hover:text-sky-500 transition-colors">
                    Add More Photos
                  </button>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Pricing
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Base Price (per night)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={listing.price}
                          onChange={(e) =>
                            setListing({
                              ...listing,
                              price: parseFloat(e.target.value),
                            })
                          }
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weekend Price (per night)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={listing.weekendPrice}
                          onChange={(e) =>
                            setListing({
                              ...listing,
                              weekendPrice: parseFloat(e.target.value),
                            })
                          }
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "availability" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Availability
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600">
                      Calendar management will be implemented here.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Instant Book
                        </h3>
                        <p className="text-sm text-gray-500">
                          Allow guests to book without approval
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Auto-Reply Messages
                        </h3>
                        <p className="text-sm text-gray-500">
                          Automatically respond to guest inquiries
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Delete Listing
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this listing? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Delete listing logic here
                    setShowDeleteModal(false);
                    navigate("/host/listings");
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Publish Modal */}
      <AnimatePresence>
        {showPublishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Publish Listing
              </h3>
              <p className="text-gray-600 mb-6">
                Your listing will be visible to potential guests. Make sure all
                information is accurate.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Publish listing logic here
                    setShowPublishModal(false);
                    navigate("/host/listings");
                  }}
                  className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Publish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListingEditor;
