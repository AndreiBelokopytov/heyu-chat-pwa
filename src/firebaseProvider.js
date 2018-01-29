import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
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
    return firebase.auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => (
        firebase.auth().signInWithPopup(googleAuthProvider)
      ));
  },

  signInWithFacebook: function () {
    return firebase.auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => (
        firebase.auth().signInWithPopup(facebookAuthProvider)
      ));
  },

  checkAuthState: function (next) {
    return firebase.auth().onAuthStateChanged(next);
  },

  getProfile: function () {
    return firebase.auth().currentUser;
  },

  getUsersRef: function (key) {
    const ref = firebase.database().ref('users');
    if (key) {
      return ref.child(key);
    } else {
      return ref.orderByChild('displayName');
    }
  },

  getGroupsRef: function (key) {
    const ref = firebase.database().ref('groups');
    if (key) {
      return ref.child(key);
    } else {
      return ref.orderByChild('title');
    }
  }
};
