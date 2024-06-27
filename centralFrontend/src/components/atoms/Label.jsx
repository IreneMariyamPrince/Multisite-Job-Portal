import React from 'react';
import PropTypes from 'prop-types';
const Label = ({ children, ...props }) => {
  const { className, htmlFor } = props;
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.string.isRequired, // Assuming children will be a string
  background: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
};

export default Label;
