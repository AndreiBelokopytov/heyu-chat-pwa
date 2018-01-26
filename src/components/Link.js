import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Link.scss';

function Link ({
  children,
  className,
  ...other
}) {
  const linkClassName = classnames(
    'link',
    className
  );

  return (
    <div
      className={linkClassName}
      {...other}
    >
      {children}
    </div>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Link;
