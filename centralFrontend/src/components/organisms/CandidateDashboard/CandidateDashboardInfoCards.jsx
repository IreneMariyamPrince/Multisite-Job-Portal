/* eslint-disable react/prop-types */
import React from 'react';
import Cards from '../../molecules/AdminDashboard/Cards';

const CandidateDashboardInfoCards = ({ counts }) => {
  return (
    <div className='row'>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards
          background='dark'
          iconName='public'
          count={Number(counts?.totalJobsAvailable)}
          percentageDifference={20}
        >
          Total Jobs Available
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards
          background='primary'
          iconName='supervisor_account'
          count={Number(counts?.totalAppliedJobs)}
          percentageDifference={10}
        >
          Applied Jobs
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards background='success' iconName='groups' count={30} percentageDifference={20}>
          Approved Jobs
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6'>
        <Cards background='info' iconName='work' count={70} percentageDifference={20}>
          Rejected Jobs
        </Cards>
      </div>
    </div>
  );
};
export default CandidateDashboardInfoCards;
