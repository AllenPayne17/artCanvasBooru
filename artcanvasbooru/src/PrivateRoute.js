// PrivateRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppContext } from './AppContex'

const PrivateRoute = () => {
  const { auth } = useAppContext();

  return (
     auth ? <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
