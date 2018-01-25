import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Page as OnsPage,
  Toolbar as OnsToolbar,
  Tabbar as OnsTabbar,
  Tab as OnsTab
} from 'react-onsenui';
import Groups from './Groups';
import Dialogs from './Dialogs';
import Contacts from './Contacts';
import Profile from './Profile';
import './Protected.scss';

export default class Protected extends Component {
  state = {
    index: 1,
    titles: [
      'Dialogs',
      'Groups',
      'Contacts',
      ''
    ]
  };

  renderToolbar = () => {
    if (this.state.index === 3) {
      return null;
    }
    return (
      <OnsToolbar>
        <div className='center'>
          {this.state.titles[this.state.index]}
        </div>
      </OnsToolbar>
    );
  };

  renderTabs = () => {
    return [
      {
        content: (
          <Dialogs
            key='dialogs'
            navigator={this.props.navigator}
          />
        ),
        tab: (
          <OnsTab
            key='dialogs-tab'
            label='Dialogs'
            icon='ion-ios-chatboxes-outline'
          />
        )
      },
      {
        content: (
          <Groups
            key='groups'
            navigator={this.props.navigator}
          />
        ),
        tab: (
          <OnsTab
            key='groups-tab'
            label='Groups'
            icon='ion-ios-people-outline'
          />
        )
      },
      {
        content: <Contacts key='contacts' />,
        tab: (
          <OnsTab
            key='contacts-tab'
            label='Contacts'
            icon='ion-ios-list-outline'
          />
        )
      },
      {
        content: <Profile key='profile' />,
        tab: (
          <OnsTab
            key='profile-tab'
            label='Profile'
            icon='ion-ios-gear-outline'
          />
        )
      }
    ];
  };

  render () {
    return (
      <OnsPage
        renderToolbar={this.renderToolbar}
        className='protected-page'
      >
        <OnsTabbar
          position='auto'
          index={this.state.index}
          onPreChange={
            event => {
              if (event.index !== this.state.index) {
                this.setState({index: event.index});
              }
            }
          }
          renderTabs={this.renderTabs}
        />
      </OnsPage>
    );
  }
}

Protected.propTypes = {
  navigator: PropTypes.object.isRequired
};
