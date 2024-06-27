/* eslint-disable react/prop-types */
import React from 'react';
import Cards from '../../molecules/AdminDashboard/Cards';

const RegionWebInfoInfoCards = ({
  totalCount,
  regionWebActiveUsers,
  regionWebEmailSent,
  regionWebinProgress,
  regionWebPending,
  regionWebRejected,
}) => {
  return (
    <div className='row d-flex flex-wrap justify-content-around'>
      <div className='col mb-4'>
        <Cards
          background='primary'
          iconClassName=''
          iconName='equalizer'
          count={Number(totalCount)}
        >
          Total
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='success' iconName='insert_emoticon' count={Number(regionWebActiveUsers)}>
          Active
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='info' iconName='email' count={Number(regionWebEmailSent)}>
          Email Sent
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='warning' iconName='pending' count={Number(regionWebinProgress)}>
          In Progress
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='secondary' iconName='hourglass_top' count={Number(regionWebPending)}>
          Pending
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='danger' iconName='clear' count={Number(regionWebRejected)}>
          Rejected
        </Cards>
      </div>
    </div>
  );
};
export default RegionWebInfoInfoCards;
