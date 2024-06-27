/* eslint-disable react/prop-types */
import React from 'react';
import Cards from '../../molecules/AdminDashboard/Cards';

const DashboardInfoCards = ({ counts, percentageDifference }) => {
  return (
    <div className='row'>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards
          background='dark'
          iconName='public'
          count={Number(counts?.regionActiveUsers)}
          percentageDifference={percentageDifference?.regionCount}
        >
          Active Regions
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards
          background='primary'
          iconName='supervisor_account'
          count={Number(counts?.employerActiveUsers)}
          percentageDifference={percentageDifference?.employerCount}
        >
          Active Employers
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards
          background='success'
          iconName='groups'
          count={Number(counts?.candidateActiveUsers)}
          percentageDifference={percentageDifference?.candidateCount}
        >
          Active Candidates
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6'>
        <Cards background='info' iconName='work' count={70}>
          Jobs
        </Cards>
      </div>
    </div>
  );
};
export default DashboardInfoCards;
