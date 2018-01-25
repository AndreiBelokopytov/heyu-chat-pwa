import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Ripple as OnsRipple } from 'react-onsenui';
import UserAvatar from './UserAvatar';
import './DialogCard.scss';

function Dialog ({
  dialog,
  className,
  ...other
}) {
  const dialogClass = classnames(
    'dialog-card',
    className,
    ...other
  );
  return (
    <div
      className={dialogClass}
      {...other}
    >
      <div className='dialog-card__content'>
        <UserAvatar
          className='dialog-card__avatar'
          src={dialog.avatarUrl}
        />
        <div className='dialog-card__user-info'>
          <div className='dialog-card__user-name'>{dialog.fullName}</div>
          <div className='dialog-card__user-status'>{dialog.status}</div>
        </div>
        <div className='dialog-card__user-last-seen'>
          {dialog.lastSeen}
        </div>
        <OnsRipple color='rgba(0, 0, 0, 0.04)' />
      </div>
    </div>
  );
}

Dialog.propTypes = {
  className: PropTypes.string,
  dialog: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    lastSeen: PropTypes.string.isRequired
  }).isRequired
};

export default Dialog;
