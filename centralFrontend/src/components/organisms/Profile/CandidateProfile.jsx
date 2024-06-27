/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import Input from '@mui/material/Input';
import candidateApi from '../../services/CandidateApi';

const CandidateProfile = () => {
  const [editing, setEditing] = useState(false);
  const [candidateData, setCandidateData] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const ariaLabel = {
    style: {
      height: '10px', // Set custom height
      fontSize: '14px', // Set custom font size
    },
  };

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const response = await candidateApi.getCandidate();
        setCandidateData(response.data);
        setEditedUserData(response.data); // Initialize editedUserData with fetched data
      } catch (error) {
        console.error('Error fetching candidate data:', error);
      }
    };

    fetchCandidateData();
  }, []);

  const handleEditClick = () => {
    setEditing(!editing); // Toggle editing state
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      // Make an API call to update the user data
      const response = await candidateApi.updateCandidate(editedUserData);
      if (response.status === 200) {
        setCandidateData(editedUserData); // Update the candidate data with the edited data
        setEditing(false); // Exit editing mode
      } else {
        console.error('Error saving candidate data:', response);
      }
    } catch (error) {
      console.error('Error saving candidate data:', error);
    }
  };

  return (
    <div className='container-fluid px-2 px-md-4'>
      <div
        className='page-header min-height-300 border-radius-xl mt-4'
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <span className='mask bg-gradient-primary opacity-6'></span>
      </div>
      <div className='card card-body mx-3 mx-md-4 mt-n6'>
        <div className='row gx-4 mb-2'>
          <div className='col-auto'>
            <div className='avatar avatar-xl position-relative'>
              <img
                src='../assets/img/bruce-mars.jpg'
                alt='profile_image'
                className='w-100 border-radius-lg shadow-sm'
              />
            </div>
          </div>
          <div className='col-auto my-auto'>
            <div className='h-100'>
              <h5 className='mb-1'>
                {candidateData ? candidateData.firstName + ' ' + candidateData.lastName : ''}
              </h5>
              <p className='mb-0 font-weight-normal text-sm'>Candidate</p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='row'>
            <div className='col-12'>
              <div className='card card-plain h-100'>
                <div className='card-header pb-0 p-3'>
                  <div className='row'>
                    <div className='col-md-8 d-flex align-items-center'>
                      <h6 className='mb-0'>Profile Information</h6>
                    </div>
                    <div className='col-md-4 text-end'>
                      {/* Edit Profile button */}
                      <a href='#' onClick={handleEditClick}>
                        <i
                          className='fas fa-user-edit text-secondary text-sm'
                          data-bs-toggle='tooltip'
                          data-bs-placement='top'
                          title='Edit Profile'
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='card-body p-2'>
                  <hr className='horizontal gray-light' />
                  <ul className='list-group'>
                    {/* Display fields with text or input based on editing state */}
                    <li className='list-group-item border-0 ps-0 text-sm d-flex align-items-center'>
                      <strong className='text-dark me-2'>First Name:</strong>{' '}
                      {editing ? (
                        <Input
                          value={editedUserData.firstName || ''}
                          inputProps={ariaLabel}
                          onChange={handleInputChange}
                          name='firstName'
                        />
                      ) : (
                        <span>{candidateData ? candidateData.firstName : ''}</span>
                      )}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm d-flex align-items-center'>
                      <strong className='text-dark me-2'>Last Name:</strong>{' '}
                      {editing ? (
                        <Input
                          value={editedUserData.lastName || ''}
                          inputProps={ariaLabel}
                          onChange={handleInputChange}
                          name='lastName'
                        />
                      ) : (
                        <span>{candidateData ? candidateData.lastName : ''}</span>
                      )}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm d-flex align-items-center'>
                      <strong className='text-dark me-2'>Contact Number:</strong>{' '}
                      {editing ? (
                        <Input
                          value={editedUserData.mobile || ''}
                          inputProps={ariaLabel}
                          onChange={handleInputChange}
                          name='mobile'
                        />
                      ) : (
                        <span>{candidateData ? candidateData.mobile : 'Not Updated'}</span>
                      )}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm d-flex align-items-center'>
                      <strong className='text-dark me-2'>Email:</strong>{' '}
                      {editing ? (
                        <Input
                          value={editedUserData.email || ''}
                          inputProps={ariaLabel}
                          onChange={handleInputChange}
                          name='email'
                        />
                      ) : (
                        <span>{candidateData ? candidateData.email : ''}</span>
                      )}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm'>
                      <strong className='text-dark'>Email Verified:</strong> &nbsp;
                      {candidateData && candidateData.emailVerified ? 'Verified' : 'Not Verified'}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm'>
                      <strong className='text-dark'>Mobile Verified:</strong> &nbsp;
                      {candidateData && candidateData.mobileVerified ? 'Verified' : 'Not Verified'}
                    </li>
                    {/* Add more fields as needed */}
                  </ul>
                  {/* Save button when editing */}
                  {editing && (
                    <button className='btn btn-primary' onClick={handleSaveClick}>
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
