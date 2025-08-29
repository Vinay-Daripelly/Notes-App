import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;