import React, { useState } from 'react';
import { Calendar, Users, DollarSign } from 'lucide-react';

const BookingForm = ({ venue, onSubmit }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    guests: '',
    specialRequests: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookingData);
  };

  const calculateTotal = () => {
    if (!bookingData.startTime || !bookingData.endTime) return 0;
    
    const start = new Date(`2000-01-01T${bookingData.startTime}`);
    const end = new Date(`2000-01-01T${bookingData.endTime}`);
    const hours = (end - start) / (1000 * 60 * 60);
    
    return (hours * venue.price).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#232946] py-12">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book {venue.name}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              name="date"
              value={bookingData.date}
              onChange={handleInputChange}
              required
              className="pl-10 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Guest Count */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              value={bookingData.guests}
              onChange={handleInputChange}
              min="1"
              max={venue.capacity}
              required
              className="pl-10 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <input
              type="text"
              name="contactName"
              placeholder="Your Name"
              value={bookingData.contactName}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="email"
              name="contactEmail"
              placeholder="Your Email"
              value={bookingData.contactEmail}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="tel"
              name="contactPhone"
              placeholder="Your Phone"
              value={bookingData.contactPhone}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Special Requests */}
          <div>
            <textarea
              name="specialRequests"
              placeholder="Special Requests (Optional)"
              value={bookingData.specialRequests}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Hours:</span>
              <span className="font-medium">
                {bookingData.startTime && bookingData.endTime
                  ? ((new Date(`2000-01-01T${bookingData.endTime}`) - new Date(`2000-01-01T${bookingData.startTime}`)) / (1000 * 60 * 60)).toFixed(1)
                  : '0'} hours
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Price:</span>
              <span className="text-xl font-semibold text-blue-600">
                ${calculateTotal()}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm; 