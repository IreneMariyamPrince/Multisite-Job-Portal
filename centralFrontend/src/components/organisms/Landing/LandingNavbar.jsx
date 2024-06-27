import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Navbar color='light' light expand='lg' className='shadow static-top p-0'>
      <NavbarBrand
        tag={Link}
        to='/'
        className='d-flex align-items-center text-center py-0 px-4 px-lg-5'
      >
        <h1 className='m-0'>JobPortal</h1>
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className='me-4' />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='ms-auto p-4 p-lg-0' navbar>
          <NavItem>
            <NavLink tag={Link} to='/' className='nav-link active'>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='' className='nav-link'>
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/' className='nav-link '>
              Jobs
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href='#Contact' className='nav-link'>
              Contact
            </NavLink>
          </NavItem>
          <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle nav caret>
              SignUp
            </DropdownToggle>
            <DropdownMenu>
              <Link to='/regional/register' className='dropdown-item'>
                Regional User
              </Link>
              <Link to='/employer/register' className='dropdown-item'>
                Employer
              </Link>
              <Link to='/candidate/register' className='dropdown-item'>
                Candidate
              </Link>
            </DropdownMenu>
          </Dropdown>
          <NavItem>
            <Link to='/login' className='nav-link'>
              SignIn
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default LandingNavbar;
