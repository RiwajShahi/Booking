import React from 'react';

const amenityGroups = [
  {
    title: "Guest Favorites",
    items: [
      { label: 'WiFi', icon: '📶' },
      { label: 'TV', icon: '📺' },
      { label: 'Kitchen', icon: '🍳' },
      { label: 'Washer', icon: '🧺' },
      { label: 'Free parking', icon: '🅿️' },
      { label: 'Air conditioning', icon: '❄️' },
      { label: 'Workspace', icon: '💻' },
    ]
  },
  {
    title: "Standout Amenities",
    items: [
      { label: 'Pool', icon: '🏊' },
      { label: 'Hot tub', icon: '🛁' },
      { label: 'Pets allowed', icon: '🐾' },
      { label: 'Breakfast', icon: '🥞' },
      { label: 'Gym', icon: '🏋️' },
      { label: 'Heating', icon: '🔥' },
    ]
  },
  {
    title: "Safety Items",
    items: [
      { label: 'Smoke alarm', icon: '🚨' },
      { label: 'First aid kit', icon: '🩹' },
      { label: 'Fire extinguisher', icon: '🧯' },
      { label: 'Carbon monoxide alarm', icon: '🛑' },
    ]
  }
];

const DescribeHouseOrApartment = ({
  selectedAmenities, setSelectedAmenities,
  onBack, onNext
}) => {
  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };
  const canProceed = selectedAmenities.length > 0;
  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">What amenities does your place offer?</h2>
      <p className="text-center text-gray-500 mb-8 max-w-xl">Select all amenities that apply. You can add more later!</p>
      <div className="w-full max-w-3xl mb-12 space-y-10">
        {amenityGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-semibold mb-4 text-teal-700">{group.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {group.items.map((amenity) => (
                <button
                  key={amenity.label}
                  type="button"
                  onClick={() => toggleAmenity(amenity.label)}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow border transition-all duration-200 text-lg font-medium focus:outline-none
                    ${selectedAmenities.includes(amenity.label)
                      ? 'bg-gradient-to-br from-teal-400 to-purple-300 text-white border-teal-500 scale-105 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-teal-400 hover:bg-teal-50'}`}
                >
                  <span className="text-3xl mb-2">{amenity.icon}</span>
                  <span>{amenity.label}</span>
                </button>
              ))}
            </div>
          </div>
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

export default DescribeHouseOrApartment; 