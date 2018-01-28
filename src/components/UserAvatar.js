import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './UserAvatar.scss';

function UserAvatar ({
  src,
  className,
  ...other
}) {
  const avatarStyle = {
    backgroundImage: `url("${src}")`
  };

  const avatarClass = classnames(
    'user-avatar',
    className
  );
  return (
    <div
      className={avatarClass}
      style={avatarStyle}
      {...other}
    />
  );
}

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default UserAvatar;
