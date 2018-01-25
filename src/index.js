import * as ons from 'onsenui';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

ons.ready(() => {
  ons.disableAutoStyling();
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
