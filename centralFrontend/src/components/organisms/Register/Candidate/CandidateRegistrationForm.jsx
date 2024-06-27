/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Gender } from '../../../constants/Gender';
import candidateApi from '../../../services/CandidateApi';

const CandidateRegistrationForm = () => {
  const URL = window.location.href;
  const [file, setFile] = useState();
  const [qualifications, setQualifications] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    // Fetch qualifications
    const fetchQualifications = async () => {
      try {
        const response = await candidateApi.getQualifications();
        setQualifications(response.data);
      } catch (error) {
        console.error('Error fetching qualifications:', error);
        // Handle error
      }
    };

    fetchQualifications();
  }, []);

  const handleQualificationChange = async (event, setFieldValue) => {
    const selectedQualificationId = event.target.value;
    try {
      const response = await candidateApi.getSpecializations(selectedQualificationId);
      setSpecializations(response.data);
      setFieldValue('qualification', selectedQualificationId); // Update the form field value
    } catch (error) {
      console.error('Error fetching specializations:', error);
      // Handle error
    }
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: '',
    webInfoWebUrl: URL,
    pic: '',
    resume: '',
    qualification: '', // Initialize with an empty string
    specialization: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().required('Mobile is required'),
    qualification: Yup.string().required('Qualification is required'),
    specialization: Yup.string().required('Specialization is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('gender', values.gender);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('webInfoWebUrl', URL);
    formData.append('pic', file);
    formData.append('resume', file);
    formData.append('eduQualificationId', values.qualification);
    formData.append('eduSpecializationId', values.specialization);

    try {
      const response = await candidateApi.register(formData);
      if (response.success) {
        toast.success(response.success, { autoClose: 2000 });
        resetForm();
      } else {
        console.error('Registration failed:', response.error);
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
        {({ isSubmitting, touched, errors, setFieldValue }) => (
          <Form>
            {/* Form fields */}
            <div className='row'>
              {/* Left column */}
              <div className='col-md-6'>
                {/* First Name */}
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

                {/* Last Name */}
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

                {/* Gender */}
                <div className={`mb-3`}>
                  <label htmlFor='gender' className='form-label'>
                    Gender *
                  </label>
                  <div role='group' aria-labelledby='gender'>
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

                {/* Email */}
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

                {/* Mobile */}
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

                {/* Photo */}
                <div className='mb-3'>
                  <label htmlFor='pic' className='form-label'>
                    Photo
                  </label>
                  <input
                    type='file'
                    name={file}
                    id='pic'
                    onChange={e => setFile(e.target.files[0])}
                    placeholder='Logo/Pic'
                    className={`form-control border px-2`}
                  />
                </div>
              </div>

              {/* Right column */}
              <div className='col-md-6'>
                {/* Resume */}
                <div className='mb-3'>
                  <label htmlFor='resume' className='form-label'>
                    Resume
                  </label>
                  <input
                    type='file'
                    name={file}
                    id='resume'
                    onChange={e => setFile(e.target.files[0])}
                    placeholder='resume'
                    className={`form-control border px-2`}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='qualification' className='form-label'>
                    Qualification *
                  </label>
                  <Field
                    as='select'
                    name='qualification'
                    id='qualification'
                    className={`form-control border px-2 ${touched.qualification && errors.qualification ? 'is-invalid' : ''}`}
                    onChange={event => handleQualificationChange(event, setFieldValue)}
                  >
                    <option value=''>Select Qualification</option>
                    {qualifications.map(qualification => (
                      <option
                        key={qualification.eduQualificationId}
                        value={qualification.eduQualificationId}
                      >
                        {qualification.qualification}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name='qualification' component='div' className='invalid-feedback' />
                </div>

                {/* Specialization */}
                <div className='mb-3'>
                  <label htmlFor='specialization' className='form-label'>
                    Specialization *
                  </label>
                  <Field
                    as='select'
                    name='specialization'
                    id='specialization'
                    className={`form-control border px-2 ${touched.specialization && errors.specialization ? 'is-invalid' : ''}`}
                  >
                    <option value=''>Select Specialization</option>
                    {specializations.map(specialization => (
                      <option
                        key={specialization.eduSpecializationId}
                        value={specialization.eduSpecializationId}
                      >
                        {specialization.specialization}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name='specialization'
                    component='div'
                    className='invalid-feedback'
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type='submit' className='btn btn-primary btn-lg w-100' disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CandidateRegistrationForm;
