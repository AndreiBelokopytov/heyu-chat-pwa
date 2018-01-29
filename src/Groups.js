import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page as OnsPage } from 'react-onsenui';
import GroupCard from './components/GroupCard';
import UserAvatar from './components/UserAvatar';
import Messages from './Messages';
import './Groups.scss';
import firebaseProvider from './firebaseProvider';

export default class Groups extends Component {
  state = {
    groups: [],
    users: []
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
    firebaseProvider.getGroupsRef().on('value', snapshot => {
      if (!snapshot) {
        return;
      }
      if (!snapshot) {
        return;
      }
      const data = snapshot.val();
      const groups = Object.values(data);
      const keys = Object.keys(data);
      const queries = groups.reduce((prev, group) => {
        for (const key of group.members) {
          if (key in prev) {
            continue;
          } else {
            prev[key] = firebaseProvider.getUsersRef(key).once('value');
          }
        }
        return prev;
      }, {});

      Promise.all(Object.values(queries))
        .then((snapshot) => {
          const users = snapshot.reduce((prev, user) => {
            prev[user.key] = user.val();
            return prev;
          }, {});
          this.setState({
            groups: groups.map((item, index) => {
              item['key'] = keys[index];
              return item;
            }),
            users
          });
        });
    });
  }

  render () {
    const groups = this.state.groups.map(item => {
      const avatars = item.members.map((key, index) => {
        const user = this.state.users[key];
        if (!user) {
          return null;
        }
        return (
          <UserAvatar
            key={index}
            className='group-members__avatar'
            src={user.photoURL}
          />
        );
      });
      return (
        <GroupCard
          key={item.key}
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
