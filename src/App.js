import React, { Component } from 'react';
import { Navigator as OnsNavigator } from 'react-onsenui';
import Home from './Home';
import './App.scss';

export class App extends Component {
  renderPage = (route, navigator) => {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.component, route.props);
  }

  render () {
    return (
      <OnsNavigator
        initialRoute={{
          component: Home,
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
