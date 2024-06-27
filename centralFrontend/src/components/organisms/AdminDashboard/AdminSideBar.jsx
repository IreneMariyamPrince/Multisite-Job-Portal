/* eslint-disable prettier/prettier */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../atoms/Icon';

const AdminSideBar = () => {
  return (
    <aside
      className='sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark'
      id='sidenav-main' style={{ zIndex: 'unset'}}
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
          <span className='ms-1 font-weight-bold text-white'>Center</span>
        </Link>
      </div>
      <hr className='horizontal light mt-0 mb-2' />
      <div className='collapse navbar-collapse w-auto' id='sidenav-collapse-main'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link text-white active bg-gradient-primary' : 'nav-link text-white'}
              to='/admin/dashboard'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>dashboard</Icon>
              </div>
              <span className='nav-link-text ms-1'>Dashboard</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link text-white active bg-gradient-primary' : 'nav-link text-white'}
              to='/admin/regions'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>public</Icon>
              </div>
              <span className='nav-link-text ms-1'>Regions</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link text-white active bg-gradient-primary' : 'nav-link text-white'}
              to='/admin/regionWebInfo'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>web</Icon>
              </div>
              <span className='nav-link-text ms-1'>RegionWebInfo</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link text-white active bg-gradient-primary' : 'nav-link text-white'}
              to='/admin/employees'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>supervisor_account</Icon>
              </div>
              <span className='nav-link-text ms-1'>Employers</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link text-white active bg-gradient-primary' : 'nav-link text-white'}
              to='/admin/candidates'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>groups</Icon>
              </div>
              <span className='nav-link-text ms-1'>Candidates</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link text-white active bg-gradient-primary' : 'nav-link text-white'}
              to='/admin/jobs'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>work</Icon>
              </div>
              <span className='nav-link-text ms-1'>Jobs</span>
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              className={({ isActive }) => isActive ? 'nav-link text-white active bg-gradient-primary' : 'nav-link text-white'}
              to='/admin/jobApplications'
            >
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <Icon className='material-icons opacity-10'>article</Icon>
              </div>
              <span className='nav-link-text ms-1'>Job Applications</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSideBar;
