import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page as OnsPage } from 'react-onsenui';
import mock from './mocks/groups';
import GroupCard from './components/GroupCard';
import UserAvatar from './components/UserAvatar';
import Messages from './Messages';
import './Groups.scss';
import { setTimeout } from 'timers';

export default class Groups extends Component {
  state = {
    groups: []
  };

  handleGroupClick = () => {
    this.props.navigator.pushPage({
      component: Messages,
      props: {
        key: 'messages'
      }
    });
  };

  componentDidMount () {
    new Promise((resolve) => {
      setTimeout(
        () => resolve(mock),
        100
      );
    }).then(groups => this.setState({groups}));
  }

  render () {
    const groups = this.state.groups.map(item => {
      const avatars = item.members.map(user => (
        <UserAvatar
          key={user.id}
          className='group-members__avatar'
          src={user.avatarUrl}
        />
      ));
      return (
        <GroupCard
          key={item.id}
          className='groups-page__card'
          onClick={this.handleGroupClick}
          title={item.title}
          subtitle={`${item.lastActivity}  •   ${item.totalMembers} members`}
        >
          <div className='group-members'>{avatars}</div>
        </GroupCard>
      );
    });
    return (
      <OnsPage>
        <div className='groups-page'>
          <div className='groups-page__content'>
            {groups}
          </div>
        </div>
      </OnsPage>
    );
  }
}

Groups.propTypes = {
  navigator: PropTypes.object.isRequired
};
