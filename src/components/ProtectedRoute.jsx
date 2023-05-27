import React from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
