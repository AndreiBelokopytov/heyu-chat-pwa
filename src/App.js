import React, { Component } from 'react';
import {
  Navigator as OnsNavigator,
  ProgressBar as OnsProgressBar
} from 'react-onsenui';
import Home from './Home';
import './App.scss';

import Protected from './Protected';
import firebaseProvider from './firebaseProvider';

export class App extends Component {
  state = {
    currentUser: undefined
  };

  renderPage = (route, navigator) => {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.component, route.props);
  };

  componentWillMount () {
    firebaseProvider.checkAuthState(user => this.setState({
      currentUser: user
    }));
  }

  render () {
    const {currentUser} = this.state;
    if (currentUser === undefined) {
      return (
        <div className='busy-container'>
          <OnsProgressBar
            indeterminate
          />
          <div className='busy-container__text'>
            Loading...
          </div>
        </div>
      );
    }
    return (
      <OnsNavigator
        initialRoute={{
          component: currentUser === null ? Home : Protected,
          props: {
            key: 'home'
          }
        }}
        animation='fade'
        renderPage={this.renderPage} />
    );
  }
}

export default App;
