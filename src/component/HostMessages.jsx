import React from "react";
import BackButton from "./BackButton";

const HostMessages = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-600">
            This is the host messages inbox. List of conversations will appear
            here.
          </p>
          {/* TODO: Implement fetching and displaying host conversations */}
          {/* TODO: Add links to individual chat windows */}
        </div>
      </div>
    </div>
  );
};

export default HostMessages;
