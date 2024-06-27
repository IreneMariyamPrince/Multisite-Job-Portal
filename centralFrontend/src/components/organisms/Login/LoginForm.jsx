/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import autheticationApi from '../../services/AuthenticationApi';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await autheticationApi.login(values);
            if (response.success) {
                toast.success('Authentication successful', { autoClose: 2000 });
                localStorage.setItem('authToken', response.token);
                navigate(response.redirectTo);
                resetForm();
            } else {
                toast.error(response.error, { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Login failed.', { autoClose: 2000 });
        } finally {
            setSubmitting(false);
        }
    };

    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className='card p-4 shadow-lg rounded-lg'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, touched, errors }) => (
                    <Form>
                        <div className='mb-3'>
                            <Field
                                type='email'
                                name='email'
                                placeholder='Email'
                                className={`form-control border px-2 ${errors.email && touched.email && 'is-invalid'}`}
                            />
                            <ErrorMessage name='email' component='div' className='invalid-feedback' />
                        </div>

                        <div className='mb-3'>
                            <Field
                                type='password'
                                name='password'
                                placeholder='Password'
                                className={`form-control border px-2 ${errors.password && touched.password && 'is-invalid'}`}
                            />
                            <ErrorMessage name='password' component='div' className='invalid-feedback' />
                        </div>

                        <div className='mb-3 form-check ps-0'>
                            <input
                                type='checkbox'
                                id='rememberMe'
                                className='form-check-input'
                                checked={rememberMe}
                                onChange={handleRememberMeToggle}
                            />
                            <label htmlFor='rememberMe' className='form-check-label'>
                                Remember me
                            </label>
                        </div>

                        <button type='submit' className='btn btn-primary btn-lg w-100' disabled={isSubmitting}>
                            Sign in
                        </button>
                      <p className='mb-2 text-center text-sm mx-auto'>
                        Forgot your password? &nbsp;
                        <Link
                          to='/forgotPassword'
                          className='text-primary text-gradient font-weight-bold'
                        >
                          Forgot Password
                        </Link>
                      </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
