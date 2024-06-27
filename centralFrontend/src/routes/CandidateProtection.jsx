/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CandidateProtection = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
    } else {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.userRole !== 4) {
          navigate(-1); // Redirect to previous location if user is not a candidate
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login'); // Redirect to login if token is invalid or expired
      }
    }
  }, [navigate, token]);

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userRole === 4) {
        // If user is a candidate
        return <Outlet />;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // If token is invalid, navigation will happen inside the useEffect
  return null;
};

export default CandidateProtection;
