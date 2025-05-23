import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');  // Get token from localStorage
  const userRole = localStorage.getItem('role'); // Assuming the user role is stored in localStorage

  // Check if the user is authenticated and has the required role
  if (!token) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (userRole !== requiredRole) {
    // If the role doesn't match the required one, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated and has the required role, render the children (AdminDashboard)
  return children;
};

export default ProtectedRoute;
