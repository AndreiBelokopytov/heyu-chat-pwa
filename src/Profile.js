import React, { Component } from 'react';
import {
  Page as OnsPage,
  List as OnsList,
  ListItem as OnsListItem,
  Switch as OnsSwitch
} from 'react-onsenui';
import UserAvatar from './components/UserAvatar';
import mock from './mocks/profile';
import './Profile.scss';

export default class Profile extends Component {
  state = {
    profile: mock
  };

  renderHeader = () => {
    return (
      <div className='profile-page__header'>
        <div className='user-profile'>
          <div className='user-profile__content'>
            <UserAvatar
              className='user-profile__avatar'
              src={this.state.profile.avatarUrl}
            />
            <h1 className='user-profile__name'>{this.state.profile.fullName}</h1>
            <p className='user-profile__about'>
              {this.state.profile.about}
            </p>
          </div>
        </div>
      </div>
    );
  }

  render () {
    const contentStyle = {
      top: 265
    };
    return (
      <OnsPage
        contentStyle={contentStyle}
        renderFixed={this.renderHeader}
      >
        <div className='profile-page'>
          <div className='profile-page__content'>
            <OnsList
              className='options-list'
              modifier='noborder'>
              <OnsListItem
                modifier='chevron'
                tappable
              >
                <span className='left'>
                  Email Address
                </span>
                <span className='right label'>
                  {this.state.profile.email}
                </span>
              </OnsListItem>
              <OnsListItem
                modifier='chevron'
                tappable
              >
                <span className='left'>
                  Telephone
                </span>
                <span className='right label'>
                  {this.state.profile.phone}
                </span>
              </OnsListItem>
              <OnsListItem
                tappable
              >
                <span className='left'>
                  Notifications
                </span>
                <span className='right label'>
                  <OnsSwitch
                    checked={this.state.profile.enableNotifications}
                  />
                </span>
              </OnsListItem>
              <OnsListItem
                modifier='chevron'
                tappable
              >
                <span className='left'>
                  Feedback
                </span>
              </OnsListItem>
              <OnsListItem
                modifier='chevron'
                tappable
              >
                <span className='left'>
                  Get Help
                </span>
              </OnsListItem>
              <OnsListItem
                className='text-primary'
                modifier='chevron'
                tappable
              >
                <span className='left'>
                  Delete Account
                </span>
              </OnsListItem>
            </OnsList>
          </div>
        </div>
      </OnsPage>
    );
  }
}
