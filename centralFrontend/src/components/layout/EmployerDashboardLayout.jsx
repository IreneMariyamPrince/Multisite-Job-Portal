/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import EmployerSideBar from '../organisms/EmployerDashboard/EmployerSidebar';
import EmployerHeader from '../organisms/EmployerDashboard/EmployerHeader';

const EmployerDashboardLayout = ({ children }) => {
  return (
    <>
      <div className='g-sidenav-show  bg-gray-200'>
        <EmployerSideBar />
        <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg '>
          {/* Navbar */}
          <EmployerHeader/>
          {/* End Navbar */}
          <div className='container-fluid py-4'>
            {children}
          </div>

        </main>
      </div>
    </>
  );
};

export default EmployerDashboardLayout;
