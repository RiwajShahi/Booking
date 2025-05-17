import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import components
import HomePage from './component/HomePage';
import VenuesPage from './component/VenuesPage';
import ContactPage from './component/ContactPage';
import LoginPage from './component/LoginPage';
import SignUp from './component/SignUp';
import Profile from './component/Profile';
import VenueDetails from './component/VenueDetails';
import BookingForm from './component/BookingForm';
import Onboarding from './component/Onboarding';
import AddVenue from './component/AddVenue';
import BecomeHostFlow from './component/BecomeHostFlow';
// import BecomeHostLanding from './component/BecomeHostLanding';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/become-host" element={<BecomeHostFlow />} />

          {/* Protected routes */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-venue"
            element={
              <ProtectedRoute>
                <AddVenue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/venues"
            element={
              <ProtectedRoute>
                <VenuesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/venues/:id"
            element={
              <ProtectedRoute>
                <VenueDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
