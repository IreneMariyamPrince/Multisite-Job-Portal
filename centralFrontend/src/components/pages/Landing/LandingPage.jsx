import React from 'react';
import LandingNavbar from '../../organisms/Landing/LandingNavbar';
import Carousel from '../../organisms/Landing/Carousel';
import Search from '../../organisms/Landing/Search';
import CategorySection from '../../organisms/Landing/CategorySection';
import AboutSection from '../../organisms/Landing/AboutSection';
import JobListingSection from '../../organisms/Landing/JobListingSection';
import Footer from '../../organisms/Landing/Footer';

export const Landingpage = () => {
  return (
    <>
      <div className='container-xxl bg-white p-0'>
        <LandingNavbar />
        <Carousel />
        <Search />
        <CategorySection />
        <AboutSection />
        <JobListingSection />
        <Footer />
      </div>
    </>
  );
};
