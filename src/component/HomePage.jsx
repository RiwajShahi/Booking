import React from 'react';
import Hero from './Hero';
import Venues from './Venues';
import PopularDestinations from './PopularDestinations';
import Testimonials from './Testimonials';
import Footer from './Footer';
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#2d3450]">
      <NavBar />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative">
          <Hero />
        </div>
        {/* Main Content - All sections load simultaneously */}
        <div className="relative">
          <PopularDestinations />
          <Venues />
          <Testimonials />
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;