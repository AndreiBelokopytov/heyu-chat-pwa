import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import './ChatMessage.scss';

const propTypes = {
  message: PropTypes.shape({
    author: PropTypes.shape({
      photoURL: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired
    }),
    key: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    sentDate: PropTypes.string.isRequired
  }).isRequired
};

function ChatMessage ({
  message
}) {
  return (
    <div className='chat-message'>
      <UserAvatar
        className='chat-message__autor-avatar'
        src={message.author.photoURL}
      />
      <div className='chat-message__text'>{message.message}</div>
      <div className='chat-message__date'>{message.sentDate}</div>
    </div>
  );
}

ChatMessage.propTypes = propTypes;

export default ChatMessage;
