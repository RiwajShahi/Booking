import React from 'react';

const HostDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Host Dashboard</h1>
            <p className="text-gray-600">Manage your listings, view bookings, and track your earnings.</p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-black text-white rounded-lg font-semibold shadow hover:bg-gray-900 transition">
            + Create New Listing
          </button>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">🏠</span>
            <div className="text-2xl font-bold">0</div>
            <div className="text-gray-500">Listings</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">📅</span>
            <div className="text-2xl font-bold">0</div>
            <div className="text-gray-500">Bookings</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl mb-2">💰</span>
            <div className="text-2xl font-bold">$0</div>
            <div className="text-gray-500">Earnings</div>
          </div>
        </section>

        {/* Listings Table */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Your Listings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* No listings to display */}
              </tbody>
            </table>
            <div className="text-center text-gray-500 py-10">No listings yet.</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HostDashboard;
