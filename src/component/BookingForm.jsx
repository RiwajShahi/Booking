import React, { useState } from 'react';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';

const BookingForm = ({ venue, onSubmit }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book {venue.name}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                name="startTime"
                value={bookingData.startTime}
                onChange={handleInputChange}
                required
                className="pl-10 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                name="endTime"
                value={bookingData.endTime}
                onChange={handleInputChange}
                required
                className="pl-10 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
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
          <h3 className="text-lg font-medium text-gray-700">Contact Information</h3>
          
          <input
            type="text"
            name="contactName"
            placeholder="Full Name"
            value={bookingData.contactName}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="email"
            name="contactEmail"
            placeholder="Email Address"
            value={bookingData.contactEmail}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="tel"
            name="contactPhone"
            placeholder="Phone Number"
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
            placeholder="Special Requests or Additional Information"
            value={bookingData.specialRequests}
            onChange={handleInputChange}
            rows="4"
            className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm; 