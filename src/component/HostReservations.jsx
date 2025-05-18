import React, { useState } from "react";
import BackButton from "./BackButton";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const reservationTabs = [
  { label: "Upcoming", icon: <Calendar className="w-4 h-4" /> },
  { label: "Completed", icon: <CheckCircle className="w-4 h-4" /> },
  { label: "Canceled", icon: <XCircle className="w-4 h-4" /> },
  { label: "All", icon: <AlertCircle className="w-4 h-4" /> },
];

// Mock data for demonstration
const mockReservations = [
  {
    id: 1,
    guestName: "John Doe",
    checkIn: "2024-03-20",
    checkOut: "2024-03-25",
    status: "upcoming",
    property: "Luxury Villa",
    location: "Miami Beach, FL",
    totalAmount: 1250,
  },
  {
    id: 2,
    guestName: "Jane Smith",
    checkIn: "2024-03-15",
    checkOut: "2024-03-18",
    status: "completed",
    property: "Mountain Cabin",
    location: "Aspen, CO",
    totalAmount: 850,
  },
  {
    id: 3,
    guestName: "Mike Johnson",
    checkIn: "2024-03-10",
    checkOut: "2024-03-12",
    status: "canceled",
    property: "City Apartment",
    location: "New York, NY",
    totalAmount: 600,
  },
];

const HostReservations = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [reservations, setReservations] = useState(mockReservations);

  const filteredReservations = reservations.filter((reservation) => {
    if (activeTab === 0) return reservation.status === "upcoming";
    if (activeTab === 1) return reservation.status === "completed";
    if (activeTab === 2) return reservation.status === "canceled";
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
              Reservations
            </h1>
            <p className="text-gray-600">
              Manage your property bookings and guest stays
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {reservationTabs.map((tab, idx) => (
            <motion.button
              key={tab.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full border text-base font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === idx
                  ? "border-sky-500 text-sky-600 bg-sky-50"
                  : "border-gray-200 text-gray-700 bg-white hover:border-sky-500 hover:text-sky-600"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Reservations List */}
        {filteredReservations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No reservations found
            </h3>
            <p className="text-gray-600 text-center">
              {activeTab === 0
                ? "You don't have any upcoming reservations."
                : activeTab === 1
                ? "You don't have any completed reservations."
                : activeTab === 2
                ? "You don't have any canceled reservations."
                : "You don't have any reservations yet."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map((reservation, idx) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {reservation.guestName}
                        </h3>
                        <p className="text-gray-600">{reservation.property}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(reservation.checkIn).toLocaleDateString()} -{" "}
                          {new Date(reservation.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          {Math.ceil(
                            (new Date(reservation.checkOut) -
                              new Date(reservation.checkIn)) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          nights
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{reservation.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                    <span className="text-lg font-semibold text-gray-900 mb-2">
                      ${reservation.totalAmount}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        reservation.status
                      )}`}
                    >
                      {reservation.status.charAt(0).toUpperCase() +
                        reservation.status.slice(1)}
                    </span>
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

export default HostReservations;
