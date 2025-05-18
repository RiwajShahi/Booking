import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { motion } from "framer-motion";
import {
  Home,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
} from "lucide-react";

const HostListings = () => {
  const [listings, setListings] = useState([]);
  const [draft, setDraft] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // For now, get listings and draft from localStorage (mock)
    const savedListings = JSON.parse(
      localStorage.getItem("hostListings") || "[]"
    );
    setListings(savedListings);
    const savedDraft = JSON.parse(
      localStorage.getItem("listingDraft") || "null"
    );
    setDraft(savedDraft);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <BackButton />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Listings
            </h1>
            <p className="text-gray-600">
              Manage your properties and create new listings
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/become-host")}
            className="mt-4 md:mt-0 px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold shadow-lg hover:bg-sky-600 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create new listing</span>
          </motion.button>
        </motion.div>

        {/* Draft Notice */}
        {draft && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Edit2 className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">
                  Draft in Progress
                </h3>
                <p className="text-yellow-700">
                  Continue where you left off with your listing
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/become-host")}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-200"
            >
              Continue draft
            </motion.button>
          </motion.div>
        )}

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Home className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No listings yet
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Start by creating your first listing. It's quick and easy!
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/become-host")}
              className="px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold shadow-lg hover:bg-sky-600 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create your first listing</span>
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-200"
              >
                <div className="relative h-48 bg-gray-200">
                  {listing.image ? (
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Home className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        navigate(`/host/listings/${listing.id}/edit`)
                      }
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this listing?"
                          )
                        ) {
                          const updatedListings = listings.filter(
                            (l) => l.id !== listing.id
                          );
                          setListings(updatedListings);
                          localStorage.setItem(
                            "hostListings",
                            JSON.stringify(updatedListings)
                          );
                        }
                      }}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </motion.button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {listing.title || "Untitled Listing"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {listing.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{listing.bookings || 0} bookings</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>${listing.price || 0}/night</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/venues/${listing.id}`)}
                      className="text-sky-600 hover:text-sky-700 font-medium"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Last updated:{" "}
                      {new Date(
                        listing.updatedAt || Date.now()
                      ).toLocaleDateString()}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigate(`/host/listings/${listing.id}/edit`)
                      }
                      className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                    >
                      Edit listing
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostListings;
