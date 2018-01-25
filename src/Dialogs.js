import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LazyList as OnsLazyList,
  Page as OnsPage
} from 'react-onsenui';
import mock from './mocks/dialogs';
import DialogCard from './components/DialogCard';
import Messages from './Messages';
import './Dialogs.scss';

export default class Dialogs extends Component {
  state = {
    dialogs: []
  };

  handleDialogClick = () => {
    this.props.navigator.pushPage({
      component: Messages,
      props: {
        key: 'messages'
      }
    });
  }

  renderRow = index => {
    const item = this.state.dialogs[index];
    return (
      <DialogCard
        key={item.id}
        dialog={item}
        onClick={this.handleDialogClick}
      />
    );
  };

  componentDidMount () {
    new Promise(resolve => {
      setTimeout(
        () => resolve(mock),
        100
      );
    }).then(dialogs => this.setState({dialogs}));
  }

  render () {
    return (
      <OnsPage>
        <OnsLazyList
          length={this.state.dialogs.length}
          renderRow={this.renderRow}
          calculateItemHeight={() => 68}
        />
      </OnsPage>
    );
  }
}

Dialogs.propTypes = {
  navigator: PropTypes.object.isRequired
};
