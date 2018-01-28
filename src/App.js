import React, { Component } from 'react';
import { Navigator as OnsNavigator } from 'react-onsenui';
import Home from './Home';
import './App.scss';

import Protected from './Protected';
import firebaseProvider from './firebaseProvider';

export class App extends Component {
  renderPage = (route, navigator) => {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.component, route.props);
  };

  render () {
    const profile = firebaseProvider.getProfile();
    return (
      <OnsNavigator
        initialRoute={{
          component: profile ? Protected : Home,
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
