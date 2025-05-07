import React from 'react';

const Hero = ({ title, subtitle, image, buttonText, onButtonClick }) => {
  return (
    <section className="bg-gray-100 py-40 relative overflow-hidden">
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      )}
      <div className="container mx-auto text-center relative z-10">
        {title && (
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        )}
        {subtitle && (
          <p className="text-lg text-gray-600 mb-8">{subtitle}</p>
        )}
        {buttonText && onButtonClick && (
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;