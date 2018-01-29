import React, { Component } from 'react';
import {
  LazyList as OnsLazyList,
  Page as OnsPage,
  SearchInput as OnsSearchInput
} from 'react-onsenui';
import UserCard from './components/UserCard';
import './Contacts.scss';
import firebaseProvider from './firebaseProvider';

export default class Contacts extends Component {
  state = {
    filter: '',
    contacts: []
  };

  renderRow = contacts => {
    return function (index) {
      const item = contacts[index];
      return (
        <UserCard
          key={item.key}
          user={item}
        />
      );
    };
  };

  renderSearchbar = () => {
    return (
      <div className='search-panel'>
        <OnsSearchInput
          onChange={this.handleSearchChange}
          className='search-panel__search-field'
          placeholder='Search'
        />
      </div>
    );
  };

  handleSearchChange = evt => {
    const searchStr = evt.target.value;
    if (searchStr === this.state.filter) {
      return;
    }
    this.setState({
      filter: searchStr
    });
  };

  componentWillMount () {
    firebaseProvider.getUsersRef().on('value', snapshot => {
      if (!snapshot) {
        return;
      }
      const data = snapshot.val();
      const contacts = Object.values(data);
      const keys = Object.keys(data);
      this.setState({
        contacts: contacts.map((item, index) => {
          item['key'] = keys[index];
          return item;
        })
      });
    });
  }

  render () {
    let contacts = [];

    if (!this.state.filter) {
      contacts = this.state.contacts;
    } else {
      contacts = this.state.contacts
        .filter(user => user.displayName.startsWith(this.state.filter));
    }

    return (
      <OnsPage
        renderFixed={this.renderSearchbar}
        contentStyle={{marginTop: 60}}
      >
        <div className='contacts-page'>
          <div className='contacts-page__content'>
            <OnsLazyList
              modifier='noborder'
              className='contacts-list'
              length={contacts.length}
              renderRow={this.renderRow(contacts)}
              calculateItemHeight={() => 42}
            />
          </div>
        </div>
      </OnsPage>
    );
  }
}
