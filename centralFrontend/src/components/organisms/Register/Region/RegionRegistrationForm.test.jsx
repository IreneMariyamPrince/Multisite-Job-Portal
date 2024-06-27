/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegionRegistrationForm from './RegionRegistrationForm';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }), // Mock JSON response
    status: 200, // Mock status code
  })
);

describe('RegionRegistrationForm component', () => {
  it('renders form inputs and button', () => {
    render(<RegionRegistrationForm />);
    expect(screen.getByPlaceholderText('First Name *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mobile Number *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Logo/Pic')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('displays error message for invalid input', async () => {
    render(<RegionRegistrationForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    expect(await screen.findByText('First Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Last Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Gender is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Mobile is required')).toBeInTheDocument();
  });  
});
