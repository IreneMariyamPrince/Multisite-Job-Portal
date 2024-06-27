import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Avatar;
