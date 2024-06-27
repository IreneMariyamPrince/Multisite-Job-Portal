/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
// import autheticationApi from '../../services/AuthenticationApi';
import { useNavigate } from 'react-router-dom';
import regionApi from '../../services/RegionApi';

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await regionApi.regionApprove(values);
            if (response.success) {
                toast.success('Email sent successful', { autoClose: 2000 });
                localStorage.setItem('authToken', response.token);
                navigate(response.redirectTo);
                resetForm();
            } else {
                toast.error(response.error, { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Email sent failed.', { autoClose: 2000 });
        } finally {
            setSubmitting(false);
        }
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
                        <div className='mb-3 pb-3'>
                            <Field
                                type='email'
                                name='email'
                                placeholder='Email'
                                className={`form-control border px-2 ${errors.email && touched.email && 'is-invalid'}`}
                            />
                            <ErrorMessage name='email' component='div' className='invalid-feedback' />
                        </div>

                        <button type='submit' className='btn btn-primary btn-lg w-100' disabled={isSubmitting}>
                            Send Email
                        </button>
                      
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPasswordForm;
