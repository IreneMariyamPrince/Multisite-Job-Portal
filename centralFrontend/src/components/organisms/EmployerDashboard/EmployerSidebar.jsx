/* eslint-disable prettier/prettier */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../atoms/Icon';

const EmployerSideBar = () => {
  return (
    <aside
      className='sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark'
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
          <span className='ms-1 font-weight-bold text-white'>Employer</span>
        </Link>
      </div>
      <hr className='horizontal light mt-0 mb-2' />
      <div className='collapse navbar-collapse  w-auto ' id='sidenav-collapse-main'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink
              className='nav-link text-white '
              activeClassName='active bg-gradient-primary'
              to='/employer/dashboard'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>dashboard</Icon>
              </div>
              <span className='nav-link-text ms-1'>Dashboard</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link text-white 'activeClassName='active bg-gradient-primary'  to='/employer/candidates'>
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>person</Icon>
              </div>
              <span className='nav-link-text ms-1'>Candidates</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link text-white 'activeClassName='active bg-gradient-primary'  to='/employer/jobs'>
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>work</Icon>
              </div>
              <span className='nav-link-text ms-1'>Jobs</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link text-white 'activeClassName='active bg-gradient-primary'  to='/employer/jobApplications'>
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>person</Icon>
              </div>
              <span className='nav-link-text ms-1'>Job Applications</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default EmployerSideBar;
