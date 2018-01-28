import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../firebase.config';

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('public_profile');
facebookAuthProvider.addScope('email');

export default {
  initialized: false,

  init: function () {
    firebase.initializeApp(config);
    firebase.auth().useDeviceLanguage();
    this.initialized = true;
  },

  signInWithGoogle: function () {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  },

  signInWithFacebook: function () {
    return firebase.auth().signInWithPopup(facebookAuthProvider);
  },

  getProfile: function () {
    return firebase.auth().currentUser;
  }
};
