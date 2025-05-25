import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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

// Route configuration (cleaner organization)
const routeConfig = [
  // Public routes
  { path: "/", element: <HomePage />, protected: false },
  { path: "/login", element: <LoginPage />, protected: false },
  { path: "/signUp", element: <SignUp />, protected: false },
  { path: "/become-host", element: <BecomeHostFlow />, protected: false },
  { path: "/venues", element: <VenuesPage />, protected: false },
  { path: "/contact", element: <ContactPage />, protected: false },
  { path: "/venues/:id", element: <VenueDetails />, protected: false },
  { path: "/cohost", element: <CoHostApplication />, protected: false },

  // Protected routes
  { 
    path: "/onboarding", element: <Onboarding />, protected: true 
  
  
  },
  { path: "/add-venue", element: <AddVenue />, protected: true },
  { path: "/profile", element: <Profile />, protected: true },
  { path: "/booking/:id", element: <BookingForm />, protected: true },
  
  // Host routes
  { path: "/host/dashboard", element: <HostDashboard />, protected: true },
  { path: "/host/reservations", element: <HostReservations />, protected: true },
  { path: "/host/earnings", element: <HostEarnings />, protected: true },
  { path: "/host/listings", element: <HostListings />, protected: true },
  { path: "/host/listings/:id/edit", element: <ListingEditor />, protected: true },
  { path: "/host/messages", element: <HostMessages />, protected: true },
  { path: "/host/messages/:bookingId", element: <HostChatWindow />, protected: true },
  
  // User routes
  { path: "/user/messages", element: <UserMessages />, protected: true },
  { path: "/user/messages/:bookingId", element: <UserChatWindow />, protected: true },
];

function App() {
  const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  //case 1: auth state still loading (show spinner)
  if (user === undefined) {
    return <LoadingSpinner />;
  }
  

  // Case 2: Not authnenticated redirect to login
  if (!user?.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Case3: authnticated but not onboarded allowOnly /onboarding
  if (!user?.isOnboarded && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // Case 4:already onboarded block access to /onboarding
  if (location.pathname === '/onboarding' && user?.isOnboarded) {
    return <Navigate to="/dashboard" replace />;
  }
  //case 5: authenticated + onboarded allow access
  return children;
};

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {routeConfig.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute>
                    {route.element}
                  </ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;