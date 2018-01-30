import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid-js';
import {
  Toolbar as OnsToolbar,
  BottomToolbar as OnsBottomToolbar,
  ToolbarButton as OnsToolbarButton,
  Icon as OnsIcon,
  Page as OnsPage,
  Ripple as OnsRipple
} from 'react-onsenui';
import ReactChatView from 'react-chatview';
import ChatMessage from './components/ChatMessage';
import Textarea from './components/Textarea';
import messagesMock from './mocks/messages.json';
import './Messages.scss';
import firebaseProvider from './firebaseProvider';

const PIECE_LENGTH = 20;

export default class Messages extends Component {
  state = {
    message: '',
    messages: [],
    isRendered: false
  };

  handleBackClick = () => {
    this.props.navigator.popPage();
  };

  handlePageShow = () => {
    this.setState({
      isRendered: true
    });
  };

  handlePageHide = () => {
    this.setState({
      isRendered: false
    });
  };

  renderFooter = () => {
    return (
      <OnsBottomToolbar modifier='aligned'>
        <div className='messages-page__msg-field'>
          <Textarea
            placeholder='Your message...'
            modifier='transparent block'
            value={this.state.message}
            onChange={this.handleMessageChange}
          />
        </div>
        <div
          className='messages-page__btn-send'
          onClick={this.handleMessageSubmit}
        >
          <OnsRipple />
          <OnsIcon icon='ion-paper-airplane' />
        </div>
      </OnsBottomToolbar>
    );
  };

  renderToolbar = () => {
    return (
      <OnsToolbar>
        <div className='left'>
          <OnsToolbarButton onClick={this.handleBackClick}>
            <OnsIcon icon='ion-ios-arrow-thin-left' />
          </OnsToolbarButton>
        </div>
        <div className='center'>
          Messages
        </div>
      </OnsToolbar>
    );
  };

  loadMoreHistory = () => {
    return new Promise((resolve, reject) => {
      const {messages} = this.state;
      const sliceEnd = messages.length + PIECE_LENGTH > messagesMock.length
        ? messagesMock.length : messages.length + PIECE_LENGTH;
      const more = messagesMock.slice(messages.length, sliceEnd);
      this.setState({messages: messages.concat(more)});
      resolve();
    });
  };

  handleMessageChange = evt => {
    this.setState({
      message: evt.target.value
    });
  };

  handleMessageSubmit = () => {
    if (!this.state.message) {
      return;
    }
    const profile = firebaseProvider.getProfile();
    const messageRef = firebaseProvider.getMessagesRef(uuid.create().toString());
    messageRef.set({
      author: {
        displayName: profile.displayName,
        photoURL: profile.photoURL
      },
      message: this.state.message,
      sentDate: (new Date()).toUTCString()
    });
    this.setState({
      message: ''
    });
  };

  componentWillMount () {
    firebaseProvider.getMessagesRef().on('value', snapshot => {
      if (!snapshot) {
        return;
      }
      const data = snapshot.val();
      if (!data) {
        return;
      }
      const messages = Object.values(data);
      const keys = Object.keys(data);
      this.setState({
        messages: messages.map((item, index) => {
          item['key'] = keys[index];
          return item;
        })
      });
    });
    // this.loadMoreHistory();
  }

  render () {
    const messages = this.state.messages.map(item => (
      <div
        key={item.key}
        className='chat__message'
      >
        <ChatMessage message={item} />
      </div>
    ));

    return (
      <OnsPage
        onShow={this.handlePageShow}
        onHide={this.handlePageHide}
        renderToolbar={this.renderToolbar}
        renderBottomToolbar={this.renderFooter}
        renderFixed={this.renderFooter}
      >
        <div className='messages-page'>
          <div className='messages-page__content'>
            {
              this.state.isRendered && (
                <ReactChatView
                  className='chat'
                  flipped
                  scrollLoadThreshold={25}
                  onInfiniteLoad={this.loadMoreHistory.bind(this)}
                >
                  {messages}
                </ReactChatView>
              )
            }
          </div>
        </div>
      </OnsPage>
    );
  }
}

Messages.propTypes = {
  navigator: PropTypes.object.isRequired
};
