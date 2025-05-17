import React from 'react';

const OPTIONS = [
  {
    value: 'approve',
    title: 'Approve your first 5 bookings',
    recommended: true,
    description: 'Start by reviewing reservation requests, then switch to Instant Book, so guests can book automatically.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><rect x="4" y="8" width="20" height="14" rx="3" stroke="#222" strokeWidth="2"/><rect x="8" y="12" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="16" y="12" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="12" y="6" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/></svg>
    )
  },
  {
    value: 'instant',
    title: 'Use Instant Book',
    recommended: false,
    description: 'Let guests book automatically.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M14 3v22M14 3l6 6M14 3l-6 6" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    )
  }
];

const BookingSettingsStep = ({ bookingSetting, setBookingSetting, onBack, onNext }) => {
  const canProceed = !!bookingSetting;

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Pick your booking settings</h2>
      <p className="text-center text-gray-500 mb-8 max-w-xl">You can change this at any time.</p>
      <div className="w-full max-w-xl flex flex-col gap-6 mb-12">
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setBookingSetting(opt.value)}
            className={`flex items-center justify-between w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left shadow-sm focus:outline-none
              ${bookingSetting === opt.value ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-purple-50 shadow-lg scale-105' : 'border-gray-300 bg-white hover:border-teal-400'}`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{opt.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg text-gray-900">{opt.title}</span>
                  {opt.recommended && <span className="px-2 py-0.5 text-xs bg-teal-100 text-teal-700 rounded-full font-semibold">Recommended</span>}
                </div>
                <p className="text-gray-500 text-sm">{opt.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="fixed bottom-8 right-8 flex space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={() => canProceed && onNext()}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200
            ${canProceed ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingSettingsStep; 