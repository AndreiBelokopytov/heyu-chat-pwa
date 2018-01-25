import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as ons from 'onsenui';
import {
  Page as OnsPage,
  Input as OnsInput,
  Button as OnsButton
} from 'react-onsenui';
import Protected from './Protected';
import './Home.scss';

export default class Home extends Component {
  state = {
    isAndroid: ons.platform.isAndroid(),
    keyboardOpen: false,
    authData: {}
  };

  handleLoginClick = () => {
    const {login, password} = this.state.authData;
    if (!login || !password) return;
    this.props.navigator.pushPage({
      component: Protected,
      props: {
        key: 'protected'
      }
    });
  };

  handleFormFocus = () => {
    if (!this.state.keyboardOpen) {
      this.setState({
        keyboardOpen: true
      });
    }
  };

  handlePageClick = evt => {
    if (['BUTTON', 'INPUT', 'ONS-BUTTON', 'ONS-INPUT'].indexOf(evt.target.tagName) < 0) {
      this.setState({
        keyboardOpen: false
      });
    }
  }

  handleInputChange = evt => {
    const {value, name} = evt.target;
    if (name) {
      this.setState({
        authData: Object.assign({}, this.state.authData, {
          [name]: value
        })
      });
    }
  }

  render () {
    const {
      keyboardOpen,
      isAndroid
    } = this.state;

    const pageContentClass = classnames(
      'home-page__content',
      {
        scrolled: isAndroid && keyboardOpen
      }
    );

    return (
      <OnsPage
        modifier='gradient-bg'
      >
        <div className='home-page'
          onClick={this.handlePageClick}
        >
          <div className={pageContentClass}>
            <div className='home-page__header'>
              <h1 className='home-page__title'>HeyU</h1>
              <p className='home-page__subtitle'>Free chat app template</p>
            </div>
            <form
              className='home-page__form'
              onFocus={this.handleFormFocus}
            >
              <div className='input-field'>
                <OnsInput
                  type='text'
                  name='login'
                  placeholder='Login'
                  modifier='transparent block darken'
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='input-field'>
                <OnsInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  modifier='transparent block darken'
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='home-page__buttons'>
                <OnsButton
                  modifier='white large'
                  onClick={this.handleLoginClick}
                >LogIn</OnsButton>
              </div>
            </form>
          </div>
        </div>
      </OnsPage>
    );
  }
}

Home.propTypes = {
  navigator: PropTypes.object.isRequired
};
