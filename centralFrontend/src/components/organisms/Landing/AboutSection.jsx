import React from 'react';

const AboutSection = () => {
  return (
    <div className='container-xxl py-5' id='about'>
      <div className='container'>
        <div className='row g-5 align-items-center'>
          <div className='col-lg-6 wow fadeIn' data-wow-delay='0.1s'>
            <div className='row g-0 about-bg rounded overflow-hidden'>
              <div className='col-6 text-start'>
                <img
                  className='img-fluid w-100'
                  src='public/landing page styles/img/pics1.jpg'
                  alt='img'
                />
              </div>
              <div className='col-6 text-start'>
                <img
                  className='img-fluid'
                  src='public/landing page styles/img/about-2.jpg'
                  style={{ width: '85%', marginTop: '15%' }}
                  alt='img'
                />
              </div>
              <div className='col-6 text-end'>
                <img
                  className='img-fluid'
                  src='public/landing page styles/img/pics3.jpg'
                  style={{ width: '85%' }}
                  alt='img'
                />
              </div>
              <div className='col-6 text-end'>
                <img
                  className='img-fluid w-100'
                  src='public/landing page styles/img/pics2.jpg'
                  alt='img'
                />
              </div>
            </div>
          </div>
          <div className='col-lg-6 wow fadeIn' data-wow-delay='0.5s'>
            <h1 className='mb-4'>We Help To Get The Best Job</h1>
            <p className='mb-4'>
              At our job portal, we are dedicated to helping you find the best job opportunities and
              discovering top talent for your organization.
            </p>
            <p>
              <i className='fa fa-check text-primary me-3'></i>Explore a wide range of job listings
              across various industries
            </p>
            <p>
              <i className='fa fa-check text-primary me-3'></i>Stay informed about the latest trends
              and insights in the job market
            </p>
            <p>
              <i className='fa fa-check text-primary me-3'></i>Streamline your recruitment process
              with advanced search and filtering options
            </p>
            <a
              className='btn py-3 px-5 mt-3'
              style={{ backgroundColor: '#e3106f', color: 'white' }}
              href=''
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
