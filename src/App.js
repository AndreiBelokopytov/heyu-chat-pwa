import React, { Component } from 'react';
import { Navigator as OnsNavigator } from 'react-onsenui';
import firebase from 'firebase/app';
import 'firebase/auth';
import Home from './Home';
import './App.scss';
import config from '../firebase.config';
import Protected from './Protected';

export class App extends Component {
  firebaseApp = null;

  initFirebase () {
    this.firebaseApp = firebase.initializeApp(config);
    firebase.auth().useDeviceLanguage();
  }

  renderPage = (route, navigator) => {
    route.props = route.props || {};
    route.props.navigator = navigator;
    route.props.firebase = firebase;

    return React.createElement(route.component, route.props);
  }

  componentWillMount () {
    this.initFirebase();
  }

  render () {
    return (
      <OnsNavigator
        initialRoute={{
          component: firebase.auth().currentUser ? Protected : Home,
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
