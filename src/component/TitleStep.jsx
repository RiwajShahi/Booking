import React from 'react';

const MAX_TITLE_LENGTH = 32;

const TitleStep = ({ title, setTitle, onBack, onNext }) => {
  const canProceed = title.trim().length > 0 && title.length <= MAX_TITLE_LENGTH;

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Now, let's give your house a title</h2>
      <p className="text-center text-gray-500 mb-8 max-w-xl">Short titles work best. Have fun with it—you can always change it later.</p>
      <div className="w-full max-w-xl flex flex-col items-center mb-12">
        <textarea
          value={title}
          onChange={e => setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH))}
          placeholder="Enter a catchy title for your place"
          rows={3}
          maxLength={MAX_TITLE_LENGTH}
          className="w-full p-4 rounded-xl border-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 text-lg shadow-sm resize-none mb-2"
        />
        <div className="w-full text-right text-gray-400 text-sm">{title.length}/{MAX_TITLE_LENGTH}</div>
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

export default TitleStep; 