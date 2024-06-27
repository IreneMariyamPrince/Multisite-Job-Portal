/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Gender } from '../../../constants/Gender';
import employerApi from '../../../services/EmployerApi';

const EmployerRegistrationForm = () => {
  const URL = window.location.href;
  const [file, setFile] = useState();

  const initialValues = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: '',
    logo: '',
    companyName: '',
    companySector: '',
    websiteUrl: '',
    contactPerson: '',
    contactPersonDesignation: '',
    contactPersonMobile: '',
    webInfoWebUrl: URL
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
    companyName: Yup.string().required('Company Name is required'),
    companySector: Yup.string().required('Company Sector is required'),
    websiteUrl: Yup.string().required('Website URL is required'),
    contactPerson: Yup.string().required('Contact Person is required'),
    contactPersonDesignation: Yup.string().required('Designation is required'),
    contactPersonMobile: Yup.string().required('Contact Person Mobile is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('gender', values.gender);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('companyName', values.companyName);
    formData.append('companySector', values.companySector);
    formData.append('websiteUrl', values.websiteUrl);
    formData.append('contactPerson', values.contactPerson);
    formData.append('contactPersonDesignation', values.contactPersonDesignation);
    formData.append('contactPersonMobile', values.contactPersonMobile);

    formData.append('webInfoWebUrl', URL);
    formData.append('logo', file);
    try {
      const response = await employerApi.register(formData);
      if (response.success) {
        toast.success(response.success, { autoClose: 2000 });
        resetForm();
      } else {
        toast.error(response.error, { autoClose: 2000 });
      }
    } catch (error) {
      //   console.error('Registration failed:', error.message);
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
            <div className='row'>
              {/* Basic Details */}
              <div className='col-md-6'>
                <p className='text-sm text-bold'>Basic Details</p>
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
                      <label
                        className='radio-inline me-2'
                        key={option.value}
                        htmlFor={option.value}
                      >
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
                  <label htmlFor='Gender' className='form-label'>
                    Logo/Pic
                  </label>
                  <input
                    type='file'
                    name={file}
                    onChange={e => setFile(e.target.files[0])}
                    placeholder='Logo/Pic'
                    className={`form-control border px-2`}
                  />
                </div>
              </div>
              {/* Company Details */}
              <div className='col-md-6'>
                <p className='text-sm text-bold'>Company Details</p>
                <div className='mb-3'>
                  <Field
                    type='text'
                    name='companyName'
                    id='companyName'
                    placeholder='Company Name *'
                    className={`form-control border px-2 ${touched.companyName && errors.companyName ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name='companyName' component='div' className='invalid-feedback' />
                </div>
                <div className='mb-3'>
                  <Field
                    type='text'
                    name='companySector'
                    id='companySector'
                    placeholder='Company Sector *'
                    className={`form-control border px-2 ${touched.companySector && errors.companySector ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name='companySector' component='div' className='invalid-feedback' />
                </div>
                <div className='mb-3'>
                  <Field
                    type='text'
                    name='websiteUrl'
                    id='websiteUrl'
                    placeholder='Company URL *'
                    className={`form-control border px-2 ${touched.websiteUrl && errors.websiteUrl ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name='websiteUrl' component='div' className='invalid-feedback' />
                </div>
                <div className='mb-3'>
                  <Field
                    type='text'
                    name='contactPerson'
                    id='contactPerson'
                    placeholder='Contact Person *'
                    className={`form-control border px-2 ${touched.contactPerson && errors.contactPerson ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage name='contactPerson' component='div' className='invalid-feedback' />
                </div>
                <div className='mb-3'>
                  <Field
                    type='text'
                    name='contactPersonDesignation'
                    id='contactPersonDesignation'
                    placeholder='Contact Person Designation *'
                    className={`form-control border px-2 ${touched.contactPersonDesignation && errors.contactPersonDesignation ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name='contactPersonDesignation'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                <div className='mb-3'>
                  <Field
                    type='text'
                    name='contactPersonMobile'
                    id='contactPersonMobile'
                    placeholder='Contact Person Mobile*'
                    className={`form-control border px-2 ${touched.contactPersonMobile && errors.contactPersonMobile ? 'is-invalid' : ''}`}
                  />
                  <ErrorMessage
                    name='contactPersonMobile'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
                {/* Add other company details fields here */}
              </div>
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

export default EmployerRegistrationForm;
