/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import CandidateSideBar from '../organisms/CandidateDashboard/CandidateSidebar';
import CandidateHeader from '../organisms/CandidateDashboard/CandidateHeader';

const CandidateDashboardLayout = ({ children }) => {
  return (
    <>
      <div className='g-sidenav-show  bg-gray-200'>
        <CandidateSideBar />
        <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg '>
          {/* Navbar */}
          <CandidateHeader/>
          {/* End Navbar */}
          <div className='container-fluid py-4'>
            {children}
          </div>

        </main>
      </div>
    </>
  );
};

export default CandidateDashboardLayout;
