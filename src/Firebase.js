import firebase from "firebase";

const config = {
  apiKey: "AIzaSyA6HY-IBSaV2EL3JgpZseZj7WxPGO6YQkY",
  authDomain: "contact-93671.firebaseapp.com",
  databaseURL: "https://contact-93671.firebaseio.com",
  projectId: "contact-93671",
  storageBucket: "contact-93671.appspot.com",
  messagingSenderId: "475485152345",
  appId: "1:475485152345:web:00651d96e040c390"
};

const firebaseConf = firebase.initializeApp(config);

export default firebaseConf;
