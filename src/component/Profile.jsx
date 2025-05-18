import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Building2,
  CreditCard,
  Settings,
  Edit2,
  Save,
  X,
  Star,
  DollarSign,
  Home,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    preferredFirstName: user?.preferredFirstName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    identityVerified: user?.identityVerified || false,
    emergencyContact: user?.emergencyContact || "",
    preferences: user?.preferences || {
      notifications: true,
      newsletter: false,
      language: "English",
    },
  });

  // Mock host-specific data
  const [hostData] = useState({
    activeListings: 3,
    overallRating: 4.8,
    totalEarnings: 15200,
    payoutMethod: "Bank Account ending in ****1234",
    verificationStatus: "Verified",
    recentPayouts: [
      { id: 1, amount: 3200, date: "2024-03-31", status: "Completed" },
      { id: 2, amount: 2800, date: "2024-02-29", status: "Completed" },
      { id: 3, amount: 4500, date: "2024-01-31", status: "Completed" },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("preferences.")) {
      const prefKey = name.split(".")[1];
      setEditedUser((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditClick = (field) => {
    console.log(`Edit clicked for: ${field}`);
  };

  const handleAddClick = (field) => {
    console.log(`Add clicked for: ${field}`);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-sky-500 to-blue-600">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden flex items-center justify-center">
                <User className="w-16 h-16 text-sky-500" />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              >
                {isEditing ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Edit2 className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-12 pt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Personal Information
                </h2>
                <div className="divide-y divide-gray-200">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Legal name
                      </p>
                      <p className="mt-1 text-gray-900">
                        {editedUser.name || "Not provided"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditClick("name")}
                      className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Preferred first name
                      </p>
                      <p className="mt-1 text-gray-900">
                        {editedUser.preferredFirstName || "Not provided"}
                      </p>
                    </div>
                    {editedUser.preferredFirstName ? (
                      <button
                        onClick={() => handleEditClick("preferredFirstName")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddClick("preferredFirstName")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Add
                      </button>
                    )}
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Email address
                      </p>
                      <p className="mt-1 text-gray-900">
                        {editedUser.email || "Not provided"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditClick("email")}
                      className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Phone numbers
                      </p>
                      <p className="mt-1 text-gray-900">
                        {editedUser.phone || "Not provided"}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Add a number so confirmed guests and Airbnb can get in
                        touch. You can add other numbers and choose how they're
                        used.
                      </p>
                    </div>
                    {editedUser.phone ? (
                      <button
                        onClick={() => handleEditClick("phone")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddClick("phone")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Add
                      </button>
                    )}
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Identity verification
                      </p>
                      <p
                        className={`mt-1 ${
                          editedUser.identityVerified
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {editedUser.identityVerified
                          ? "Verified"
                          : "Not started"}
                      </p>
                    </div>
                    {!editedUser.identityVerified && (
                      <button
                        onClick={() => handleAddClick("identityVerification")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Start
                      </button>
                    )}
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Address
                      </p>
                      <p className="mt-1 text-gray-900">
                        {editedUser.address || "Not provided"}
                      </p>
                    </div>
                    {editedUser.address ? (
                      <button
                        onClick={() => handleEditClick("address")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddClick("address")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Add
                      </button>
                    )}
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Emergency contact
                      </p>
                      <p className="mt-1 text-gray-900">
                        {editedUser.emergencyContact || "Not provided"}
                      </p>
                    </div>
                    {editedUser.emergencyContact ? (
                      <button
                        onClick={() => handleEditClick("emergencyContact")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddClick("emergencyContact")}
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-5 h-5 mr-2 inline" /> Save Overall
                    Changes
                  </motion.button>
                )}
              </div>

              {/* Host Information Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Host Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Home className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Active Listings: </span>
                    <span className="font-medium text-gray-900">
                      {hostData.activeListings}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Overall Rating: </span>
                    <span className="font-medium text-gray-900">
                      {hostData.overallRating} / 5
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Total Earnings: </span>
                    <span className="font-medium text-gray-900">
                      ${hostData.totalEarnings}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Verification Status: </span>
                    <span className="font-medium text-gray-900">
                      {hostData.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Payouts Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Recent Payouts
                </h2>
                <div className="space-y-4">
                  {hostData.recentPayouts.map((payout) => (
                    <div
                      key={payout.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">Payout</p>
                          <p className="text-sm text-gray-600">{payout.date}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        +${payout.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preferences and Quick Actions */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="notifications" className="text-gray-700">
                      Email Notifications
                    </label>
                    <input
                      type="checkbox"
                      id="notifications"
                      name="preferences.notifications"
                      checked={editedUser.preferences.notifications}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="form-checkbox h-5 w-5 text-sky-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="newsletter" className="text-gray-700">
                      Newsletter Subscription
                    </label>
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="preferences.newsletter"
                      checked={editedUser.preferences.newsletter}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="form-checkbox h-5 w-5 text-sky-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Language
                    </label>
                    <select
                      name="preferences.language"
                      value={editedUser.preferences.language}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Nepali">Nepali</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Home className="w-5 h-5 text-sky-600" />
                    <span className="text-gray-700">View My Listings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="w-5 h-5 text-sky-600" />
                    <span className="text-gray-700">View Reservations</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <DollarSign className="w-5 h-5 text-sky-600" />
                    <span className="text-gray-700">View Earnings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <CreditCard className="w-5 h-5 text-sky-600" />
                    <span className="text-gray-700">Payment Methods</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Settings className="w-5 h-5 text-sky-600" />
                    <span className="text-gray-700">Account Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
