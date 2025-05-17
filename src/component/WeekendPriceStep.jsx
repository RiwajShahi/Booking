import React, { useState } from 'react';

const WeekendPriceStep = ({ weekendPrice, setWeekendPrice, onBack, onNext }) => {
  const [editing, setEditing] = useState(false);
  const tip = 20;
  const guestPrice = weekendPrice ? (parseFloat(weekendPrice) + 2).toFixed(2) : '';
  const canProceed = weekendPrice && parseFloat(weekendPrice) > 0;

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Now, set a <span className='text-teal-500'>weekend</span> base price</h2>
      <p className="text-center text-gray-500 mb-8 max-w-xl">Tip: ${tip}. This is what guests pay for Friday and Saturday nights.</p>
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center mb-2">
          <span className="text-5xl font-extrabold text-gray-900">$</span>
          {editing ? (
            <input
              type="number"
              min="1"
              value={weekendPrice}
              onChange={e => setWeekendPrice(e.target.value.replace(/[^0-9.]/g, ''))}
              onBlur={() => setEditing(false)}
              autoFocus
              className="text-5xl font-extrabold text-gray-900 w-32 text-center border-b-2 border-teal-400 focus:outline-none bg-transparent"
            />
          ) : (
            <span
              className="text-5xl font-extrabold text-gray-900 cursor-pointer flex items-center"
              onClick={() => setEditing(true)}
            >
              {weekendPrice || tip}
              <svg className="w-6 h-6 ml-2 text-gray-400 hover:text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h18" /></svg>
            </span>
          )}
        </div>
        <div className="text-gray-500 text-lg">Guest price before taxes ${guestPrice}</div>
      </div>
      <div className="mb-8">
        <a href="#" className="text-teal-600 underline text-sm">Learn more about pricing</a>
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

export default WeekendPriceStep; 