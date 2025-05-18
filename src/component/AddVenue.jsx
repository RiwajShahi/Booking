import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const AddVenue = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    price: "",
    capacity: "",
    amenities: [],
    images: [],
    rules: "",
    availability: {
      checkIn: "15:00",
      checkOut: "11:00",
    },
  });

  const amenitiesList = [
    "WiFi",
    "Parking",
    "Kitchen",
    "Air Conditioning",
    "Pool",
    "Gym",
    "Security",
    "Pets Allowed",
    "Wheelchair Accessible",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAmenityChange = (amenity) => {
    setVenueData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];

    for (const file of files) {
      try {
        const reader = new FileReader();
        const imageUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error("Error reading image:", error);
      }
    }

    setVenueData((prev) => ({
      ...prev,
      images: imageUrls,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!venueData.name.trim()) newErrors.name = "Venue name is required";
    if (!venueData.description.trim())
      newErrors.description = "Description is required";
    if (!venueData.address.trim()) newErrors.address = "Address is required";
    if (!venueData.city.trim()) newErrors.city = "City is required";
    if (!venueData.state.trim()) newErrors.state = "State is required";
    if (!venueData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    if (!venueData.price) newErrors.price = "Price is required";
    if (!venueData.capacity) newErrors.capacity = "Capacity is required";
    if (venueData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Create venue object with all required fields
      const venue = {
        id: Date.now(),
        name: venueData.name,
        description: venueData.description,
        address: venueData.address,
        city: venueData.city,
        state: venueData.state,
        zipCode: venueData.zipCode,
        price: parseFloat(venueData.price),
        weekendPrice: parseFloat(venueData.price) * 1.2, // 20% higher for weekends
        capacity: parseInt(venueData.capacity),
        amenities: venueData.amenities,
        images: venueData.images,
        rules: venueData.rules,
        availability: venueData.availability,
        hostId: user.id,
        hostName: `${user.firstName} ${user.lastName}`,
        status: "draft", // draft, published, or archived
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stats: {
          views: 0,
          saves: 0,
          inquiries: 0,
          bookings: 0,
        },
        settings: {
          instantBook: false,
          autoReply: false,
        },
      };

      // Get existing venues from localStorage
      let existingVenues = [];
      try {
        const storedVenues = localStorage.getItem("venues");
        if (storedVenues) {
          existingVenues = JSON.parse(storedVenues);
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }

      // Add new venue to the array
      const updatedVenues = [...existingVenues, venue];

      // Save updated venues array to localStorage
      localStorage.setItem("venues", JSON.stringify(updatedVenues));

      // Also save to hostListings for the host dashboard
      let hostListings = [];
      try {
        const storedHostListings = localStorage.getItem("hostListings");
        if (storedHostListings) {
          hostListings = JSON.parse(storedHostListings);
        }
      } catch (error) {
        console.error("Error reading hostListings from localStorage:", error);
      }

      const updatedHostListings = [...hostListings, venue];
      localStorage.setItem("hostListings", JSON.stringify(updatedHostListings));

      // Redirect to the new listing editor
      navigate(`/host/listings/${venue.id}/edit`, { replace: true });
    } catch (error) {
      console.error("Failed to add venue:", error);
      setErrors({
        submit: "Failed to add venue. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If user is not a host, redirect to home
  if (user?.role !== "host") {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add New Venue
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {errors.submit}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Venue Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={venueData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price per Night ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={venueData.price}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.price ? "border-red-300" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maximum Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    id="capacity"
                    value={venueData.capacity}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.capacity ? "border-red-300" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.capacity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.capacity}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={venueData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.address ? "border-red-300" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={venueData.city}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.city ? "border-red-300" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={venueData.state}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.state ? "border-red-300" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={venueData.zipCode}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      errors.zipCode ? "border-red-300" : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={venueData.description}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.description ? "border-red-300" : "border-gray-300"
                  } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={amenity}
                        checked={venueData.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={amenity}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Venue Images
                </label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                />
                {errors.images && (
                  <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                )}
                {venueData.images.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">
                    {venueData.images.length} image(s) selected
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="rules"
                  className="block text-sm font-medium text-gray-700"
                >
                  House Rules
                </label>
                <textarea
                  name="rules"
                  id="rules"
                  rows={3}
                  value={venueData.rules}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter any specific rules or guidelines for guests"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="checkIn"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Check-in Time
                  </label>
                  <input
                    type="time"
                    name="availability.checkIn"
                    id="checkIn"
                    value={venueData.availability.checkIn}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkOut"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Check-out Time
                  </label>
                  <input
                    type="time"
                    name="availability.checkOut"
                    id="checkOut"
                    value={venueData.availability.checkOut}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Adding Venue..." : "Add Venue"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVenue;
