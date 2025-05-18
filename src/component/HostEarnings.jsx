import React, { useState } from "react";
import BackButton from "./BackButton";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock data for demonstration
const mockEarnings = {
  totalEarnings: 12500,
  monthlyEarnings: 3200,
  pendingPayouts: 850,
  lastPayout: 2800,
  monthlyChange: 15,
  yearlyChange: 25,
  recentTransactions: [
    {
      id: 1,
      type: "booking",
      amount: 850,
      date: "2024-03-15",
      status: "completed",
      description: "Booking payment from John Doe",
    },
    {
      id: 2,
      type: "payout",
      amount: -2800,
      date: "2024-03-10",
      status: "completed",
      description: "Monthly payout to bank account",
    },
    {
      id: 3,
      type: "booking",
      amount: 1250,
      date: "2024-03-05",
      status: "pending",
      description: "Booking payment from Jane Smith",
    },
  ],
};

const HostEarnings = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [earnings] = useState(mockEarnings);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings</h1>
            <p className="text-gray-600">
              Track your income and manage payouts
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            {["week", "month", "year"].map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  timeRange === range
                    ? "bg-sky-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Earnings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-sky-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Total Earnings
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(earnings.totalEarnings)}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>{earnings.yearlyChange}% vs last year</span>
            </div>
          </motion.div>

          {/* Monthly Earnings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                This Month
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(earnings.monthlyEarnings)}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>{earnings.monthlyChange}% vs last month</span>
            </div>
          </motion.div>

          {/* Pending Payouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Pending Payouts
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(earnings.pendingPayouts)}
            </div>
            <div className="text-sm text-gray-500">Next payout in 3 days</div>
          </motion.div>

          {/* Last Payout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Last Payout
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {formatCurrency(earnings.lastPayout)}
            </div>
            <div className="text-sm text-gray-500">Paid on March 10, 2024</div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Recent Transactions
          </h2>
          <div className="space-y-4">
            {earnings.recentTransactions.map((transaction, idx) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "booking"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {transaction.type === "booking" ? (
                      <DollarSign className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.status.charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HostEarnings;
