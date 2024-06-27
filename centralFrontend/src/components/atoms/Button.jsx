import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <button
      type='button'
      className='btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
