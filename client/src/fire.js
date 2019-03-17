import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyA_t6nWtQKF5urdTYtBs141zUHGEoWxVVk",
    authDomain: "invite-me-please.firebaseapp.com",
    databaseURL: "https://invite-me-please.firebaseio.com",
    projectId: "invite-me-please",
    storageBucket: "invite-me-please.appspot.com",
    messagingSenderId: "925746814030"
};

var fire = firebase.initializeApp(config);
export default fire;