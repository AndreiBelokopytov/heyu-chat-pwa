import React, { Component } from 'react';
import {
  LazyList as OnsLazyList,
  Page as OnsPage,
  SearchInput as OnsSearchInput
} from 'react-onsenui';
import UserCard from './components/UserCard';
import mock from './mocks/users.json';
import './Contacts.scss';
import { setTimeout } from 'timers';

export default class Contacts extends Component {
  state = {
    filter: '',
    contacts: []
  };

  renderRow = index => {
    const item = this.state.contacts[index];
    return (
      <UserCard
        key={item.id}
        user={item}
      />
    );
  }

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
  }

  componentDidMount () {
    new Promise((resolve, reject) => {
      setTimeout(
        () => resolve(mock),
        100
      );
    }).then(contacts => this.setState({contacts}));
  }

  handleSearchChange = evt => {
    const searchStr = evt.target.value;
    if (searchStr === this.state.filter) {
      return;
    }
    if (!searchStr) {
      this.setState({
        contacts: mock,
        filter: searchStr
      });
    } else {
      this.setState({
        contacts: this.state.contacts
          .filter(user => user.fullName.startsWith(searchStr)),
        filter: searchStr
      });
    }
  }

  render () {
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
              length={this.state.contacts.length}
              renderRow={this.renderRow}
              calculateItemHeight={() => 42}
            />
          </div>
        </div>
      </OnsPage>
    );
  }
}
