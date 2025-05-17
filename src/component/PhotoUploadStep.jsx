import React, { useRef } from 'react';

const MIN_PHOTOS = 5;

const PhotoUploadStep = ({ photos, setPhotos, onBack, onNext }) => {
  const fileInputRef = useRef();

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files].slice(0, 10)); // max 10 photos
  };

  const handleAddPhotosClick = () => {
    fileInputRef.current.click();
  };

  const handleRemovePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const canProceed = photos.length >= MIN_PHOTOS;

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Add some photos of your house</h2>
      <p className="text-center text-gray-500 mb-8 max-w-xl">You'll need {MIN_PHOTOS} photos to get started. You can add more or make changes later.</p>
      <div className="w-full max-w-xl flex flex-col items-center mb-12">
        <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 py-12 mb-6">
          {photos.length === 0 ? (
            <>
              <span className="text-6xl mb-4">📷</span>
              <button
                type="button"
                onClick={handleAddPhotosClick}
                className="mt-2 px-6 py-2 rounded-lg border border-gray-400 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200"
              >
                Add photos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-3 justify-center mb-4">
                {photos.map((file, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-lg border shadow"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                      title="Remove photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddPhotosClick}
                className="mt-2 px-6 py-2 rounded-lg border border-gray-400 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200"
              >
                Add more photos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </>
          )}
        </div>
        {!canProceed && (
          <p className="text-red-500 text-sm mt-2">Please upload at least {MIN_PHOTOS} photos.</p>
        )}
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

export default PhotoUploadStep; 