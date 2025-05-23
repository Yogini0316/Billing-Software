import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import LoginPage from "./Pages/LoginPage";
import AdminDashboard from "./Pages/AdminDashboard";

const App = () => {
  return (
    <Routes>
  {/* Public Routes */}
  <Route path="/" element={<AdminDashboard />} />


  {/* Protected Routes */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
  
  
</Routes>

  );
};

export default App;
