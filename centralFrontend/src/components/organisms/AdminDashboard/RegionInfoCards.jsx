/* eslint-disable react/prop-types */
import React from 'react';
import Cards from '../../molecules/AdminDashboard/Cards';

const RegionInfoCards = ({ totalCount, totalActiveRegions, totalPendingRegions }) => {
  return (
    <div className='row d-flex flex-wrap justify-content-around'>
      <div className='col mb-4'>
        <Cards background='primary' iconName='equalizer' count={Number(totalCount)}>
          Total
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='success' iconName='insert_emoticon' count={Number(totalActiveRegions)}>
          Active
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='secondary' iconName='hourglass_top' count={Number(totalPendingRegions)}>
          Pending
        </Cards>
      </div>
    </div>
  );
};
export default RegionInfoCards;
