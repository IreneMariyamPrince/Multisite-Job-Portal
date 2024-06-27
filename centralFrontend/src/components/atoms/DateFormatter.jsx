/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types
import React from 'react';
function DateFormatter({ timestamp }) {
  const date = new Date(timestamp);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const dateString = date.toLocaleDateString('en-GB', options);

  return dateString;
}

export default DateFormatter;
