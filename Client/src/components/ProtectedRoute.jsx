import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, children }) {
  if (!user || !user.isAdmin) {
    // Redirects to a different page if the user is not logged in or is not an admin
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
