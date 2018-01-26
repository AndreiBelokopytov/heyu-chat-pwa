import React from 'react';
import PropTypes from 'prop-types';

function IconFacebook ({
  className
}) {
  return (
    <svg
      className={className}
      width='25'
      height='25'
      viewBox='0 0 25 25'>
      <path
        d='M20.292 4H4.709A.709.709 0 0 0 4 4.708v15.584c0 .391.317.708.709.708h8.323v-6.375h-2.125v-2.656h2.125V9.844c0-2.196 1.39-3.276 3.348-3.276.938 0 1.745.07 1.98.1v2.295h-1.358c-1.066 0-1.314.507-1.314 1.25v1.756h2.656l-.531 2.656h-2.125L15.73 21h4.562a.708.708 0 0 0 .708-.708V4.708A.708.708 0 0 0 20.292 4'
        fillRule='evenodd'
        fill='#3b5998'
      />
    </svg>
  );
}

IconFacebook.propTypes = {
  className: PropTypes.string
};

export default IconFacebook;
