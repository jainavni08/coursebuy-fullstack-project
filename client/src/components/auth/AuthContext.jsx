import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPurchasedCourses, setHasPurchasedCourses] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      checkPurchasedCourses(token);
      fetchUserRole(token);
    }
  }, []);

  const checkPurchasedCourses = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/purchased/purchased-courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Purchased courses:', response.data); // Log the API response
      setHasPurchasedCourses(response.data.length > 0);
    } catch (error) {
      console.error('Error checking purchased courses:', error);
    }
  };

  const fetchUserRole = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/auth/user-role', { // Example API endpoint to get user role
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { role } = response.data;
      setUserRole(role); // Set the user's role
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
    const token = localStorage.getItem('token');
    if (token) {
      checkPurchasedCourses(token);
      fetchUserRole(token);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasPurchasedCourses(false);
    setUserRole(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, hasPurchasedCourses, userRole, login, logout }}>
    {children}
  </AuthContext.Provider>
  );
};