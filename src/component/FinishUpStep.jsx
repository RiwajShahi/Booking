import React from 'react';

const FinishUpStep = ({ onBack, onNext }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center mb-12 md:mb-0 md:mr-12">
          <div className="text-lg text-gray-400 mb-2">Step 3</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Finish up and publish</h2>
          <p className="text-gray-600 text-lg max-w-md mb-4">
            Finally, you'll choose booking settings, set up pricing, and publish your listing.
          </p>
        </div>
        {/* Illustration */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/13/14/house-2022631_1280.png"
            alt="House Illustration"
            className="w-80 h-auto drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>
      <div className="fixed bottom-8 right-8 flex space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 bg-teal-500 text-white hover:bg-teal-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FinishUpStep; 