/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import RegionSideBar from '../organisms/RegionDashboard/RegionSidebar';
import RegionHeader from '../organisms/RegionDashboard/RegionHeader';

const RegionDashboardLayout = ({ children }) => {
  return (
    <>
      <div className='g-sidenav-show  bg-gray-200'>
        <RegionSideBar />
        <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg '>
          {/* Navbar */}
          <RegionHeader/>
          {/* End Navbar */}
          <div className='container-fluid py-4'>
            {children}
          </div>

        </main>
      </div>
    </>
  );
};

export default RegionDashboardLayout;
