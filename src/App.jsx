import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './component/LoadingScreen';
import NavBar from './component/NavBar';
import { AuthProvider, useAuth } from './context/AuthContext';
import AnimatedBackground from './component/AnimatedBackground';

// Import existing components
import HomePage from './component/HomePage';
import VenuesPage from './component/VenuesPage';
import ContactPage from './component/ContactPage';
import LoginPage from './component/LoginPage';
import SignUp from './component/SignUp';
import Profile from './component/Profile';
import VenueDetails from './component/VenueDetails';
import BookingForm from './component/BookingForm';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Layout component for pages that should have NavBar
const MainLayout = ({ children, isAuthPage = false }) => {
  return (
    <>
      {!isAuthPage && <AnimatedBackground />}
      <NavBar />
      {children}
    </>
  );
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <div className="min-h-screen">
          <Routes location={location} key={location.pathname}>
            {/* Auth routes without NavBar */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUp />} />

            {/* Public routes with NavBar */}
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/venues" element={<MainLayout><VenuesPage /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />

            {/* Protected routes with NavBar */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/venues/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <VenueDetails />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/booking/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <BookingForm />
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
