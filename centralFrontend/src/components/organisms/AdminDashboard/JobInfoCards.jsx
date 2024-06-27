/* eslint-disable react/prop-types */
import React from 'react';
import Cards from '../../molecules/AdminDashboard/Cards';

const JobInfoCards = ({ totalJobs, totalJobsApprove, totalJobsPending, totalJobsDecline }) => {
  return (
    <div className='row d-flex flex-wrap justify-content-around'>
      <div className='col mb-4'>
        <Cards background='primary' iconName='equalizer' count={Number(totalJobs)}>
          Total
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='success' iconName='insert_emoticon' count={Number(totalJobsApprove)}>
          Active
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='secondary' iconName='hourglass_top' count={Number(totalJobsPending)}>
          Pending
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='danger' iconName='clear' count={Number(totalJobsDecline)}>
          Expired
        </Cards>
      </div>
    </div>
  );
};
export default JobInfoCards;
