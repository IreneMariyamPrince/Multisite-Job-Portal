import React, { useEffect, useState } from 'react';
import Input from '@mui/material/Input';

const RegionProfile = () => {
  const userData = [];
  //   const [userData, setUserData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  const ariaLabel = {
    style: {
      height: '10px', // Set custom height
      fontSize: '14px', // Set custom font size
    },
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        // const data = await getUserById(userId);
        // setUserData(data);
        // setEditedUserData(data); // Initialize editedUserData with fetched data
      } catch (error) {
        // console.error(error);
      }
    };

    getUser();
  }, []);

  const handleEditClick = () => {
    setEditing(!editing); // Toggle editing state
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSaveClick = () => {
    // Logic to save editedUserData
    // You can make an API call to update the user data
    // After saving, set editing state to false
    setEditing(false);
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
              <h5 className='mb-1'>Region 1</h5>
              <p className='mb-0 font-weight-normal text-sm'>CEO / Co-Founder</p>
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
                          defaultValue='Irene'
                          inputProps={ariaLabel}
                          onChange={handleInputChange}
                          name='FirstName'
                        />
                      ) : (
                        <span>Irene Mariyam</span>
                      )}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm d-flex align-items-center'>
                      <strong className='text-dark me-2'>Last Name:</strong>{' '}
                      {editing ? (
                        <Input
                          defaultValue='Prince'
                          inputProps={ariaLabel}
                          onChange={handleInputChange}
                          name='LastName'
                        />
                      ) : (
                        <span>Prince</span>
                      )}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm d-flex align-items-center'>
                      <strong className='text-dark me-2'>Contact Number:</strong>{' '}
                      {editing ? (
                        <Input
                          defaultValue='1654631652'
                          inputProps={ariaLabel}
                          onChange={handleInputChange}
                          name='Mobile'
                        />
                      ) : (
                        <span>215415646</span>
                      )}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm d-flex align-items-center'>
                      <strong className='text-dark me-2'>Email:</strong>{' '}
                      {editing ? (
                        <Input
                          defaultValue='abcd@mail.com'
                          inputProps={ariaLabel}
                          onChange={handleInputChange}
                          name='Email'
                        />
                      ) : (
                        <span>admin@mail.com</span>
                      )}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm'>
                      <strong className='text-dark'>Email Verified:</strong> &nbsp;
                      {userData.EmailVerification ? 'Verified' : 'Not Verified'}
                    </li>
                    <li className='list-group-item border-0 ps-0 text-sm'>
                      <strong className='text-dark'>Mobile Verified:</strong> &nbsp;
                      {userData.MobileVerification ? 'Verified' : 'Not Verified'}
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

export default RegionProfile;
