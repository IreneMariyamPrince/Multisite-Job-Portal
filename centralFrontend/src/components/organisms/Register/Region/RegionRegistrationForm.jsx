/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import regionApi from '../../../services/RegionApi';
import { Gender } from '../../../constants/Gender';

const RegionRegistrationForm = () => {
  const URL = window.location.href;
  const [file, setFile] = useState();

  const initialValues = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: '',
    logo: '',
    webInfoWebUrl: URL,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('gender', values.gender);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('webInfoWebUrl', URL);
    formData.append('logo', file);
    try {
      const response = await regionApi.register(formData);
      if (response.success) {
        toast.success(response.success, { autoClose: 2000 });
        resetForm();
      } else {
        toast.error(response.error, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      toast.error('Registration failed.', { autoClose: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='card p-4 shadow-lg rounded-lg mb-3'>
      <h2 className='text-center mb-4 text-primary'>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <div className='mb-3'>
              <Field
                type='text'
                name='firstName'
                id='firstName'
                placeholder='First Name *'
                className={`form-control border px-2 ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name='firstName' component='div' className='invalid-feedback' />
            </div>

            <div className='mb-3'>
              <Field
                type='text'
                name='lastName'
                placeholder='Last Name *'
                id='lastName'
                className={`form-control border px-2 ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name='lastName' component='div' className='invalid-feedback' />
            </div>

            <div className={`mb-3`}>
              <label htmlFor='Gender' className='form-label'>
                Gender *
              </label>
              <div role='group' aria-labelledby='Gender'>
                {Gender.map(option => (
                  <label className='radio-inline me-2' key={option.value} htmlFor={option.value}>
                    <Field
                      type='radio'
                      id={option.value}
                      name='gender'
                      className='me-1'
                      value={option.value}
                    />
                    {option.label}
                  </label>
                ))}
                <ErrorMessage
                  name='gender'
                  component='div'
                  className={`${errors.gender ? 'invalid-feedback d-block' : 'invalid-feedback'}`}
                />
              </div>
            </div>

            <div className='mb-3'>
              <Field
                type='email'
                name='email'
                id='email'
                placeholder='Email *'
                className={`form-control border px-2 ${touched.email && errors.email ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name='email' component='div' className='invalid-feedback' />
            </div>

            <div className='mb-3'>
              <Field
                type='text'
                name='mobile'
                id='mobile'
                placeholder='Mobile Number *'
                className={`form-control border px-2 ${touched.mobile && errors.mobile ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name='mobile' component='div' className='invalid-feedback' />
            </div>

            <div className='mb-3'>
              <input
                type='file'
                name={file}
                onChange={e => setFile(e.target.files[0])}
                placeholder='Logo/Pic'
                className={`form-control border px-2`}
              />
            </div>

            <button
              name='Register'
              type='submit'
              className='btn btn-primary btn-lg w-100'
              disabled={isSubmitting}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegionRegistrationForm;
