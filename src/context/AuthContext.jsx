import React, { createContext, useState, useContext, useEffect } from "react";
import { setAuthToken } from "../api/api"; // at top

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage on initial load
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    try {
      return savedUser
        ? { ...JSON.parse(savedUser), isAuthenticated: !!token }
        : null;
    } catch (e) {
      console.error("failed to parase user data", e);
      return null;
    }
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token); // ✅ Ensure token is set for all API calls
    }
  }, []);

  const authenticate = (userData, token) => {
    const completeUser = {
      ...userData,
      isAuthenticated: true,
      isOnboarded: userData.isOnboarded || false,
      token: token,
    };

    setUser(completeUser);
    localStorage.setItem("user", JSON.stringify(completeUser));
    localStorage.setItem("token", token);
  };

  const login = (userData, token) => {
    setAuthToken(token); // ✅ Ensures Axios is ready
    authenticate(userData, token);
  };

  const signup = (userData, token) => {
    setAuthToken(token); // ✅ Sets token in Axios
    authenticate({ ...userData, isOnboarded: false }, token); // ✅ Force isOnboarded to false
  };

  //log out function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  //update user profile function
  const updateUserProfile = (updateData) => {
    if (!user) {
      throw new Error("Cannot update profile - user not logged in");
    }
    const updatedUser = {
      ...user,
      ...updateData,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const validateUser = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!userData || !token) {
      throw new Error("User not authenticated");
    }
    try {
      const user = JSON.parse(userData);
      if (!user?.id || user.token !== token) {
        throw new Error("Invalid user session");
      }
      return user;
    } catch (e) {
      throw new Error("Invalid user data");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUserProfile,
        validateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
