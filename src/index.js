import * as ons from 'onsenui';
import React from 'react';
import ReactDOM from 'react-dom';
import firebaseProvider from './firebaseProvider';
import App from './App';
import './index.scss';

firebaseProvider.init();

ons.ready(() => {
  ons.disableAutoStyling();

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
