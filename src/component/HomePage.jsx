import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Venues from './Venues';
import PopularDestinations from './PopularDestinations';
import Footer from './Footer';
import SearchBar from './SearchBar';

const HomePage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Planner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      text: "The venue booking process was seamless and the staff was incredibly helpful. Our event was a huge success!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Corporate Client",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      text: "Professional service and beautiful venues. Made our company event planning much easier."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Wedding Planner",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      text: "Found the perfect venue for our clients' wedding. The platform made it easy to compare options."
    }
  ];

  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
    // Handle search logic here
  };

  const popularDestinations = [
    {
      id: 1,
      name: 'Grand Ballroom',
      image: '/venue1.jpg',
      price: 5000,
      rating: 4.8,
      location: 'New York',
      capacity: 500
    },
    {
      id: 2,
      name: 'Skyline Terrace',
      image: '/venue2.jpg',
      price: 3500,
      rating: 4.6,
      location: 'Los Angeles',
      capacity: 300
    },
    {
      id: 3,
      name: 'Garden Pavilion',
      image: '/venue3.jpg',
      price: 2800,
      rating: 4.9,
      location: 'Miami',
      capacity: 200
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-black/50"></div>
        <Hero />
      </div>

      {/* Search Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Popular Destinations Section */}
        <div className="relative bg-gradient-to-b from-white via-blue-50 to-purple-50">
          <div className="relative">
            <PopularDestinations />
          </div>
        </div>

        {/* Venues Section */}
        <div className="relative bg-gradient-to-b from-purple-50 via-pink-50 to-white">
          <div className="relative">
            <Venues />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="relative bg-gradient-to-b from-white via-blue-50 to-purple-50">
          <div className="relative">
            <section className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                  <p className="text-lg text-gray-600">Hear from our satisfied customers about their experience</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;