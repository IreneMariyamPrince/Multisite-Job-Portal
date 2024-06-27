/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminProtection = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userRole !== 1) {
        navigate(-1); // Redirect to previous location if user is not an admin
      }
    }
  }, [navigate, token]);

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.userRole === 1) {
      // If user is an admin
      return <Outlet />;
    }
  }

  // If user is not an admin or token is invalid, navigation will happen inside the useEffect
  return null;
};

export default AdminProtection;
