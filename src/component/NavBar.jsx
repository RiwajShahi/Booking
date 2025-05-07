
import React, { useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import{Link} from "react-router-dom"

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-gray-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-white">Booking</div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#" className="text-gray-600 hover:text-cyan-400">Home</a>
            <a href="#" className="text-gray-600 hover:text-cyan-400">About</a>
            <a href="#" className="text-gray-600 hover:text-cyan-400">Services</a>
            <a href="#" className="text-gray-600 hover:text-cyan-400">Contact</a>

            <button className="relative p-2 text-gray-600 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 font-blue-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pt-2 pb-4 space-y-2">
          <a href="#" className="block text-gray-600 hover:text-cyan-400">Home</a>
          <a href="#" className="block text-gray-600 hover:text-cyan-400">About</a>
          <a href="#" className="block text-gray-600 hover:text-cyan-400">Services</a>
          <a href="#" className="block text-gray-600 hover:text-cyan-400">Contact</a>

          <div className="flex justify-between items-center mt-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-400">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;