import React from 'react';
import { MapPin, Users, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const VenueList = ({ venues }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <div key={venue.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={venue.image}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
              ${venue.price}/hour
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{venue.name}</h3>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{venue.rating}</span>
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{venue.location}</span>
            </div>

            <div className="flex items-center text-gray-600 mb-2">
              <Users className="w-4 h-4 mr-1" />
              <span>Capacity: {venue.capacity} people</span>
            </div>

            <div className="flex items-center text-gray-600 mb-3">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Available: {venue.availableDates}</span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{venue.description}</p>

            <div className="flex justify-between items-center">
              <Link
                to={`/venue/${venue.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Details
              </Link>
              <Link
                to={`/booking/${venue.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenueList; 