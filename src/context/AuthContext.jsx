import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // Remove from localStorage
    localStorage.removeItem('user');
  };

  // Optional: Check if the user session is still valid
  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        try {
          // Here you would typically make an API call to verify the session
          // For now, we'll just keep the user logged in
          console.log('User session is valid');
        } catch (error) {
          console.error('Session invalid:', error);
          logout();
        }
      }
    };

    checkAuth();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 