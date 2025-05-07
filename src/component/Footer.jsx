import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import social and contact icons

const Footer = () => {
    const facebookUrl ='https://www.facebook.com/riwaj.shahi.thakuri.2025/';
    const instagramUrl ='https://www.instagram.com/thakuri_riwaj/';
    const linkedinUrl ='https://www.linkedin.com/in/riwaj-shahi-25333b259/';
  return (
    <footer className="bg-gray-100 py-12 text-gray-700 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">House Booking</h4>
            <p className="text-sm mb-2">
              Making house party booking easy and fun. Find the perfect space for your next celebration.
            </p>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} HouseBooking.com
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Contact Us</h4>
            <div className="flex items-center mb-2">
              <FaEnvelope className="mr-2 text-gray-500" size={16} />
              <a href="mailto:info@yourwebsite.com" className="hover:text-indigo-500 text-sm">HouseBooking.com</a>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-gray-500" size={16} />
              <p className="text-sm">+977 1234567890</p>
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href={facebookUrl} className="text-gray-500 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href={instagramUrl} className="text-gray-500 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href={linkedinUrl} className="text-gray-500 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} />
              </a>
              
            </div>
          </div>
        </div>
        <div className="mt-8 py-4 border-t border-gray-200 text-center text-sm text-gray-600">
          <a href="/privacy" className="mr-4 hover:text-indigo-500">Privacy Policy</a>
          <a href="/terms" className="mr-4 hover:text-indigo-500">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
