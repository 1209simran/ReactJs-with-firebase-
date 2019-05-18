import firebase from "firebase";

const config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_NAME.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_NAME.firebaseio.com",
  projectId: "YOUR_PROJECT_NAME",
  storageBucket: "YOUR_PROJECT_NAME.appspot.com",
  messagingSenderId: "YOUR_MESSAGINGSENDERID",
  appId: "YOUR APPID"
};

const firebaseConf = firebase.initializeApp(config);

export default firebaseConf;
