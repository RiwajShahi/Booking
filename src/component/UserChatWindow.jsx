import React from "react";
import BackButton from "./BackButton";

const UserChatWindow = () => {
  // In a real implementation, you would fetch messages for a specific conversation
  // based on route parameters (e.g., booking ID).

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Chat with Host
        </h1>
        <div className="bg-white rounded-2xl shadow-lg p-6 h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {/* TODO: Display messages here */}
            <p className="text-gray-600">Messages will appear here.</p>
          </div>
          {/* TODO: Add message input and send button */}
          <div className="border-t border-gray-200 pt-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border rounded-lg px-3 py-2"
            />
            <button className="mt-2 w-full bg-sky-500 text-white rounded-lg py-2">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatWindow;
