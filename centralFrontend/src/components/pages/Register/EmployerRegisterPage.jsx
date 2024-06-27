import React from 'react';
import { Link } from 'react-router-dom';
import EmployerRegistrationForm from '../../organisms/Register/Employer/EmployerRegistrationForm';
const EmployerRegisterPage = () => {
  return (
    <>
      <main className='main-content mt-0'>
        <section>
          <div className='page-header min-vh-100'>
            <div className='container'>
              <div className='row'>
                <div className='col-5 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column'>
                  <div
                    className='position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center'
                    style={{
                      backgroundImage: "url('../assets/img/illustrations/illustration-signup.jpg')",
                      backgroundSize: 'cover',
                    }}
                  ></div>
                </div>
                <div className='col-xl-6 col-lg-7 col-md-10 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-2'>
                  <div className='card card-plain'>
                    <EmployerRegistrationForm />

                    <div className='card-footer text-center pt-0 px-lg-2 px-1'>
                      <p className='mb-2 text-sm mx-auto'>
                        Already have an account?
                        <Link to='/login' className='text-primary text-gradient font-weight-bold'>
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EmployerRegisterPage;
