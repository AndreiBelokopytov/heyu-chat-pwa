import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  ListItem as OnsListItem,
  Icon as OnsIcon
} from 'react-onsenui';
import Avatar from './UserAvatar';
import './UserCard.scss';

function UserCard ({
  user,
  className
}) {
  const userCardClass = classnames(
    'user-card',
    className
  );
  return (
    <OnsListItem className={userCardClass}>
      <div className='user-avatar-wrap left'>
        <Avatar
          className='user-avatar'
          src={user.avatarUrl}
        />
      </div>
      <div className='user-name center'>{user.fullName}</div>
      <div className='right'>
        <OnsIcon
          className='contact-icon'
          icon='ion-ios-information-outline'
        />
      </div>
    </OnsListItem>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string
};

export default UserCard;
