import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Clock, Building2, CreditCard, Settings, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    preferences: user?.preferences || {
      notifications: true,
      newsletter: false,
      language: 'English'
    }
  });

  // Mock booking history data
  const [bookingHistory] = useState([
    {
      id: 1,
      venue: "Grand Ballroom",
      date: "2024-03-15",
      time: "14:00 - 18:00",
      status: "Confirmed",
      amount: "Rs. 6000"
    },
    {
      id: 2,
      venue: "Garden Pavilion",
      date: "2024-04-20",
      time: "10:00 - 16:00",
      status: "Pending",
      amount: "Rs. 4000"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setEditedUser(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setEditedUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user's profile
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#232946] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-slate-800 to-slate-700">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-sky-500 to-sky-600 flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              >
                {isEditing ? <X className="w-6 h-6 text-white" /> : <Edit2 className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-sky-600" />
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedUser.name}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-gray-700">{user?.name || 'Not provided'}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-sky-600" />
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-gray-700">{user?.email || 'Not provided'}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-sky-600" />
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedUser.phone}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-gray-700">{user?.phone || 'Not provided'}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-sky-600" />
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editedUser.address}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-gray-700">{user?.address || 'Not provided'}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Booking History */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking History</h2>
                  <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.venue}</h3>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                {booking.date}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-2" />
                                {booking.time}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                            <div className="mt-2 font-semibold text-gray-900">{booking.amount}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preferences and Settings */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="preferences.notifications"
                        checked={editedUser.preferences.notifications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-gray-700">Email Notifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="preferences.newsletter"
                        checked={editedUser.preferences.newsletter}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="h-4 w-4 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-gray-700">Newsletter Subscription</span>
                    </label>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Language</label>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Building2 className="w-5 h-5 text-sky-600" />
                      <span className="text-gray-700">View My Venues</span>
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

            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 