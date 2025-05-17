import React from 'react';

const HIGHLIGHTS = [
  { label: 'Peaceful', icon: '🎁' },
  { label: 'Unique', icon: '✨' },
  { label: 'Family-friendly', icon: '👨‍👩‍👧‍👦' },
  { label: 'Stylish', icon: '🛋️' },
  { label: 'Central', icon: '📍' },
  { label: 'Spacious', icon: '🧑‍🤝‍🧑' },
];

const MAX_HIGHLIGHTS = 2;

const DescriptionHighlightsStep = ({ selectedHighlights, setSelectedHighlights, onBack, onNext }) => {
  const toggleHighlight = (highlight) => {
    if (selectedHighlights.includes(highlight)) {
      setSelectedHighlights(selectedHighlights.filter(h => h !== highlight));
    } else if (selectedHighlights.length < MAX_HIGHLIGHTS) {
      setSelectedHighlights([...selectedHighlights, highlight]);
    }
  };
  const canProceed = selectedHighlights.length > 0;

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Next, let's describe your house</h2>
      <p className="text-center text-gray-500 mb-8 max-w-xl">Choose up to 2 highlights. We'll use these to get your description started.</p>
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {HIGHLIGHTS.map((h) => (
          <button
            key={h.label}
            type="button"
            onClick={() => toggleHighlight(h.label)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 text-lg font-medium transition-all duration-200 focus:outline-none
              ${selectedHighlights.includes(h.label)
                ? 'bg-gradient-to-br from-teal-400 to-purple-300 text-white border-teal-500 scale-105 shadow-lg'
                : 'bg-white text-gray-700 border-gray-200 hover:border-teal-400 hover:bg-teal-50'}`}
            disabled={!selectedHighlights.includes(h.label) && selectedHighlights.length >= MAX_HIGHLIGHTS}
          >
            <span className="text-2xl">{h.icon}</span>
            <span>{h.label}</span>
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

export default DescriptionHighlightsStep; 