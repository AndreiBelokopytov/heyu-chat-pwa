import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import './ChatMessage.scss';

const propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
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
        src={message.avatarUrl}
      />
      <div className='chat-message__text'>{message.text}</div>
      <div className='chat-message__date'>{message.sentDate}</div>
    </div>
  );
}

ChatMessage.propTypes = propTypes;

export default ChatMessage;
