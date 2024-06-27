/* eslint-disable prettier/prettier */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../atoms/Icon';

const CandidateSideBar = () => {
  return (
    <aside
      className='sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark'
      style={{ zIndex: 'unset' }}
      id='sidenav-main'
    >
      <div className='sidenav-header'>
        <i
          className='fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none'
          aria-hidden='true'
          id='iconSidenav'
        ></i>
        <Link
          className='navbar-brand m-0'
          to='/admin/dashboard'
          target='_blank'
        >
          <img src='../assets/img/logo-ct.png' className='navbar-brand-img h-100' alt='main_logo' />
          <span className='ms-1 font-weight-bold text-white'>Candidate</span>
        </Link>
      </div>
      <hr className='horizontal light mt-0 mb-2' />
      <div className='collapse navbar-collapse w-auto' id='sidenav-collapse-main'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active bg-gradient-primary' : ''}`
              }
              to='/candidate/dashboard'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>dashboard</Icon>
              </div>
              <span className='nav-link-text ms-1'>Dashboard</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active bg-gradient-primary' : ''}`
              }
              to='/candidate/jobs'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>work</Icon>
              </div>
              <span className='nav-link-text ms-1'>Jobs</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? 'active bg-gradient-primary' : ''}`
              }
              to='/candidate/appliedJobs'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>person</Icon>
              </div>
              <span className='nav-link-text ms-1'>Applied Jobs</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default CandidateSideBar;
