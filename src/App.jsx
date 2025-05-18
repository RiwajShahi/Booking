import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import components
import HomePage from "./component/HomePage";
import VenuesPage from "./component/VenuesPage";
import ContactPage from "./component/ContactPage";
import LoginPage from "./component/LoginPage";
import SignUp from "./component/SignUp";
import Profile from "./component/Profile";
import VenueDetails from "./component/VenueDetails";
import BookingForm from "./component/BookingForm";
import Onboarding from "./component/Onboarding";
import AddVenue from "./component/AddVenue";
import BecomeHostFlow from "./component/BecomeHostFlow";
import HostDashboard from "./component/HostDashboard";
import HostReservations from "./component/HostReservations";
import HostEarnings from "./component/HostEarnings";
import HostListings from "./component/HostListings";
import CoHostApplication from "./component/CoHostApplication";
import HostMessages from "./component/HostMessages";
import HostChatWindow from "./component/HostChatWindow";
import UserMessages from "./component/UserMessages";
import UserChatWindow from "./component/UserChatWindow";
import ListingEditor from "./component/ListingEditor";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/cohost" element={<CoHostApplication />} />

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
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/dashboard"
            element={
              <ProtectedRoute>
                <HostDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/reservations"
            element={
              <ProtectedRoute>
                <HostReservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/earnings"
            element={
              <ProtectedRoute>
                <HostEarnings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/listings"
            element={
              <ProtectedRoute>
                <HostListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/listings/:id/edit"
            element={
              <ProtectedRoute>
                <ListingEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/messages"
            element={
              <ProtectedRoute>
                <HostMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host/messages/:bookingId"
            element={
              <ProtectedRoute>
                <HostChatWindow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/messages"
            element={
              <ProtectedRoute>
                <UserMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/messages/:bookingId"
            element={
              <ProtectedRoute>
                <UserChatWindow />
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
