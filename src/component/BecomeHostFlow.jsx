import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DescribeHouseOrApartment from './DescribeHouseOrApartment';
import housegif from '../assets/images/home.gif';
import logo from '../assets/images/logo.png';
import PhotoUploadStep from './PhotoUploadStep';
import TitleStep from './TitleStep';
import SetPriceStep from './SetPriceStep';
import WeekendPriceStep from './WeekendPriceStep';



const essentials = [
  {
    icon: '🪪',
    title: 'Verified Identity',
    description: 'Hosts and guests must have a verified profile for trust and safety.'
  },
  {
    icon: '📸',
    title: 'Accurate Listing',
    description: 'Provide clear photos and honest details about your space.'
  },
  {
    icon: '🧹',
    title: 'Cleanliness',
    description: 'Maintain a clean and welcoming environment for every guest.'
  },
  {
    icon: '💬',
    title: 'Communication',
    description: 'Respond promptly to guest inquiries and booking requests.'
  },
  {
    icon: '📋',
    title: 'House Rules',
    description: 'Set clear expectations for guests with your house rules.'
  },
  {
    icon: '🛎️',
    title: 'Support',
    description: 'Hostsy offers 24/7 support and resources for every host.'
  }
];

const propertyTypes = [
  { label: 'House', icon: '🏠' },
  { label: 'Apartment', icon: '🏢' },
 
];

const privacyTypes = [
  {
    label: 'An entire home',
    description: 'Guests have the whole place to themselves.',
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="6" y="14" width="20" height="12" rx="2" stroke="#222" strokeWidth="2"/><rect x="10" y="18" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="18" y="18" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="14" y="10" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/></svg>
    )
  },
  {
    label: 'A room',
    description: 'Guests have their own room in a home, plus access to shared spaces.',
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="6" y="14" width="20" height="12" rx="2" stroke="#222" strokeWidth="2"/><rect x="10" y="18" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="18" y="18" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="14" y="10" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/></svg>
    )
  },
  {
    label: 'A shared room in a hostel',
    description: 'Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7.',
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="6" y="14" width="20" height="12" rx="2" stroke="#222" strokeWidth="2"/><rect x="10" y="18" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="18" y="18" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="14" y="10" width="4" height="4" rx="1" stroke="#222" strokeWidth="2"/><rect x="2" y="6" width="28" height="6" rx="2" stroke="#222" strokeWidth="2"/></svg>
    )
  }
];

const occupancyOptions = [
  { label: 'Me', icon: '👤' },
  { label: 'My family', icon: '👨‍👩‍👧‍👦' },
  { label: 'Other guests', icon: '👥' },
  { label: 'Roommates', icon: '🧑‍🤝‍🧑' },
];

const steps = [
  {
    title: 'Tell us about your place',
    description: 'Share some basic info, like where it is and how many guests can stay.',
    icon: '🛏️'
  },
  {
    title: 'Make it stand out',
    description: "Add 5 or more photos plus a title and description—we'll help you out.",
    icon: '🖼️'
  },
  {
    title: 'Finish up and publish',
    description: 'Choose a starting price, verify a few details, then publish your listing.',
    icon: '🚪'
  }
];

// Define step keys for each property type
const flowMap = {
  House: ['privacy', 'location', 'basics', 'occupancy', 'describe', 'photos', 'title', 'finish', 'setPrice', 'setWeekendPrice', 'discounts'],
  Apartment: ['privacy', 'location', 'basics', 'occupancy', 'describe', 'photos', 'title', 'finish', 'setPrice', 'setWeekendPrice', 'discounts'],
  'Wedding Hall': ['privacy', 'location', 'occupancy', 'describeHall'],
  'Conference Hall': ['privacy', 'location', 'occupancy', 'describeHall'],
};

const BecomeHostFlow = () => {
  // 0: hero/essentials/co-host, 1: steps overview
  const [step, setStep] = useState(0); // Only for intro steps
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState([]); // Array of step keys
  const [flowIndex, setFlowIndex] = useState(0); // Index in selectedFlow
  const [selectedPrivacy, setSelectedPrivacy] = useState(null);
  const [address, setAddress] = useState('');
  const [guests, setGuests] = useState(2);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bedroomLock, setBedroomLock] = useState(null);
  const [occupancy, setOccupancy] = useState(null);
  // Step 7 state
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Hall-specific state
  const [capacity, setCapacity] = useState('');
  const [eventTypes, setEventTypes] = useState([]);
  const [price, setPrice] = useState('');
  const [weekendPrice, setWeekendPrice] = useState('');
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const navigate = useNavigate();
  const [listingCreated, setListingCreated] = useState(false);

  

  // Progress bar logic
  const totalSteps = selectedFlow.length;
  const showProgress = step > 1 || (step === 2 && selectedFlow.length > 0);
  const progressPercent = showProgress && totalSteps > 0 ? (flowIndex / (totalSteps - 1)) * 100 : 0;
  const ProgressBar = () => (
    <div className="w-full h-2 bg-gray-200 rounded-full mt-0 mb-8">
      <div
        className="h-2 bg-black rounded-full transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );

  // Step 0: Hero/essentials/co-host page
  if (step === 0) {
    
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-32 overflow-hidden">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-100 opacity-30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-pink-200 opacity-30 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>
        {/* Setup Hostsy Button Top Right */}
        <div className="fixed top-8 right-8 z-50">
          <button
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-full shadow-2xl text-lg font-bold hover:from-pink-600 hover:to-indigo-600 transition-all duration-200 border-4 border-white"
            onClick={() => setStep(1)}
          >
            Setup Hostsy
          </button>
        </div>
        {/* Hero Section: Illustration + Text */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 pt-32 pb-16 w-full max-w-6xl mx-auto">
          {/* Illustration */}
          <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-12 flex justify-center w-full md:w-auto">
            <img
              src={housegif}
              alt="Floating House"
              className="w-[320px] h-auto drop-shadow-2xl animate-float bg-white/80 rounded-3xl p-4"
              style={{ filter: 'drop-shadow(0 8px 32px rgba(80,80,180,0.18))' }}
            />
          </div>
          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start justify-center w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-lg leading-tight">
              <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">Hostsy It.</span><br />
              <span className="text-gray-800">You could earn money as a Host.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
              Host your home on Hostsy and unlock new opportunities. Share your space, meet people from around the world, and earn extra income—all on your terms.
            </p>
            {/* Trust Badge/Testimonial */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
              
            </div>
          </div>
        </div>
        {/* Essentials Section */}
        <div className="relative z-20 w-full max-w-6xl mx-auto mt-8 mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Essentials to Become a Host</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {essentials.map((item) => (
              <div key={item.title} className="flex flex-col items-center bg-white/90 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-200">
                <span className="text-4xl mb-4 drop-shadow-lg">{item.icon}</span>
                <h3 className="text-lg font-bold mb-2 text-gray-900 text-center">{item.title}</h3>
                <p className="text-gray-500 text-center text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Expanded Co-host Section */}
        <div className="relative z-20 w-full max-w-3xl mb-24">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">What is a Co-host?</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            A co-host is someone you trust (a friend, family member, or professional) who helps you manage your listing and guests.
          </p>
          <div className="flex justify-center mb-8">
            <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-8 shadow-xl max-w-xl w-full">
              <span className="text-4xl mr-0 md:mr-6 mb-4 md:mb-0">🤝</span>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">What can a co-host do?</h3>
                <ul className="text-blue-800 text-base list-disc list-inside space-y-1 mb-4 text-left">
                  <li><span className="mr-2">💬</span>Respond to guest messages and booking requests</li>
                  <li><span className="mr-2">🔑</span>Help with check-in and check-out</li>
                  <li><span className="mr-2">🧹</span>Coordinate cleaning and maintenance</li>
                  <li><span className="mr-2">🗓️</span>Update your listing details and calendar</li>
                  <li><span className="mr-2">⭐</span>Write reviews for guests</li>
                  <li><span className="mr-2">🚨</span>Handle emergencies or guest issues</li>
                </ul>
                <h4 className="text-md font-semibold text-blue-900 mb-1 mt-4">Why add a co-host?</h4>
                <p className="text-blue-800 mb-3">
                  Share responsibilities and reduce your workload. Get local help if you're traveling or busy, and provide a better guest experience with faster responses and support.
                </p>
                <h4 className="text-md font-semibold text-blue-900 mb-1 mt-4">How does it work?</h4>
                <p className="text-blue-800">
                  Invite a co-host from your Hostsy dashboard. You control what your co-host can do (full or limited access), and you can agree to share a portion of your hosting income.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Steps overview page
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-row bg-gradient-to-br from-teal-100 via-purple-50 to-blue-100 relative overflow-hidden font-sans">
        {/* Playful Accent Blobs */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-200 opacity-30 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-teal-200 opacity-30 rounded-full blur-3xl z-0" />
        {/* Steps Card (Left) */}
        <div className="flex-1 flex flex-col justify-center items-end z-10">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-md mr-12">
            <h2 className="text-2xl font-extrabold text-teal-700 mb-8 tracking-tight">Your Hostsy Journey</h2>
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="flex items-center p-4 rounded-xl transition-all duration-200 group hover:bg-teal-50 hover:shadow-lg cursor-pointer"
                  style={{ borderLeft: `6px solid ${['#06b6d4', '#a78bfa', '#facc15'][idx]}` }}
                >
                  <div className="flex-shrink-0 mr-5 text-3xl" style={{ color: ['#06b6d4', '#a78bfa', '#facc15'][idx] }}>{step.icon}</div>
                  <div>
                    <div className="font-bold text-lg text-gray-900 mb-1 group-hover:text-teal-700">{step.title}</div>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Hero/CTA (Right) */}
        <div className="flex-1 flex flex-col justify-center items-start pl-12 z-10">
          {/* Custom Illustration (friendly host avatar) */}
          <img
            src={logo}
            alt="Hostsy Avatar"
            className="w-64 h-64 mb-8 drop-shadow-2xl animate-float"
            style={{ filter: 'drop-shadow(0 8px 32px rgba(80,80,180,0.18))' }}
          />
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">Welcome to Hostsy</span>
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-xl">Start your journey as a host and unlock new opportunities. <span className="text-teal-600 font-semibold">Share your space, earn income, and connect globally.</span></p>
          <div className="mb-8">
            
          </div>
          <button
            className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white rounded-full shadow-2xl text-xl font-bold hover:from-teal-600 hover:to-purple-600 transition-all duration-200 animate-bounce border-4 border-white focus:outline-none focus:ring-4 focus:ring-teal-200"
            onClick={() => setStep(2)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            Get started
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Property type selection
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-teal-100 relative overflow-hidden font-sans">
        {/* Accent Blobs */}
        <div className="absolute -top-32 -left-32 w-[350px] h-[350px] bg-purple-200 opacity-30 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-200 opacity-30 rounded-full blur-3xl z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Which of these best describes your place?</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-xl">Pick the type of space you want to host. This helps us tailor your experience and show you the right options!</p>
          <div className="flex flex-row gap-8 justify-center items-center">
            {propertyTypes.map((type, idx) => (
              <button
                key={type.label}
                onClick={() => {
                  setSelectedProperty(idx);
                  const flow = flowMap[type.label] || [];
                  setSelectedFlow(flow);
                  setFlowIndex(0);
                  setStep(3); // Enter dynamic flow
                }}
                className={`flex flex-col items-center justify-center w-44 h-48 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border-2 border-transparent hover:border-teal-400 hover:scale-105 transition-all duration-200 cursor-pointer group ${selectedProperty === idx ? 'ring-4 ring-teal-300' : ''}`}
                style={{ boxShadow: '0 8px 32px 0 rgba(80,80,180,0.10)' }}
              >
                {/* Modern icon or emoji */}
                <span className="text-6xl mb-4 drop-shadow-lg animate-float" style={{ fontFamily: 'inherit' }}>{type.icon}</span>
                <span className="text-lg font-bold text-gray-800 group-hover:text-teal-600">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Dynamic flow steps (step === 3)
  if (step === 3 && selectedFlow.length > 0) {
    const selectedPropertyType = propertyTypes[selectedProperty]?.label;
    const currentStepKey = selectedFlow[flowIndex];
    // Render based on currentStepKey
    if (currentStepKey === 'privacy') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What type of place will guests have?</h2>
            <div className="flex flex-col gap-6 w-full max-w-xl mx-auto mb-16">
              {privacyTypes.map((type, idx) => (
                <button
                  key={type.label}
                  onClick={() => setSelectedPrivacy(idx)}
                  className={`flex items-center justify-between border rounded-xl px-8 py-8 text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30 w-full
                    ${selectedPrivacy === idx ? 'border-black shadow-lg bg-gray-50' : 'border-gray-300 bg-white hover:border-black/40'}`}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="font-semibold text-lg mb-1">{type.label}</span>
                    <span className="text-gray-500 text-base font-normal">{type.description}</span>
                  </div>
                  <span className="text-3xl ml-6">{type.icon}</span>
                </button>
              ))}
            </div>
            <div className="fixed bottom-8 right-8 flex space-x-4">
              {flowIndex > 0 && (
                <button
                  onClick={() => setFlowIndex(flowIndex - 1)}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all duration-200"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => selectedPrivacy !== null && setFlowIndex(flowIndex + 1)}
                disabled={selectedPrivacy === null}
                className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200
                  ${selectedPrivacy !== null ? 'bg-black text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (currentStepKey === 'location') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Where's your place located?</h2>
            <p className="text-center text-gray-500 mb-8">Your address is only shared with guests after they've made a reservation.</p>
            <div className="w-full max-w-xl mb-6 relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">📍</span>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 text-lg shadow-sm"
              />
            </div>
            {/* Map placeholder */}
            <div className="w-full max-w-xl h-72 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center mb-12">
              <span className="text-gray-400 text-lg">[Map will be shown here]</span>
            </div>
            {/* Back and Next buttons */}
            <div className="fixed bottom-8 right-8 flex space-x-4">
              {flowIndex > 0 && (
                <button
                  onClick={() => setFlowIndex(flowIndex - 1)}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all duration-200"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => address.trim() && setFlowIndex(flowIndex + 1)}
                disabled={!address.trim()}
                className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200
                  ${address.trim() ? 'bg-black text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (currentStepKey === 'basics') {
      const canProceed = guests > 0 && bedrooms > 0 && beds > 0 && bedroomLock !== null;
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Let's start with the basics</h2>
            <div className="w-full max-w-xl mx-auto">
              <h3 className="text-xl font-semibold mb-6">How many people can stay here?</h3>
              {/* Counters */}
              <div className="space-y-6 mb-8">
                {/* Guests */}
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="font-medium text-gray-800">Guests</span>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-2xl text-gray-500 hover:bg-gray-100"
                    >
                      –
                    </button>
                    <span className="w-6 text-center text-lg font-semibold">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests(g => g + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-2xl text-gray-500 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Bedrooms */}
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="font-medium text-gray-800">Bedrooms</span>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setBedrooms(b => Math.max(1, b - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-2xl text-gray-500 hover:bg-gray-100"
                    >
                      –
                    </button>
                    <span className="w-6 text-center text-lg font-semibold">{bedrooms}</span>
                    <button
                      type="button"
                      onClick={() => setBedrooms(b => b + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-2xl text-gray-500 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Beds */}
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="font-medium text-gray-800">Beds</span>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setBeds(b => Math.max(1, b - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-2xl text-gray-500 hover:bg-gray-100"
                    >
                      –
                    </button>
                    <span className="w-6 text-center text-lg font-semibold">{beds}</span>
                    <button
                      type="button"
                      onClick={() => setBeds(b => b + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-2xl text-gray-500 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {/* Bedroom lock radio */}
              <div className="mb-8">
                <h4 className="text-lg font-medium mb-3">Does every bedroom have a lock?</h4>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="bedroomLock"
                      value="yes"
                      checked={bedroomLock === true}
                      onChange={() => setBedroomLock(true)}
                      className="form-radio h-5 w-5 text-black"
                    />
                    <span className="text-gray-800">Yes</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="bedroomLock"
                      value="no"
                      checked={bedroomLock === false}
                      onChange={() => setBedroomLock(false)}
                      className="form-radio h-5 w-5 text-black"
                    />
                    <span className="text-gray-800">No</span>
                  </label>
                </div>
              </div>
            </div>
            {/* Back and Next buttons */}
            <div className="fixed bottom-8 right-8 flex space-x-4">
              {flowIndex > 0 && (
                <button
                  onClick={() => setFlowIndex(flowIndex - 1)}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all duration-200"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => canProceed && setFlowIndex(flowIndex + 1)}
                disabled={!canProceed}
                className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200
                  ${canProceed ? 'bg-black text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (currentStepKey === 'occupancy') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Who else might be there?</h2>
            <p className="text-center text-gray-500 mb-8">Guests need to know whether they'll encounter other people during their stay.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-xl mx-auto mb-8 w-full">
              {occupancyOptions.map((option, idx) => (
                <button
                  key={option.label}
                  onClick={() => setOccupancy(idx)}
                  className={`flex flex-col items-center justify-center border rounded-xl px-8 py-8 text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30 w-full
                    ${occupancy === idx ? 'border-black shadow-lg bg-gray-50' : 'border-gray-300 bg-white hover:border-black/40'}`}
                >
                  <span className="text-3xl mb-2">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-4">We'll show this information on your listing and in search results.</p>
            <div className="fixed bottom-8 right-8 flex space-x-4">
              {flowIndex > 0 && (
                <button
                  onClick={() => setFlowIndex(flowIndex - 1)}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all duration-200"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => occupancy !== null && setFlowIndex(flowIndex + 1)}
                disabled={occupancy === null}
                className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200
                  ${occupancy !== null ? 'bg-black text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (currentStepKey === 'describe') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <DescribeHouseOrApartment
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
            onBack={() => setFlowIndex(flowIndex - 1)}
            onNext={() => setFlowIndex(flowIndex + 1)}
          />
        </div>
      );
    }
    if (currentStepKey === 'photos') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <PhotoUploadStep
            photos={photos}
            setPhotos={setPhotos}
            onBack={() => setFlowIndex(flowIndex - 1)}
            onNext={() => setFlowIndex(flowIndex + 1)}
          />
        </div>
      );
    }
    if (currentStepKey === 'title') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <TitleStep
            title={title}
            setTitle={setTitle}
            onBack={() => setFlowIndex(flowIndex - 1)}
            onNext={() => setFlowIndex(flowIndex + 1)}
          />
        </div>
      );
    }
    if (currentStepKey === 'finish') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Great progress!</h2>
            <p className="text-center text-gray-500 mb-8 max-w-xl">You've completed the basic setup. Now let's set your pricing.</p>
            <div className="w-full max-w-xl bg-gray-50 rounded-2xl p-8 mb-12">
              <h3 className="text-xl font-semibold mb-4">What's next?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">✓</span>
                  <span>Set your weekday base price</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-2">✓</span>
                  <span>Set your weekend price</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">○</span>
                  <span>Review and publish your listing</span>
                </li>
              </ul>
            </div>
            <div className="fixed bottom-8 right-8 flex space-x-4">
              <button
                onClick={() => setFlowIndex(flowIndex - 1)}
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setFlowIndex(flowIndex + 1)}
                className="px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 bg-teal-500 text-white hover:bg-teal-600"
              >
                Continue to Pricing
              </button>
            </div>
          </div>
        </div>
      );
    }
   
    if (currentStepKey === 'setPrice') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <SetPriceStep
            price={price}
            setPrice={setPrice}
            onBack={() => setFlowIndex(flowIndex - 1)}
            onNext={() => setFlowIndex(flowIndex + 1)}
          />
        </div>
      );
    }
    if (currentStepKey === 'setWeekendPrice') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <WeekendPriceStep
            weekendPrice={weekendPrice}
            setWeekendPrice={setWeekendPrice}
            onBack={() => setFlowIndex(flowIndex - 1)}
            onNext={() => setFlowIndex(flowIndex + 1)}
          />
        </div>
      );
    }
    if (currentStepKey === 'discounts') {
      return (
        <div className="min-h-screen flex flex-col bg-white">
          {showProgress && <div className="w-full px-0 md:px-8 pt-6"><ProgressBar /></div>}
          <DiscountsStep
            selectedDiscounts={selectedDiscounts}
            setSelectedDiscounts={setSelectedDiscounts}
            onBack={() => setFlowIndex(flowIndex - 1)}
            onCreate={() => {
              setListingCreated(true);
              setTimeout(() => {
                navigate('/host/dashboard');
              }, 2000); // 2s delay before redirect
            }}
            listingCreated={listingCreated}
          />
        </div>
      );
    }
    // Fallback for unknown step
    return null;
  }

  // Fallback (should not render)
  return null;
};

export default BecomeHostFlow;

// --- DiscountsStep component ---
const discountOptions = [
  {
    label: 'New listing promotion',
    description: 'Offer 20% off your first 3 bookings',
    value: 'new_listing',
    percent: 20,
  },
  {
    label: 'Last-minute discount',
    description: 'For stays booked 14 days or less before arrival',
    value: 'last_minute',
    percent: 8,
  },
  {
    label: 'Weekly discount',
    description: 'For stays of 7 nights or more',
    value: 'weekly',
    percent: 10,
  },
  {
    label: 'Monthly discount',
    description: 'For stays of 28 nights or more',
    value: 'monthly',
    percent: 20,
  },
];

function DiscountsStep({ selectedDiscounts, setSelectedDiscounts, onBack, onCreate, listingCreated }) {
  const navigate = useNavigate();

  const toggleDiscount = (value) => {
    setSelectedDiscounts((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  // Redirect immediately when listingCreated is true
  React.useEffect(() => {
    if (listingCreated) {
      navigate('/host/dashboard');
    }
  }, [listingCreated, navigate]);

  if (listingCreated) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-600">🎉 Listing Created!</h2>
        <p className="text-lg text-gray-700 mb-8 text-center">Your listing has been created successfully.<br />Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Add discounts</h2>
      <p className="text-center text-gray-500 mb-8 max-w-xl">
        Help your place stand out to get booked faster and earn your first reviews.
      </p>
      <div className="flex flex-col gap-6 w-full max-w-xl mx-auto mb-8">
        {discountOptions.map((opt) => (
          <div
            key={opt.value}
            className="flex items-center justify-between border rounded-xl px-8 py-6 bg-gray-50"
          >
            <div>
              <div className="text-2xl font-bold mb-1">{opt.percent}%</div>
              <div className="font-semibold">{opt.label}</div>
              <div className="text-gray-500 text-sm">{opt.description}</div>
            </div>
            <input
              type="checkbox"
              checked={selectedDiscounts.includes(opt.value)}
              onChange={() => toggleDiscount(opt.value)}
              className="w-6 h-6 accent-black"
            />
          </div>
        ))}
      </div>
      <div className="text-gray-400 text-sm mb-8">
        Only one discount will be applied per stay.
      </div>
      <div className="fixed bottom-8 right-8 flex space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={onCreate}
          className="px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 bg-black text-white hover:bg-gray-900"
        >
          Create Listing
        </button>
      </div>
    </div>
  );
}
