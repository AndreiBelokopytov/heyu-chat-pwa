import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Ripple as OnsRipple } from 'react-onsenui';
import './GroupCard.scss';

function GroupCard ({
  title,
  subtitle,
  className,
  children,
  ...other
}) {
  const groupCardClass = classnames(
    'group-card',
    className
  );

  return (
    <div
      className={groupCardClass}
      {...other}
    >
      <span className='title'>{title}</span>
      <span className='subtitle'>{subtitle}</span>
      <div className='content'>
        {children}
      </div>
      <OnsRipple color='rgba(0, 0, 0, 0.04)' />
    </div>
  );
}

GroupCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default GroupCard;
