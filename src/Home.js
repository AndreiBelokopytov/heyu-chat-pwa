import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as ons from 'onsenui';
import {
  Page as OnsPage,
  Icon as OnsIcon,
  Input as OnsInput,
  Button as OnsButton,
  Toast as OnsToast
} from 'react-onsenui';
import IconFacebook from './icons/IconFacebook';
import IconGoogle from './icons/IconGoogle';
import Link from './components/Link';
import Protected from './Protected';
import './Home.scss';
import firebase from 'firebase';

const slideOut = el => {
  return ons.animit(el)
    .queue({
      css: {
        transform: 'translate3d(-100vw, 0, 0)',
        visibility: 'hidden'
      },
      duration: 0.3,
      timing: 'ease-out'
    })
    .queue(done => done());
};

const slideInRight = el => {
  return ons.animit(el)
    .queue({
      css: {
        transform: 'translate3d(100vw, 0, 0)',
        visibility: 'visible'
      },
      duration: 0
    })
    .wait(0.1)
    .queue({
      css: {
        transform: 'translate3d(0, 0, 0)'
      },
      duration: 0.3,
      timing: 'ease-in'
    })
    .queue(done => done());
};

class Home extends Component {
  signInForm = null;
  signUpForm = null;

  setSignInForm = el => this.signInForm = el;

  setSignUpForm = el => this.signUpForm = el;

  state = {
    isAndroid: ons.platform.isAndroid(),
    keyboardOpen: false,
    authData: {},
    errorMessage: ''
  };

  loginSuccess = () => {
    this.props.navigator.pushPage({
      component: Protected,
      props: {
        key: 'protected'
      }
    });
  }

  handleLoginClick = () => {
    const {login, password} = this.state.authData;
    if (!login || !password) return;
  };

  showSignUpForm = () => {
    slideOut(this.signInForm).play();
    slideInRight(this.signUpForm).play();
  };

  showSignInForm = () => {
    slideOut(this.signUpForm).play();
    slideInRight(this.signInForm).play();
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

  signInWithGoogle = () => {
    const {firebase} = this.props;
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(result => {
      this.loginSuccess();
    }).catch(error => {
      this.setState({
        errorMessage: error.message
      });
    });
  };

  handleDismiss = () => {
    this.setState({
      errorMessage: ''
    });
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
            <h1 className='home-page__title'>HeyU</h1>
            <p className='home-page__subtitle'>Free chat app</p>
            <form
              className='home-page__form'
              onFocus={this.handleFormFocus}
            >
              <div
                className='home-page__signin'
                ref={this.setSignInForm}
              >
                <div className='home-page__button'>
                  <OnsButton
                    modifier='white large'
                    onClick={this.handleLoginClick}
                  >
                    <IconFacebook className='home-page__brand-icon' />
                    Sign in with Facebook
                  </OnsButton>
                </div>
                <div className='home-page__button'>
                  <OnsButton
                    modifier='white large'
                    onClick={this.signInWithGoogle}
                  >
                    <IconGoogle className='home-page__brand-icon' />
                    Sign in with Google
                  </OnsButton>
                </div>
                <div className='home-page__button'>
                  <Link
                    onClick={this.showSignUpForm}
                  >
                    Don not an have account? Sign Up
                  </Link>
                </div>
              </div>

              <div
                className='home-page__signup'
                ref={this.setSignUpForm}
              >
                <div className='home-page__fieldset'>
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
                </div>
                <div className='home-page__button'>
                  <OnsButton
                    modifier='white large'
                    onClick={this.handleLoginClick}
                  >Sign up</OnsButton>
                </div>
                <div className='home-page__button'>
                  <Link
                    onClick={this.showSignInForm}
                  >
                    <OnsIcon
                      className='home-page__back-icon'
                      icon='ion-ios-arrow-thin-left'
                    />
                    Back to Sign in
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        <OnsToast isOpen={!!this.state.errorMessage}>
          <div className='home-page__error-message'>
            {this.state.errorMessage}
          </div>
          <button onClick={this.handleDismiss}>
            Dismiss
          </button>
        </OnsToast>
      </OnsPage>
    );
  }
}

Home.propTypes = {
  navigator: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

export default Home;
