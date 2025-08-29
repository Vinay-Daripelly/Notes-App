import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;